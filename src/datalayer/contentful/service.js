import { client } from './client';
import { serviceReducer } from './utils';

export const getServices = async (locale = 'sl') => {
  try {
    const res = await client.getEntries({
      content_type: 'service',
      locale,
    });

    const rawServices = res.items;
    const services = rawServices.map((rawService) =>
      serviceReducer(rawService)
    );

    return services;
  } catch (error) {
    console.error('Error fetching services', error);
    return [];
  }
};

export const getServiceBySlug = async (slug, locale = 'sl') => {
  try {
    const found = await client.getEntries({
      content_type: 'service',
      'fields.slug': slug,
      include: 2,
      locale,
    });

    if (found.items.length === 0) {
      return null;
    }

    const service = found.items[0];
    return serviceReducer(service);
  } catch (error) {
    console.error('Error fetching service by slug', error);
    return null;
  }
};
