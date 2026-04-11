import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';


const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#f0f2f5]">
            <Toaster position="top-right" />
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
