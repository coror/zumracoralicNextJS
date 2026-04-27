import type { Document } from '@contentful/rich-text-types';

export interface BlogPost {
  slug: string;
  content: Document;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  datePosted: string;
  id: string;
  featuredImage: {
    url: string;
    alt: string;
  };
  cloudinaryImage: {
    secure_url: string;
    alt?: string;
    width: number;
    height: number;
  }[];
}
  