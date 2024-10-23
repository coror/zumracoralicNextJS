import { format, parseISO } from 'date-fns';
import { sl, bs } from 'date-fns/locale';

const locales = { sl: sl, bs };

export const dateReducer = (dateStr, locale = 'sl') => {
  const dateObj = parseISO(dateStr);
  const formatLocale = locales[locale];
  return format(dateObj, 'PPP', { locale: formatLocale });
};

export const imageReducer = (imageField) => {
  if (!imageField || !imageField.url) {
    return null;
  }
  return {
    url: imageField.secure_url,
    alt: imageField.alt || '',
    height: imageField.height,
    width: imageField.width,
    contentType: imageField.contentType,
  };
};

export const serviceReducer = (rawService, locale = 'sl') => {
  let service = { ...rawService.fields };

  service.id = rawService.sys.id;
  service.locale = rawService.sys.locale || locale;
  service.content = rawService.fields.content;

  return service;
};

export const eventReducer = (rawEvent, locale = 'sl') => {
  let event = { ...rawEvent.fields };

  event.id = rawEvent.sys.id;
  event.locale = rawEvent.sys.locale || locale;
  event.datePosted = dateReducer(rawEvent.sys.createdAt, event.locale);
  event.datum = dateReducer(rawEvent.fields.datum, event.locale);
  event.content = rawEvent.fields.content;
  event.featuredImage = imageReducer(rawEvent.fields.featuredImage[0]);
  return event;
};

export const blogPostReducer = (rawBlogPost, locale = 'sl') => {
  let blogPost = { ...rawBlogPost.fields };

  blogPost.id = rawBlogPost.sys.id;
  blogPost.locale = rawBlogPost.sys.locale || locale;
  blogPost.datePosted = dateReducer(rawBlogPost.sys.createdAt, blogPost.locale);
  blogPost.images = imageReducer(rawBlogPost.fields.cloudinaryImage);
  blogPost.content = rawBlogPost.fields.content;
  blogPost.featuredImage = imageReducer(rawBlogPost.fields.featuredImage[0]);
  return blogPost;
};

export const truncateText = (htmlString, maxLength) => {
  const plainText = htmlString.replace(/<[^>]+>/g, ''); // Remove HTML tags
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength) + '...';
};
