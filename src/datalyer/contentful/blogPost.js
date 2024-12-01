import { client } from './client';
import { blogPostReducer } from './utils';

export const getBlogPosts = async (locale = 'sl') => {
  try {
    // console.log(`Fetching blog posts for language `);
    const res = await client.getEntries({
      content_type: 'blogPost',
      locale,
    });

    // console.log('Fetched blog posts response:');
    // console.log(res.items);

    const rawBlogPosts = res.items;
    const blogPosts = rawBlogPosts.map((rawBlogPost) =>
      blogPostReducer(rawBlogPost)
    );

    console.log(blogPosts);
    
    return blogPosts;
  } catch (error) {
    console.log(`Error fetching blog posts for `, error);
    return [];
  }
};

export const getBlogPostBySlug = async (slug, locale = 'sl') => {
  try {
    // console.log(`Fetching blog post for slug: ${slug}, language: ${locale}`);
    const found = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      include: 2,
      locale,
    });

    // console.log(
    //   `Raw API response for slug: ${slug}, language: ${locale}`,
    //   found
    // ); // Detailed logging

    if (found.items.length === 0) {
      console.log(`Blog post not found for slug: ${slug}`);
      return null;
    }

    const blogPost = found.items[0];
    return blogPostReducer(blogPost);
  } catch (error) {
    console.error(
      `Error fetching blog post for slug ${slug} and language ${locale}`,
      error
    );
    return null;
  }
};
