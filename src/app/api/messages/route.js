import { createClient } from 'contentful-management';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, email, message } = await req.json();

  try {
    const client = createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
    });

    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');

    const entry = await environment.createEntry('message', {
      fields: {
        name: {
          sl: name,
        },
        email: {
          sl: email,
        },
        message: {
          sl: message,
        },
      },
    });

    await entry.publish();

    // Send email notification via Nodemailer
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Disable SSL verification
      },
    });

    const mailOptions = {
      from: `"zumracoralic.com" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL, // The email address to receive the notification
      subject: 'zumracoralic.com | Imaš novo sporočilo',
      html: ` <html>
            <head>
            <meta charset='utf-8'>
            </head>
                <body>
                 <h2 style="color: #ffc500  ;">Novo sporočilo:</h2>
                <p><strong>Ime:</strong>  ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Sporočilo:</strong></p>
                <div style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
                <p>${message}</p>
                </div>
                <p>
              <a href="https://app.contentful.com/spaces/lwatqlo5vo0h/views/entries" 
              style="display: inline-block; padding: 10px 20px; background-color: #ffc500 ; color: white; text-decoration: none; border-radius: 5px;">
            Odpri Contentful
          </a>
        </p>
        <p style="font-size: 12px; color: #888;">To sporočilo je bilo avtomatsko generirano. Prosim ne odgovarjaj na ta email.</p>
      </body>
      </html>
        `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true, entry }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error creating Contentful entry:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Something Went Wrong' }),
      { status: 500 }
    );
  }
}
