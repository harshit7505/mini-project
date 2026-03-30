import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, DollarSign, Building } from 'lucide-react';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');

    const fetchJobs = async (searchQuery = '') => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/jobs${searchQuery ? `?keyword=${searchQuery}` : ''}`);
            setJobs(res.data);
        } catch (error) {
            console.error('Error fetching jobs', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs(keyword);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Browse Jobs</h1>
                
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex w-full md:w-auto">
                    <div className="relative flex-grow md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by title, company, or keywords..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 border border-transparent rounded-r-md hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </form>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                    <p className="mt-1 text-gray-500">Try adjusting your search criteria.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <div key={job._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition p-6 flex flex-col">
                            <div className="flex-grow">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{job.title}</h2>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <Building className="h-4 w-4 mr-2" />
                                        {job.companyName}
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <DollarSign className="h-4 w-4 mr-2" />
                                        ${job.salary?.toLocaleString() || 'Not specified'}
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {job.jobType}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <Link
                                    to={`/jobs/${job._id}`}
                                    className="w-full flex justify-center items-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Jobs;
