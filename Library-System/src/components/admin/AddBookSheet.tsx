import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PlusCircle } from "lucide-react";
// import type { Book } from '../../types'; // <== لم تعد ضرورية إذا كانت في books.service
import { useState } from "react";
import { createBook } from "../../services/services"; // <== استيراد الخدمة والأنواع
import type { Book } from "../../services/services";
import type { CreateBookDto } from "../../services/services";

interface AddBookSheetProps {
  onAddBook: (book: Book) => void;
  // nextId: number; // <== لم تعد ضرورية، الـ Backend يحدد الـ ID
}

export default function AddBookSheet({ onAddBook }: AddBookSheetProps) {
  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState<CreateBookDto>({ title: "", author: "", category: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => { // <== دالة غير متزامنة
    if (!newBook.title || !newBook.author) return alert("Please fill details");
    
    setIsSubmitting(true);
    
    const apiPayload: CreateBookDto = {
        title: newBook.title,
        author: newBook.author,
        category: newBook.category || "General",
    };

    try {
        const addedBook = await createBook(apiPayload); // <== استدعاء الـ API
        onAddBook(addedBook); // تمرير الكتاب الذي يحتوي على الـ ID الحقيقي من الـ Backend
        setNewBook({ title: "", author: "", category: "" });
        setOpen(false);
    } catch (error) {
        console.error("Failed to add book:", error);
        alert("Failed to add book. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
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
          <Button onClick={handleSubmit} disabled={isSubmitting}>
             {isSubmitting ? "Saving..." : "Save Book"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}