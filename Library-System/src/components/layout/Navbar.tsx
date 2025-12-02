import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react"; // Logout Icon
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Avatar Component

interface NavbarProps {
  onLogout?: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
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

        {/* User Actions (Avatar + Logout) */}
        <div className="flex items-center gap-4">
          
          {/* Logout button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onLogout} 
            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" /> 
            <span className="hidden sm:inline">Logout</span>
          </Button>

          {/* User Avatar  */}
          <Link to="/profile">
            <Avatar className="h-9 w-9 border cursor-pointer hover:ring-2 hover:ring-primary transition-all">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">U</AvatarFallback>
            </Avatar>
          </Link>
          
        </div>

      </div>
    </nav>
  );
}