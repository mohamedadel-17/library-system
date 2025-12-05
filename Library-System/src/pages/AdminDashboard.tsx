import { useState, useEffect, useCallback } from "react"; // <== إضافة useEffect, useCallback
// import { booksData } from "../data/books"; // <== إلغاء استيراد بيانات الـ Mock
import {  getAllBooks, deleteBook, returnBook } from "../services/services"; // <== استيراد الخدمات والـ Book type
import type {  Book } from "../services/services"; // <== استيراد الخدمات والـ Book type

// Components
import BooksTable from "../components/admin/BooksTable";
import AddBookSheet from "../components/admin/AddBookSheet";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function AdminDashboard() {
  const [books, setBooks] = useState<Book[]>([]); // <== البدء بمصفوفة فارغة
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // دالة لجلب البيانات من الـ API عند تحميل الصفحة
  const fetchBooks = useCallback(async () => {
      try {
          setIsLoading(true);
          const data = await getAllBooks();
          setBooks(data);
      } catch (error) {
          console.error("Failed to fetch books:", error);
          // يمكن إضافة منطق لعرض رسالة خطأ للمستخدم
      } finally {
          setIsLoading(false);
      }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);


  // Logic Functions (Passed down as Props)
  const handleAddBook = (newBook: Book) => {
    // يتم تحديث الحالة مباشرة بالكتاب الجديد الذي تم إرجاعه من الـ Backend
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleReturnBook = async (id: number) => {
    if (confirm("Confirm returning this book? Fine will be cleared.")) {
      try {
          // استدعاء الـ API لإرجاع الكتاب
          const returnedBook = await returnBook(id); 

          // تحديث الحالة بالبيانات الجديدة التي تم إرجاعها من الـ Backend
          setBooks(
            books.map((book) =>
              book.id === id ? returnedBook : book
            )
          );
      } catch (error) {
          console.error("Failed to return book:", error);
          alert("Failed to return book.");
      }
    }
  };

  const handleDeleteBook = async (id: number) => {
    if (confirm("Are you sure you want to delete this book?")) {
      try {
          await deleteBook(id); // <== استدعاء الـ API لحذف الكتاب
          setBooks(books.filter((book) => book.id !== id)); // تحديث الـ UI
      } catch (error) {
          console.error("Failed to delete book:", error);
          alert("Failed to delete book.");
      }
    }
  };

  // filtering (يبقى كما هو)
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.borrowerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Library management overview.</p>
        </div>

        <AddBookSheet onAddBook={handleAddBook} /> {/* <== تم إزالة nextId */}
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-6 bg-muted p-3 rounded-lg border border-border shadow-sm w-full md:w-1/3">
        <Search className="text-muted-foreground" size={20} />
        <Input
          className="border-0 focus-visible:ring-0 text-base bg-transparent"
          placeholder="Search books or members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Books Table Component */}
      {isLoading ? (
          <p className="text-center text-lg mt-10">Loading books...</p>
      ) : (
          <BooksTable 
              books={filteredBooks} 
              onReturn={handleReturnBook} 
              onDelete={handleDeleteBook} 
          />
      )}
    </div>
  );
}