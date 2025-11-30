import React, { useState } from 'react';
import { booksData } from '@/data/books';
import BookCard from '@/components/catalog/BookCard';
import FilterBar from '@/components/catalog/FilterBar';

const CatalogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  // Logic: Filter Books
  const filteredBooks = booksData.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === "All" || book.category === filterCategory;

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
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-lg font-semibold text-gray-600">No books found</h3>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;