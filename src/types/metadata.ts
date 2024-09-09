// Define types for metadata structure
export interface OpenGraphImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface OpenGraphMetadata {
  title: string;
  description: string;
  url: string;
  images: OpenGraphImage[];
}

export interface TwitterMetadata {
  card: string;
  title: string;
  description: string;
  image: string;
}

export interface Metadata {
  title: string;
  description: string;
  url: string;
  openGraph: OpenGraphMetadata;
  twitter: TwitterMetadata;
  canonical: string;
}
