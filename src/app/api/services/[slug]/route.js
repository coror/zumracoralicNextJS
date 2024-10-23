import { getServiceBySlug } from '../../../../datalyer/contentful/service';

export const dynamic = 'force-dynamic';

// GET /api/services/:slug
export const GET = async (request, { params }) => {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'sl';

    const service = await getServiceBySlug(params.slug, locale);

    if (!service) {
      return new Response('Service not found', { status: 404 });
    }

    return new Response(JSON.stringify({ service }), { status: 200 });
  } catch (error) {
    return new Response('Seomthing went wrong', { status: 500 });
  }
};
