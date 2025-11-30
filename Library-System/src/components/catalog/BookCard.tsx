import React, { useState } from 'react';
import type { Book } from '../../types';
import { format } from "date-fns"; // for date format
import { Calendar as CalendarIcon } from "lucide-react"; // calendar icon

// Shadcn UI imports
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [date, setDate] = useState<Date>(); // To store the selected date
  const isAvailable = book.status === "Available";


  const handleAction = () => {
    if (isAvailable) {
      //! >>>>>>
      // Borrowing status (must have chosen a date)
      if (!date) { 
        alert("Please select a return date first!");
        return;
      } 
      //! <<<<<<<
      alert(`Success! You borrowed ${book.title}. Please return it by ${format(date, "PPP")}.`);
    } else {
      alert(`Success! You reserved ${book.title}. We will notify you on ${book.returnDate}.`);
    }
    setIsOpen(false);
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
        <img src={book.cover} alt={book.title} className="object-cover w-full h-full" /> //? book cover
        <Badge 
          className="absolute top-2 right-2" 
          variant={isAvailable ? "default" : "destructive"} 
        >
          {book.status}
        </Badge>
      </div>

      {/* book title & author */}
      <CardHeader>
        <CardTitle className="line-clamp-1">{book.title}</CardTitle>
        <CardDescription>{book.author}</CardDescription>
      </CardHeader>

      <CardContent className="grow">
      {/* book category */}
        <span className="text-xs font-medium bg-secondary px-2 py-1 rounded text-secondary-foreground">
          {book.category}
        </span>
        {/* If it's borrowed, when will it be returned? */}
        {!isAvailable && book.returnDate && (
          <p className="text-xs text-red-500 mt-3 font-medium">
             Returns: {book.returnDate}
          </p>
        )}
      </CardContent>

      <CardFooter>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full"
              variant={isAvailable ? "default" : "outline"}
              // Change the button style if it's a reservation
              {...(!isAvailable && { className: "w-full border-red-200 text-red-600 hover:bg-red-50" })}
            >
              {isAvailable ? "Borrow Now" : "Reserve"}
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {isAvailable ? "Borrow this Book" : "Reserve this Book"}
              </DialogTitle>
              <DialogDescription>
                {isAvailable 
                  ? "Please specify when you will return this book." 
                  : "This book is currently borrowed. Reserve it now to pick it up when it returns."}
              </DialogDescription>
            </DialogHeader>

            {/* ---- select date ----- */}
            <div className="py-4">
              {isAvailable ? (
                // If the book is available -> Show the result to choose a return date
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Select Return Date:</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()} // منع اختيار تواريخ قديمة
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                // If the book is reserved -> only show the availability date
                <p className="text-sm">
                  Expected Availability Date: <strong>{book.returnDate}</strong>
                </p>
              )}
            </div>
            {/* ------------------------------------------ */}

            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleAction} disabled={isAvailable && !date}>
                {isAvailable ? "Confirm Borrow" : "Confirm Reservation"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default BookCard;