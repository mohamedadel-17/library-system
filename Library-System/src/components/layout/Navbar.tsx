import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";

interface NavbarProps {
  onLogout?: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  return (
    <nav className="border-b border-border bg-background shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo Section */}
        <Link 
          to="/" 
          className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity"
        >
          <img src="/src/assets/Logo.png" alt="Logo" className="h-8 w-8" />
          <span>3la Allah</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Browse Books
          </Link>

          <Link 
            to="/my-books" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            My Books
          </Link>
        </div>

        {/* Right Side (Logout + Avatar) */}
        <div className="flex items-center gap-4">

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>

          {/* User Avatar */}
          <ModeToggle />
          <Link to="/profile">
            <Avatar className="h-9 w-9 border border-border cursor-pointer hover:ring-2 hover:ring-primary transition-all">
              <AvatarImage src="/src/assets/user-svgrepo-com.png" alt="user" />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                U
              </AvatarFallback>
            </Avatar>
          </Link>

        </div>

      </div>
    </nav>
  );
}
