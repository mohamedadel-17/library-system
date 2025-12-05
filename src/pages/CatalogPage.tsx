import React, { useState, useEffect, useCallback } from 'react';
import BookCard from '@/components/catalog/BookCard';
import FilterBar from '@/components/catalog/FilterBar';
import {  getAllBooks } from '@/services/services'; 
import type {  Book } from '@/services/services'; 

// دالة مساعدة لجلب الـ User ID من الـ localStorage
const getUserId = (): string | null => {
  return localStorage.getItem('userId');
};


const CatalogPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]); 
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null); // <== حالة جديدة للـ User ID

  // Hook لقراءة الـ User ID عند تحميل المكون
  useEffect(() => {
    setCurrentUserId(getUserId());
  }, []); // تشغيل مرة واحدة عند التحميل


  // دالة جلب الكتب من الـ API
  const fetchBooks = useCallback(async () => {
    try {
        setIsLoading(true);
        const data = await getAllBooks();
        setBooks(data);
    } catch (error) {
        console.error("Failed to fetch books:", error);
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // دالة لتحديث كتاب واحد في القائمة بعد الاستعارة/الحجز
  const handleUpdateBook = (updatedBook: Book) => {
    setBooks(prevBooks => 
        prevBooks.map(book => 
            book.id === updatedBook.id ? updatedBook : book
        )
    );
  };

  // Logic: Filter Books
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || book.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-primary">Library Catalog</h1>
        <p className="text-muted-foreground">
          Browse and borrow books from our collection.
        </p>
      </div>

      {/* Search & Filter Component */}
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFilterCategory={setFilterCategory}
      />

      {/* Results Grid */}
      {isLoading ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg font-semibold text-foreground">Loading catalog...</p>
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              onUpdateBook={handleUpdateBook}
              // تمرير الـ User ID الفعلي (أو null)
              currentUserId={currentUserId as string} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <h3 className="text-lg font-semibold text-foreground">No books found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;