import { getBlogPosts } from '../../../datalyer/contentful/blogPost';
// GET /api/blogPosts
export const GET = async (request) => {
  try {
    // Parse query parameters from the URL
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'sl';

    console.log(`Received language parameter: ${locale}`);

    // Fetch blog posts based on the language parameter
    const blogPosts = await getBlogPosts(locale);

    console.log(`Fetched ${blogPosts.length} blog posts for `);

    return new Response(JSON.stringify({ blogPosts }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
