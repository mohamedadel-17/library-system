import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity">
          <img src="/src/assets/Logo.png" alt="Logo" className="h-8 w-8" />
          <span>3la Allah</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            Browse Books
          </Link>
          <Link to="/my-books" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
             My Books
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Link to="/signup"> {/* //!Edit this link */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button size="sm" className="gap-2">
              <User className="h-4 w-4" /> 
              Login
            </Button>
          </Link>
        </div>

      </div>
    </nav>
  );
}