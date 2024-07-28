export interface FrontmatterType {
  title: string;
  date: Date;
  excerpt: string;
  cover_image: string;
  category: string;
  author: string;
  author_image: string;
}
export interface PostType {
  slug: string;
  frontmatter: FrontmatterType;
}
