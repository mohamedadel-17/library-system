import React, { useState } from "react";
import type { Book } from "../../types";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const isAvailable = book.status === "Available";

  const handleAction = () => {
    if (isAvailable) {
      if (!date) {
        alert("Please select a return date first!");
        return;
      }
      alert(`Success! You borrowed ${book.title}. Return it by ${format(date, "PPP")}.`);
    } else {
      alert(`Success! You reserved ${book.title}. We will notify you on ${book.returnDate}.`);
    }
    setIsOpen(false);
  };

  const formatDateString = (iso?: string) => {
    if (!iso) return "-";
    try {
      return format(parseISO(iso), "PPP");
    } catch {
      return iso;
    }
  };

  const triggerBtnClass = cn(
    "w-full",
    isAvailable ? "" : "border-destructive/30 text-destructive hover:bg-destructive/10"
  );

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow overflow-hidden border border-border bg-background rounded-lg pt-0">
      
      {/* Cover */}
      <div className="relative w-full aspect-[3/4] bg-muted/40 flex items-center justify-center rounded-t-lg overflow-hidden">
        <img src={book.cover} alt={book.title} className="object-cover w-full h-full" />
        <Badge
          className="absolute top-2 right-2"
          variant={isAvailable ? "default" : "destructive"}
        >
          {book.status}
        </Badge>
      </div>

      {/* Title & Author */}
      <CardHeader className="">
        <CardTitle className="line-clamp-1 text-foreground">{book.title}</CardTitle>
        <CardDescription className="text-muted-foreground">{book.author}</CardDescription>
      </CardHeader>

      {/* Category & Return Date */}
      <CardContent className="">
        <span className="text-xs font-medium bg-primary/10 px-2 py-1 rounded text-primary">
          {book.category}
        </span>

        {!isAvailable && book.returnDate && (
          <p className="text-xs text-destructive mt-2 font-medium">
            Returns: {formatDateString(book.returnDate)}
          </p>
        )}
      </CardContent>

      {/* Bottom Action Button */}
      <CardFooter className="mt-auto pb-3">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant={isAvailable ? "default" : "outline"} className={triggerBtnClass}>
              {isAvailable ? "Borrow Now" : "Reserve"}
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {isAvailable ? "Borrow this Book" : "Reserve this Book"}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {isAvailable
                  ? "Select when you will return this book."
                  : "This book is borrowed. Reserve it now."}
              </DialogDescription>
            </DialogHeader>

            <div>
              {isAvailable ? (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">Return Date:</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(d) => d < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Expected Availability:{" "}
                  <strong className="text-foreground">{formatDateString(book.returnDate)}</strong>
                </p>
              )}
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
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
