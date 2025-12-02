import { useState } from "react";
import { booksData } from "../data/books";
import type { Book } from "../types";

// Components
import BooksTable from "../components/admin/BooksTable";
import AddBookSheet from "../components/admin/AddBookSheet";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function AdminDashboard() {
  const [books, setBooks] = useState<Book[]>(booksData);
  const [searchTerm, setSearchTerm] = useState("");

  // Logic Functions (Passed down as Props)
  const handleAddBook = (newBook: Book) => {
    setBooks([...books, newBook]);
  };

  const handleReturnBook = (id: number) => {
    if (confirm("Confirm returning this book? Fine will be cleared.")) {
      setBooks(
        books.map((book) =>
          book.id === id
            ? { ...book, status: "Available", returnDate: undefined, borrowerName: undefined }
            : book
        )
      );
    }
  };

  const handleDeleteBook = (id: number) => {
    if (confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  // filtering
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.borrowerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Library management overview.</p>
        </div>

        <AddBookSheet onAddBook={handleAddBook} nextId={books.length + 1} />
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
      <BooksTable books={filteredBooks} onReturn={handleReturnBook} onDelete={handleDeleteBook} />
    </div>
  );
}
