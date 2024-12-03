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
      'Access-Control-Allow-Origin': 'https://www.zumracoralic.com',
// Allow requests from any origin
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
      'Access-Control-Allow-Origin': '*', // Ensure error responses also include CORS headers
    });

    return new Response('Something Went Wrong', {
      status: 500,
      headers,
    });
  }
};

// Handle preflight OPTIONS requests
export const OPTIONS = async () => {
  const headers = new Headers({
    'Access-Control-Allow-Origin': 'https://www.zumracoralic.com',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  return new Response(null, {
    status: 204,
    headers,
  });
};
