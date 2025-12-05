import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, AlertCircle, DollarSign, TrendingUp } from "lucide-react";
// import { differenceInDays, parseISO } from "date-fns"; // لن نستخدمها إذا كان الـ Backend يحسب الغرامات

// import { mostBorrowedData } from '../data/statistics'; // إزالة بيانات الـ Mock
// import { booksData } from '../data/books'; // إزالة بيانات الـ Mock

import { useState, useEffect, useCallback } from "react";
import { 
    getSummaryStats, 
    getMostBorrowedBooks
} from '../services/services'; // <== استيراد الدوال والدوال
import type { MostBorrowedBook } from '../services/services'; // <== استيراد النوع فقط

import type { SummaryStats } from '../services/services'; // <== استيراد النوع فقط

// الأنواع الافتراضية
const defaultSummary: SummaryStats = { totalBooks: 0, borrowedBooks: 0, totalFines: 0 };

export default function StatisticsPage() {
  const [summaryStats, setSummaryStats] = useState<SummaryStats>(defaultSummary);
  const [mostBorrowed, setMostBorrowed] = useState<MostBorrowedBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
        // جلب البيانات من الـ API
        const [stats, topBooks] = await Promise.all([
            getSummaryStats(),
            getMostBorrowedBooks(),
        ]);

        setSummaryStats(stats);
        setMostBorrowed(topBooks);
    } catch (error) {
        console.error("Failed to fetch statistics:", error);
        // عرض رسالة خطأ للمستخدم
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // حساب أقصى عدد للاستعارة (لشريط التقدم)
  const maxCount = Math.max(...mostBorrowed.map(b => b.count), 1);

  if (isLoading) {
    return (
        <div className="container mx-auto py-10 px-4 text-center">
            <p className="text-lg mt-10">Loading statistics...</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Library Statistics</h1>
          <p className="text-muted-foreground">Real-time analytics and reports.</p>
        </div>
      </div>

      {/* --- Section 1: Summary Cards --- */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="shadow-sm bg-background border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* استخدام بيانات الـ API */}
            <div className="text-2xl font-bold text-foreground">{summaryStats.totalBooks}</div>
            <p className="text-xs text-muted-foreground">Books in catalog</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-background border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Currently Borrowed</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* استخدام بيانات الـ API */}
            <div className="text-2xl font-bold text-foreground">{summaryStats.borrowedBooks}</div>
            <p className="text-xs text-muted-foreground">Active loans</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-background border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Active Fines</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* استخدام بيانات الـ API */}
            <div className="text-2xl font-bold text-destructive">${summaryStats.totalFines}</div>
            <p className="text-xs text-muted-foreground">Unpaid late fees</p>
          </CardContent>
        </Card>
      </div>

      {/* --- Section 2: Most Borrowed Books Chart --- */}
      <div className="rounded-md border border-border bg-background shadow-sm">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle className="text-foreground">Most Borrowed Books</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
              Top performing books based on historical data.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {mostBorrowed.map((book) => (
                <div key={book.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium text-foreground">
                      {book.title} <span className="text-muted-foreground font-normal">- {book.author}</span>
                    </div>
                    <div className="font-bold text-foreground">{book.count} times</div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${(book.count / maxCount) * 100}%` }}
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