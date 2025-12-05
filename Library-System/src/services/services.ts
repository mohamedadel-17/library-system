import { api } from '@/lib/axios';

type Role = 'admin' | 'user';
export interface SummaryStats {
  totalBooks: number;
  borrowedBooks: number;
  totalFines: number; // المبلغ الإجمالي للغرامات
}

export interface MostBorrowedBook {
  id: string; // أو number، حسب الـ Backend
  title: string;
  author: string;
  count: number; // عدد مرات الاستعارة
}
export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  status: 'Available' | 'Borrowed';
  cover: string;
  borrowerName?: string;
  returnDate?: string;
}

export interface CreateBookDto {
  title: string;
  author: string;
  category: string;
}

export type AuthResponse = {
  token: string;
  role: 'admin' | 'member';
};

export async function register(registerPayload: RegisterDto): Promise<void> {
  const url = '/auth/register'; 
  await api.post(url, registerPayload);
}

export async function login(loginPayload: LoginDto): Promise<AuthResponse> {
  const url = '/auth/login';
  const response = await api.post<AuthResponse>(url, loginPayload);
  return response.data;
}

export async function getAllBooks(): Promise<Book[]> {
  const response = await api.get<Book[]>('/books');
  return response.data;
}

export async function createBook(bookData: CreateBookDto): Promise<Book> {
  const response = await api.post<Book>('/books', bookData);
  return response.data;
}

export async function deleteBook(id: number): Promise<void> {
  await api.delete(`/books/${id}`);
}

export async function returnBook(id: number): Promise<Book> {
  const response = await api.patch<Book>(`/books/return/${id}`); 
  return response.data;
}

// خدمات المستخدمين
export async function getAllUsers(): Promise<User[]> {
    const response = await api.get<User[]>('/users');
    return response.data;
}
export async function getSummaryStats(): Promise<SummaryStats> {
    const response = await api.get<SummaryStats>('/stats/summary');
    return response.data;
}


export async function getMostBorrowedBooks(): Promise<MostBorrowedBook[]> {
    const response = await api.get<MostBorrowedBook[]>('/stats/most-borrowed');
    return response.data;
}