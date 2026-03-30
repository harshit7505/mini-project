import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Briefcase, Eye, Trash2 } from 'lucide-react';

const Dashboard = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            if (user.role === 'seeker') {
                const res = await axios.get('/api/applications');
                setData(res.data);
            } else if (user.role === 'recruiter') {
                const res = await axios.get('/api/jobs');
                const recruiterJobs = res.data.filter(j => j.recruiter && j.recruiter._id === user._id);
                setData(recruiterJobs);
            }
        } catch (error) {
            toast.error('Failed to load dashboard data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteJob = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await axios.delete(`/api/jobs/${jobId}`);
                toast.success('Job deleted successfully');
                fetchDashboardData();
            } catch (error) {
                toast.error('Failed to delete job');
            }
        }
    };

    if (authLoading || loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            {user.role === 'seeker' ? (
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Applied Jobs</h2>
                    {data.length === 0 ? (
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                            <p className="text-gray-500 mb-6">You haven't applied to any jobs yet. Start exploring!</p>
                            <Link to="/jobs" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700">
                                Browse Jobs
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                            <ul className="divide-y divide-gray-200">
                                {data.map((app) => (
                                    <li key={app._id} className="p-4 sm:p-6 hover:bg-gray-50 flex flex-col sm:flex-row justify-between sm:items-center">
                                        <div>
                                            <h4 className="text-lg font-medium text-blue-600">
                                                <Link to={`/jobs/${app.job._id}`}>{app.job.title}</Link>
                                            </h4>
                                            <p className="text-gray-600 mt-1">{app.job.companyName} • {app.job.location}</p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Applied on: {new Date(app.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="mt-4 sm:mt-0">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize
                                                ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-blue-100 text-blue-800'}`}
                                            >
                                                {app.status}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-700">Your Posted Jobs</h2>
                        <Link to="/jobs/new" className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md font-medium hover:bg-blue-700">
                            Post New Job
                        </Link>
                    </div>

                    {data.length === 0 ? (
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted</h3>
                            <p className="text-gray-500 mb-6">You haven't posted any jobs yet. Create your first job posting!</p>
                        </div>
                    ) : (
                        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                            <ul className="divide-y divide-gray-200">
                                {data.map((job) => (
                                    <li key={job._id} className="p-4 sm:p-6 hover:bg-gray-50 flex flex-col sm:flex-row justify-between sm:items-center">
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900">
                                                <Link to={`/jobs/${job._id}`}>{job.title}</Link>
                                            </h4>
                                            <p className="text-gray-600 mt-1">{job.location} • {job.jobType}</p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Posted: {new Date(job.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="mt-4 sm:mt-0 flex gap-3">
                                            <Link 
                                                to={`/jobs/${job._id}/applicants`}
                                                className="inline-flex items-center text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md"
                                            >
                                                <Eye className="w-4 h-4 mr-1"/>
                                                Applicants
                                            </Link>
                                            <button 
                                                onClick={() => handleDeleteJob(job._id)}
                                                className="inline-flex items-center text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md"
                                            >
                                                <Trash2 className="w-4 h-4 mr-1"/>
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
