import { getBlogPosts } from '../../../datalyer/contentful/blogPost';
// GET /api/blogPosts
export const dynamic = 'force-dynamic';

export const GET = async (request) => {
  try {
    // Parse query parameters from the URL
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'sl';

    // Fetch blog posts based on the language parameter
    const blogPosts = await getBlogPosts(locale);

    // Add CORS headers
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Allow all origins; replace '*' with specific domains in production
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    });

    return new Response(JSON.stringify({ blogPosts }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(error);

    const headers = new Headers({
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*', // Add CORS headers even in the error response
    });

    return new Response('Something Went Wrong', {
      status: 500,
      headers,
    });
  }
};