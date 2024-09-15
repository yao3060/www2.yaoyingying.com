type WPBasePost = {
  id: number;
  modified: string;
  title: { rendered: string };
  content: { rendered: string };
  link: string;
};

type WPPage = WPBasePost & {
  type: "page";
};

type WPPost = WPBasePost & {
  excerpt: { rendered: string };
  type: "post";
  class_list: string[];
  _embedded?: {
    "wp:featuredmedia"?: WPFeaturedMedia[];
    "wp:term"?: WPTerm[];
  };
};

type WPFeaturedMedia = {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  acf: Array<any>;
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    filesize: number;
    sizes: {
      ["thumbnail" | "medium" | "full"]: {
        file: string;
        width: number;
        height: number;
        mime_type: string;
        source_url: string;
      };
    };
  };
  source_url: string;
};

type WPTerm = {
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  acf: Array<any>;
};

export type MenuItem = {
  ID: number;
  post_author: string;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: string;
  post_modified_gmt: string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: string;
  filter: string;
  market_file_name: string;
  post_popular: string;
  post_best_choice: string;
  price: string;
  purchased_count: string;
  rating: string;
  rating_count: string;
  db_id: number;
  menu_item_parent: string;
  object_id: string;
  object: string;
  type: string;
  type_label: string;
  url: string;
  title: string;
  target: string;
  attr_title: string;
  description: string;
  classes: Array<string>;
  xfn: string;
};
