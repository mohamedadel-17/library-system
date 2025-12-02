import { booksData } from '../data/books';
import BookCard from '../components/catalog/BookCard';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { BookOpen } from "lucide-react";

export default function UserBooksPage() {
  const CURRENT_USER = "John Doe";
  const myBooks = booksData.filter(book => 
    book.status === "Borrowed" && book.borrowerName === CURRENT_USER
  );

  return (
    <div className="container mx-auto py-10 px-4 min-h-[60vh] mb-8">
      
      {/* Header */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <BookOpen className="h-8 w-8" /> My Borrowed Books
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your active loans and due dates.
        </p>
      </div>

      {/* Content */}
      {myBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myBooks.map((book) => (
            <div key={book.id} className="relative">
              {/* We reuse BookCard for display */}
              <BookCard book={book} />
              
              {/* Return date display bar */}
              <div className="mt-2 text-center p-2 bg-blue-50 text-blue-700 rounded-md text-sm font-medium border border-blue-100">
               Due: {book.returnDate}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed">
          <h3 className="text-xl font-semibold text-gray-700">No Active Loans</h3>
          <p className="text-gray-500 mb-6">You haven't borrowed any books yet.</p>
          <Link to="/">
            <Button>Browse Catalog</Button>
          </Link>
        </div>
      )}
    </div>
  );
}