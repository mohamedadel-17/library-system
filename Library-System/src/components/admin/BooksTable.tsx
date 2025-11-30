import React from 'react';
import type { Book } from '../../types';
import { differenceInDays, parseISO } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Undo2 } from "lucide-react";

interface BooksTableProps {
  books: Book[];
  onReturn: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function BooksTable({ books, onReturn, onDelete }: BooksTableProps) {
  
  // Fine calculation function
  const calculateFine = (returnDate?: string) => {
    if (!returnDate) return 0;
    const today = new Date();
    const due = parseISO(returnDate);
    const diff = differenceInDays(today, due);
    return diff > 0 ? diff * 10 : 0; 
  };

  return (
    <div className="rounded-md border bg-white shadow overflow-hidden">
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
                <TableCell className="font-medium">{book.title}</TableCell>
                {/* Status */}
                <TableCell>
                  <Badge variant={book.status === "Available" ? "default" : "secondary"}>
                    {book.status}
                  </Badge>
                </TableCell>
                {/* Borrower */}
                <TableCell>
                  {book.status === "Borrowed" ? (
                    <span className="text-sm text-gray-600">{book.borrowerName || "Unknown"}</span>
                  ) : "-"}
                </TableCell>
                {/* Due Date */}
                <TableCell>
                  {book.returnDate ? (
                    <span className={isOverdue ? "text-red-500 font-bold" : ""}>
                      {book.returnDate}
                    </span>
                  ) : "-"}
                </TableCell>
                {/* Fine */}
                <TableCell>
                  {isOverdue ? (
                    <Badge variant="destructive" className="bg-red-100 text-red-600 hover:bg-red-200">
                      ${fine} Due
                    </Badge>
                  ) : (
                    <span className="text-green-600 font-bold">$0</span>
                  )}
                </TableCell>
                {/* Actions */}
                <TableCell className="flex justify-end gap-2">
                  {book.status === "Borrowed" && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      onClick={() => onReturn(book.id)}
                    >
                      <Undo2 size={16} className="mr-1"/> Return
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 "
                    onClick={() => onDelete(book.id)}
                  >
                    <Trash2 size={16}/>
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