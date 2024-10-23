import { getEvents } from '../../../datalyer/contentful/event';
// GET /api/events
export const GET = async (request) => {
  try {
    // Parse query parameters from the URL
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'sl';

    console.log(`Received language parameter: ${locale}`);

    // Fetch blog posts based on the language parameter
    const events = await getEvents(locale);

    console.log(`Fetched ${events.length} events posts for `);

    return new Response(JSON.stringify({ events }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
