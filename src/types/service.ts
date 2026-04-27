import type { Document } from '@contentful/rich-text-types';

export interface Service {
  slug: string;
  content: Document;
  seoTitle: string;
  headline: string;
  seoDescription: string;
  datePosted: string;
  id: string;
  price: number;
  type: string;
  description: Document;
  headlineImage: {
    original_secure_url: string;
    secure_url?: string;
    alt?: string;
    width?: number;
    height?: number;
  }[];
}
