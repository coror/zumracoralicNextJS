import { getBlogPostBySlug } from '../../../../datalyer/contentful/blogPost';

export const dynamic = 'force-dynamic';

// GET /api/blogPosts/:slug
export const GET = async (request, { params }) => {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'sl';

    const blogPost = await getBlogPostBySlug(params.slug, locale);

    if (!blogPost) {
      return new Response('Blog post not found', { status: 404 });
    }

    return new Response(JSON.stringify({ blogPost }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
