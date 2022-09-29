export interface Post {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  status: string;
  type: string;
  link: string;
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  sticky: boolean;
  template: string;
  format: string;
  data: string;
  x_author: string;
  x_date: string;
  x_categories: string;
  featured_media: number;
  x_featured_media_medium?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  count?: number;
}
