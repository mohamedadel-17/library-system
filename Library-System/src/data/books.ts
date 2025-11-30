import type { Book } from '../types/index';

export const booksData: Book[] = [
  // --- Computer Science & Programming ---
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    status: "Available",
    cover: ""
  },
  {
    id: 2,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    status: "Borrowed",
    returnDate: "2023-12-10",
    cover: ""
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    category: "Programming",
    status: "Available",
    cover: ""
  },
  {
    id: 4,
    title: "Design Patterns",
    author: "Erich Gamma",
    category: "Programming",
    status: "Borrowed",
    returnDate: "2023-12-05",
    cover: ""
  },
  {
    id: 5,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    category: "Programming",
    status: "Available",
    cover: ""
  },

  // --- Data Science & AI (بناءً على تخصص الكلية) ---
  {
    id: 6,
    title: "Python for Data Analysis",
    author: "Wes McKinney",
    category: "Data Science",
    status: "Available",
    cover: ""
  },
  {
    id: 7,
    title: "Deep Learning",
    author: "Ian Goodfellow",
    category: "Data Science",
    status: "Borrowed",
    returnDate: "2023-12-20",
    cover: ""
  },
  {
    id: 8,
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell",
    category: "Data Science",
    status: "Available",
    cover: ""
  },
  {
    id: 9,
    title: "The Elements of Statistical Learning",
    author: "Trevor Hastie",
    category: "Data Science",
    status: "Borrowed",
    returnDate: "2023-11-30",
    cover: ""
  },

  // --- Fiction & Literature ---
  {
    id: 10,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    status: "Available",
        cover: ""
  },
  {
    id: 11,
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    status: "Borrowed",
    returnDate: "2023-12-15",
    cover: ""
  },
  {
    id: 12,
    title: "Dune",
    author: "Frank Herbert",
    category: "Fiction",
    status: "Available",
    cover: ""
  },
  {
    id: 13,
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    category: "Fiction",
    status: "Available",
    cover: ""
  },

  // --- Business & Self Help ---
  {
    id: 14,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Business",
    status: "Borrowed",
    returnDate: "2023-12-01",
    cover: ""
  },
  {
    id: 15,
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business",
    status: "Available",
    cover: ""
  },
  {
    id: 16,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Business",
    status: "Available",
    cover: ""
  },

  // --- History ---
  {
    id: 17,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
    status: "Borrowed",
    returnDate: "2023-12-08",
    cover: ""
  },
  {
    id: 18,
    title: "The Silk Roads",
    author: "Peter Frankopan",
    category: "History",
    status: "Available",
    cover: ""
  }
];