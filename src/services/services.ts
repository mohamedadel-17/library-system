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
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
  };
};

export interface BorrowDto {
  // bookId: string; // لم نعد نحتاج إليه هنا، سيتم تمريره كـ Param
  userId: string; 
  returnDate: Date; 
}

export async function borrowBook(bookId: string, dto: BorrowDto): Promise<Book> {
  const response = await api.patch<Book>(`/books/borrow/${bookId}`, dto); 
  return response.data;
}
// export async function reserveBook(bookId: string, userId: string): Promise<Book> {
//     // بما أن الـ Backend لا يدعم الحجز مباشرة، سنفترض تحديثاً وهمياً أو رسالة خطأ
//     throw new Error("Reservation not implemented on backend yet.");
// }

// // ------------------------------------
// // 9. إرجاع كتاب (Return) - مطابقة لـ PATCH /books/return/:id
// // ------------------------------------
// export async function returnBook(id: string): Promise<Book> {
//     const response = await api.patch<Book>(`/books/return/${id}`); 
//     return response.data;
// }
export async function getBorrowedBooksByUser(userId: string): Promise<Book[]> {
    const response = await api.get<Book[]>(`/books/user/${userId}`);
    return response.data;
}
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

export async function getUserById(id: string): Promise<User> {
  const response = await api.get<User>(`/users/${id}`)
  return response.data
}