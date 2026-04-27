import { ImageResponse } from 'next/og';
import { getEventBySlug } from '@/datalayer/contentful/event';

export const alt = 'Zumra Ćoralić — Event';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const event = await getEventBySlug(params.slug, params.locale);
  const title = event?.seoTitle ?? 'Event';
  const date = event?.datum ?? '';
  const location = event?.location ?? '';

  const eventLabel =
    params.locale === 'bs' ? 'DOGAĐAJ' : 'DOGODEK';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#222428',
          padding: '72px',
          fontFamily: 'serif',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 28,
            color: '#ffffff',
            letterSpacing: '0.3em',
          }}
        >
          <div>ZUMRA ĆORALIĆ</div>
          <div style={{ color: '#df650e' }}>{eventLabel}</div>
        </div>

        <div
          style={{
            fontSize: title.length > 80 ? 56 : 72,
            lineHeight: 1.15,
            color: '#FFE6BC',
            fontWeight: 400,
            display: 'flex',
            maxWidth: '95%',
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 24,
            color: '#ffffffaa',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {date && <div>{date}</div>}
            {location && <div>{location}</div>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: '#df650e',
                borderRadius: '50%',
              }}
            />
            zumracoralic.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
