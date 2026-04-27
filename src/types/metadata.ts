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
  images?: OpenGraphImage[];
}

export interface TwitterMetadata {
  card: string;
  title: string;
  description: string;
  image?: string;
}

export interface MetadataAlternates {
  canonical: string;
  languages: Record<string, string>;
}

export interface Metadata {
  title: string;
  description: string;
  openGraph: OpenGraphMetadata;
  twitter: TwitterMetadata;
}

export interface PageMetadata {
  title: string;
  description: string;
  openGraph: OpenGraphMetadata;
  twitter: TwitterMetadata;
  alternates: MetadataAlternates;
}
