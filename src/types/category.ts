export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  created: string;
  modified: string;
  isActive: boolean;
}
