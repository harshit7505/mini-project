import { Link } from 'react-router-dom';
import { Search, Briefcase, Building } from 'lucide-react';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                            Find Your Dream Job Today
                        </h1>
                        <p className="mt-4 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10">
                            Connecting talented professionals with top companies. Explore thousands of job opportunities.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/jobs" className="bg-white text-blue-700 hover:bg-gray-50 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition duration-200">
                                Browse Jobs
                            </Link>
                            <Link to="/signup" className="border-2 border-white hover:bg-white hover:text-blue-700 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition duration-200">
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-12 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-3xl font-bold text-gray-900">10,000+</h3>
                            <p className="text-gray-500 mt-2 text-lg">Active Jobs</p>
                        </div>
                        <div className="p-6 border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-gray-200">
                            <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-3xl font-bold text-gray-900">1,500+</h3>
                            <p className="text-gray-500 mt-2 text-lg">Companies</p>
                        </div>
                        <div className="p-6">
                            <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-3xl font-bold text-gray-900">100k+</h3>
                            <p className="text-gray-500 mt-2 text-lg">Active Users</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Info */}
            <div className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Why choose JobPortal?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <h3 className="text-xl font-semibold mb-3">For Job Seekers</h3>
                            <p className="text-gray-600">Create a profile, upload your resume, and apply to jobs with a single click. Track your application status in real-time.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <h3 className="text-xl font-semibold mb-3">For Employers</h3>
                            <p className="text-gray-600">Post jobs, manage applications, and find the best candidates using our streamlined recruiter dashboard.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <h3 className="text-xl font-semibold mb-3">Fast & Secure</h3>
                            <p className="text-gray-600">Built with modern web technologies, ensuring a fast browsing experience and comprehensive data security.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
