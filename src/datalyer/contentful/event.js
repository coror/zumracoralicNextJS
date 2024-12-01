import { client } from './client';
import { eventReducer } from './utils';

export const getEvents = async (locale = 'sl') => {
  try {
    // console.log(`Fetching events for language `);
    const res = await client.getEntries({
      content_type: 'event',
      locale,
    });

    // console.log('Fetched events response:');
    // console.log(res.items);

    const rawEvents = res.items;
    const events = rawEvents.map((rawEvent) =>
      eventReducer(rawEvent)
    );

    // console.log(events);

    return events;
  } catch (error) {
    console.log(`Error fetching events for `, error);
    return [];
  }
};

export const getEventBySlug = async (slug, locale = 'sl') => {
  try {
    console.log(`Fetching blog post for slug: ${slug}, language: ${locale}`);
    const found = await client.getEntries({
      content_type: 'event',
      'fields.slug': slug,
      include: 2,
      locale,
    });

    console.log(
      `Raw API response for slug: ${slug}, language: ${locale}`,
      found
    ); // Detailed logging

    if (found.items.length === 0) {
      console.log(`Blog post not found for slug: ${slug}`);
      return null;
    }

    const event = found.items[0];
    return eventReducer(event);
  } catch (error) {
    console.error(
      `Error fetching blog post for slug ${slug} and language ${locale}`,
      error
    );
    return null;
  }
};
