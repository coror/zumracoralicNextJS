import { getServices } from '../../../datalayer/contentful/service';
// GET /api/services
export const dynamic = 'force-dynamic';

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'sl';

    // Fetch services based on the lang param
    const services = await getServices(locale);
    // console.log(services);
    return new Response(JSON.stringify({ services }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
