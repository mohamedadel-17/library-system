import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, AlertCircle, DollarSign, TrendingUp } from "lucide-react";
import { differenceInDays, parseISO } from "date-fns";

import { mostBorrowedData } from '../data/statistics';
import { booksData } from '../data/books';

export default function StatisticsPage() {

  const totalBooks = booksData.length;
  const borrowedBooks = booksData.filter(b => b.status === "Borrowed").length;

  const totalFines = booksData.reduce((acc, book) => {
    if (book.status === "Borrowed" && book.returnDate) {
      const today = new Date();
      const due = parseISO(book.returnDate);
      const diff = differenceInDays(today, due);
      return diff > 0 ? acc + (diff * 10) : acc;
    }
    return acc;
  }, 0);


  return (
    <div className="container mx-auto py-10 px-4">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Library Statistics</h1>
          <p className="text-muted-foreground">Real-time analytics and reports.</p>
        </div>
      </div>

      {/* --- Section 1: Summary Cards --- */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBooks}</div>
            <p className="text-xs text-muted-foreground">Books in catalog</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Currently Borrowed</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{borrowedBooks}</div>
            <p className="text-xs text-muted-foreground">Active loans</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Fines</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalFines}</div>
            <p className="text-xs text-muted-foreground">Unpaid late fees</p>
          </CardContent>
        </Card>
      </div>

      {/* --- Section 2: Most Borrowed Books Chart --- */}
      <div className="rounded-md border bg-white shadow-sm">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Most Borrowed Books</CardTitle>
            </div>
            <CardDescription>
              Top 5 performing books based on historical data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mostBorrowedData.map((book) => (
                <div key={book.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">
                      {book.title} <span className="text-muted-foreground font-normal">- {book.author}</span>
                    </div>
                    <div className="font-bold">{book.count} times</div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500 ease-out" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}