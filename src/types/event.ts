export interface Event {
  slug: string;
  content: any; // Can be refined based on your actual content type
  seoTitle: string;
  headline: string;
  datum: string;
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
  location: string;
}
