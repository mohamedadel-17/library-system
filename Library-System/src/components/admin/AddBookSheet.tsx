import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PlusCircle } from "lucide-react";
import type { Book } from '../../types';
import { useState } from "react";

interface AddBookSheetProps {
  onAddBook: (book: Book) => void;
  nextId: number;
}

export default function AddBookSheet({ onAddBook, nextId }: AddBookSheetProps) {
  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState({ title: "", author: "", category: "" });

  const handleSubmit = () => {
    if (!newBook.title || !newBook.author) return alert("Please fill details");

    const bookToAdd: Book = {
      id: nextId,
      title: newBook.title,
      author: newBook.author,
      category: newBook.category || "General",
      status: "Available",
      cover: "https://placehold.co/400x600?text=New+Book"
    };

    onAddBook(bookToAdd);
    setNewBook({ title: "", author: "", category: "" });
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2"><PlusCircle size={16}/> Add New Book</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a New Book</SheetTitle>
        </SheetHeader>
        <div className="grid items-center gap-5 px-4">
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} placeholder="Book Title"/>
          </div>
          <div className="grid gap-2">
            <Label>Author</Label>
            <Input value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} placeholder="Author Name"/>
          </div>
          <div className="grid gap-2">
            <Label>Category</Label>
            <Input value={newBook.category} onChange={e => setNewBook({...newBook, category: e.target.value})} placeholder="Category"/>
          </div>
          <Button onClick={handleSubmit}>Save Book</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}