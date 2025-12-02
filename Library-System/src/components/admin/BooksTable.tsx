import type { Book } from "../../types";
import { differenceInDays, parseISO } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Undo2 } from "lucide-react";

interface BooksTableProps {
  books: Book[];
  onReturn: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function BooksTable({
  books,
  onReturn,
  onDelete,
}: BooksTableProps) {
  // Fine calculation function
  const calculateFine = (returnDate?: string) => {
    if (!returnDate) return 0;
    const today = new Date();
    const due = parseISO(returnDate);
    const diff = differenceInDays(today, due);
    return diff > 0 ? diff * 10 : 0;
  };

  return (
    <div className="rounded-md border border-border bg-card shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Borrower</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Fine ($)</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {books.map((book) => {
            const fine = calculateFine(book.returnDate);
            const isOverdue = fine > 0;

            return (
              <TableRow key={book.id}>
                {/* Book Title */}
                <TableCell className="font-medium text-foreground">
                  {book.title}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    variant={book.status === "Available" ? "default" : "secondary"}
                    className={
                      book.status === "Available"
                        ? "bg-green-400/40 text-foreground"
                        : "bg-primary/10 text-primary"
                    }
                  >
                    {book.status}
                  </Badge>
                </TableCell>

                {/* Borrower */}
                <TableCell>
                  {book.status === "Borrowed" ? (
                    <span className="text-sm text-muted-foreground">
                      {book.borrowerName || "Unknown"}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>

                {/* Due Date */}
                <TableCell>
                  {book.returnDate ? (
                    <span
                      className={
                        isOverdue ? "text-destructive font-bold" : "text-muted-foreground"
                      }
                    >
                      {book.returnDate}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>

                {/* Fine */}
                <TableCell>
                  {isOverdue ? (
                    <span
                      className=" text-destructive font-bold"
                    >
                      ${fine} Due
                    </span>
                  ) : (
                    <span className="text-success font-bold">$0</span>
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell className="flex justify-end gap-2">
                  {book.status === "Borrowed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onReturn(book.id)}
                      className="gap-2 border-primary/20 text-primary hover:bg-primary/10"
                    >
                      <Undo2 size={16} className="mr-1" /> Return
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(book.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
