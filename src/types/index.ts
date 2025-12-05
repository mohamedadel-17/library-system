export type BookStatus = 'Available' | 'Borrowed';

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  status: BookStatus;
  cover: string;
  returnDate?: string;
  borrowerName?: string;
}