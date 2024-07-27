import { getEventBySlug } from '../../../../datalyer/contentful/event';

// GET /api/events/:slug
export const GET = async (request, { params }) => {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'sl';

    const event = await getEventBySlug(params.slug, locale);

    if (!event) {
      return new Response('Blog post not found', { status: 404 });
    }

    return new Response(JSON.stringify({ event }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
