const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// fetch all blogposts
async function fetchBlogPosts(locale = 'sl') {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/blogPosts?locale=${locale}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();

    return data.blogPosts;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Fetch single blogPost
async function fetchBlogPost(slug, locale) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/blogPosts/${slug}?locale=${locale}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data.blogPost;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// fetch all events
async function fetchEvents(locale = 'sl') {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/events?locale=${locale}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();

    return data.events;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { fetchBlogPosts, fetchBlogPost, fetchEvents };
