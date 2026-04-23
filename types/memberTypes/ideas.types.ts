export interface IIdea {
  title: string;
  problem: string;
  solution: string;
  description: string;
  image?: string | null;
  slug?: string | null;

  isPaid: boolean;
  price?: number | null;

  categoryId: string;
  isDraft: boolean;
}
