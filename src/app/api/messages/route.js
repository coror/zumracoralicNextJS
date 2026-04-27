import { createClient } from 'contentful-management';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 5000;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rateLimitStore = new Map();

function getClientIp(req) {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const hits = (rateLimitStore.get(ip) || []).filter((t) => t > windowStart);
  if (hits.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, hits);
    return true;
  }
  hits.push(now);
  rateLimitStore.set(ip, hits);
  return false;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function jsonError(message, status) {
  return new Response(JSON.stringify({ success: false, error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req) {
  if (req.headers.get('content-type')?.includes('application/json') !== true) {
    return jsonError('Invalid content type', 415);
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return jsonError('Too many requests', 429);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return jsonError('Invalid JSON', 400);
  }

  const { name, email, message, website } = body || {};

  if (typeof website === 'string' && website.length > 0) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string'
  ) {
    return jsonError('Invalid fields', 400);
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (
    trimmedName.length === 0 ||
    trimmedName.length > MAX_NAME ||
    trimmedEmail.length === 0 ||
    trimmedEmail.length > MAX_EMAIL ||
    trimmedMessage.length === 0 ||
    trimmedMessage.length > MAX_MESSAGE
  ) {
    return jsonError('Invalid field length', 400);
  }

  if (!emailRegex.test(trimmedEmail)) {
    return jsonError('Invalid email', 400);
  }

  try {
    const client = createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
    });

    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');

    const entry = await environment.createEntry('message', {
      fields: {
        name: { sl: trimmedName },
        email: { sl: trimmedEmail },
        message: { sl: trimmedMessage },
      },
    });

    await entry.publish();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, '<br/>');

    const mailOptions = {
      from: `"zumracoralic.com" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      replyTo: trimmedEmail,
      subject: 'zumracoralic.com | Imaš novo sporočilo',
      html: `<html>
            <head>
            <meta charset='utf-8'>
            </head>
                <body>
                 <h2 style="color: #ffc500  ;">Novo sporočilo:</h2>
                <p><strong>Ime:</strong>  ${safeName}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
                <p><strong>Sporočilo:</strong></p>
                <div style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
                <p>${safeMessage}</p>
                </div>
                <p>
              <a href="https://app.contentful.com/spaces/lwatqlo5vo0h/views/entries"
              style="display: inline-block; padding: 10px 20px; background-color: #ffc500 ; color: white; text-decoration: none; border-radius: 5px;">
            Odpri Contentful
          </a>
        </p>
        <p style="font-size: 12px; color: #888;">To sporočilo je bilo avtomatsko generirano. Prosim ne odgovarjaj na ta email.</p>
      </body>
      </html>`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error processing contact submission:', error);
    return jsonError('Something Went Wrong', 500);
  }
}
