export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Copyright */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-gray-900">3la Allah Library</h3>
            <p className="text-sm text-gray-500 mt-1">
              © 2025 3la Allah Team. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="" className="hover:text-primary hover:underline">Privacy Policy</a>
            <a href="" className="hover:text-primary hover:underline">Terms of Service</a>
            <a href="" className="hover:text-primary hover:underline">Contact Support</a>
          </div>

        </div>
      </div>
    </footer>
  );
}