import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';
import { Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-transparent text-gray-200">
            <Toaster position="top-right" />
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="mt-auto py-6 mb-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-3">
                    <p className="text-center text-sm text-gray-400 font-medium">
                        &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-400">For more details contact us:</p>
                    <div className="flex flex-wrap justify-center items-center gap-4 text-gray-400 text-sm">
                        <a href="mailto:agrawalsanskar60@gmail.com" className="hover:text-blue-400 flex items-center gap-1 transition-colors">
                            <Mail className="w-4 h-4" /> agrawalsanskar60@gmail.com
                        </a>
                        <span className="hidden sm:inline text-gray-600">|</span>
                        <a href="tel:+917668879430" className="hover:text-blue-400 flex items-center gap-1 transition-colors">
                            <Phone className="w-4 h-4" /> +91 7668879430
                        </a>
                    </div>
                    <div className="flex gap-4 text-gray-400 mt-1">
                        <a href="#" className="hover:text-[#1877F2] transition-colors"><Facebook className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-[#1DA1F2] transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-[#0A66C2] transition-colors"><Linkedin className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-[#E4405F] transition-colors"><Instagram className="w-5 h-5" /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
