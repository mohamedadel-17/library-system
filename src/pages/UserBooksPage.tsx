import { useState, useEffect, useCallback } from 'react';
// import { booksData } from '../data/books'; // إزالة الـ Mock Data
import BookCard from '../components/catalog/BookCard';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { BookOpen } from "lucide-react";
import { type Book, getBorrowedBooksByUser } from '../services/services'; // <== استيراد الخدمة والنوع
import { format, parseISO } from "date-fns"; // لاستخدام دالة format

// دالة مساعدة لجلب الـ User ID من الـ localStorage
const getUserId = (): string | null => {
  return localStorage.getItem('userId');
};

// دالة مساعدة لجلب التوكن
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// دالة تنسيق التاريخ
const formatDateString = (iso?: string) => {
    if (!iso) return '-';
    try {
      return format(parseISO(iso), 'MMM d, yyyy');
    } catch {
      return iso;
    }
};

export default function UserBooksPage() {
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = getUserId();
  const isAuthenticated = !!getAuthToken(); // التحقق من وجود توكن


  const fetchMyBooks = useCallback(async () => {
    if (!userId || !isAuthenticated) {
        setIsLoading(false);
        setMyBooks([]);
        return;
    }
    
    try {
        setIsLoading(true);
        // استخدام نقطة النهاية الجديدة لـ Backend
        const data = await getBorrowedBooksByUser(userId); 
        setMyBooks(data);
    } catch (error) {
        console.error("Failed to fetch user's books:", error);
    } finally {
        setIsLoading(false);
    }
  }, [userId, isAuthenticated]);

  useEffect(() => {
    fetchMyBooks();
  }, [fetchMyBooks]);
  
  
  // بما أننا لا نحتاج لعمليات Borrow/Reserve هنا، سننشئ BookCard مخصصاً لهذه الصفحة
  // لكن يمكننا تعديل BookCard الحالي ليتوافق مع الـ props (بإضافة props اختيارية)

  return (
    <div className="container mx-auto py-10 px-4 min-h-[60vh] mb-8">
      
      {/* Header */}
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" /> My Borrowed Books
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your active loans and due dates.
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg font-semibold text-foreground">Loading your books...</p>
        </div>
      ) : !isAuthenticated ? (
        <div className="text-center py-20 bg-muted rounded-lg border border-dashed border-border/40">
          <h3 className="text-xl font-semibold text-foreground">Login Required</h3>
          <p className="text-muted-foreground mb-6">Please log in to view your borrowed books.</p>
          <Link to="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      ) : myBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myBooks.map((book) => (
            <div key={book.id} className="relative">
              {/* ملاحظة: BookCard الحالي يحتاج currentUserId و onUpdateBook. 
                  سنضطر لتعطيل الإجراءات فيه أو استخدام مكون مخصص هنا.
                  لغرض التعديل السريع، سنقوم بتمرير قيم وهمية لتمكين العرض. 
              */}
              <BookCard 
                book={book} 
                onUpdateBook={() => {}} // دالة وهمية
                currentUserId={userId ?? ''} // قيمة وهمية
              />
              
              {/* تاريخ الإرجاع الفعلي */}
              <div className="mt-2 text-center p-2 bg-primary/10 text-primary rounded-md text-sm font-medium border border-border">
                Due: {formatDateString(book.returnDate)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-20 bg-muted rounded-lg border border-dashed border-border/40">
          <h3 className="text-xl font-semibold text-foreground">No Active Loans</h3>
          <p className="text-muted-foreground mb-6">You haven't borrowed any books yet.</p>
          <Link to="/">
            <Button>Browse Catalog</Button>
          </Link>
        </div>
      )}
    </div>
  );
}