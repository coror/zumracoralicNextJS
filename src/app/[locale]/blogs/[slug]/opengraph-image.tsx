import { ImageResponse } from 'next/og';
import { getBlogPostBySlug } from '@/datalayer/contentful/blogPost';

export const alt = 'Zumra Ćoralić — Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const blog = await getBlogPostBySlug(params.slug, params.locale);
  const title = blog?.seoTitle ?? 'Blog';
  const date = blog?.datePosted ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FFE6BC',
          padding: '72px',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 28,
            color: '#222428',
            letterSpacing: '0.3em',
          }}
        >
          <div>ZUMRA ĆORALIĆ</div>
          <div style={{ color: '#df650e' }}>BLOG</div>
        </div>

        <div
          style={{
            fontSize: title.length > 80 ? 56 : 72,
            lineHeight: 1.15,
            color: '#222428',
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
            color: '#222428aa',
          }}
        >
          <div>{date}</div>
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
