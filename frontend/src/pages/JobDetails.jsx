import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { MapPin, DollarSign, Building, Clock, Briefcase } from 'lucide-react';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [customResumeUrl, setCustomResumeUrl] = useState('');

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`/api/jobs/${id}`);
                setJob(res.data);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load job details');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleApply = async () => {
        if (!user) {
            navigate('/login', { state: { from: { pathname: `/jobs/${id}` } } });
            return;
        }

        if (user.role === 'recruiter') {
            toast.error('Recruiters cannot apply for jobs');
            return;
        }

        try {
            setApplying(true);
            await axios.post(`/api/jobs/${id}/apply`, { resumeUrl: customResumeUrl });
            toast.success('Successfully applied for this job!');
            // Ideally we'd reflect this state locally to prevent double clicks
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to apply');
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h2>
                <Link to="/jobs" className="text-blue-600 hover:text-blue-800">Back to all jobs</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Link to="/jobs" className="text-sm text-blue-600 hover:text-blue-800 mb-6 inline-block">
                &larr; Back to jobs
            </Link>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-gray-200 bg-slate-50">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-gray-600">
                                <span className="flex items-center">
                                    <Building className="h-5 w-5 mr-1" />
                                    {job.companyName}
                                </span>
                                <span className="flex items-center">
                                    <MapPin className="h-5 w-5 mr-1" />
                                    {job.location}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[250px]">
                            {user && user.role === 'seeker' && (
                                <input
                                    type="url"
                                    placeholder="Portfolio/Resume Link (Optional)"
                                    value={customResumeUrl}
                                    onChange={(e) => setCustomResumeUrl(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                            )}
                            <button
                                onClick={handleApply}
                                disabled={applying || (user && user.role === 'recruiter')}
                                className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                {applying ? 'Applying...' : 'Apply Now'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
                    <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200 flex items-start gap-4">
                        <DollarSign className="h-8 w-8 text-blue-500 shrink-0" />
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Salary</p>
                            <p className="text-lg font-semibold text-gray-900">${job.salary?.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200 flex items-start gap-4">
                        <Briefcase className="h-8 w-8 text-blue-500 shrink-0" />
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Job Type</p>
                            <p className="text-lg font-semibold text-gray-900">{job.jobType}</p>
                        </div>
                    </div>
                    <div className="p-6 flex items-start gap-4">
                        <Clock className="h-8 w-8 text-blue-500 shrink-0" />
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Posted</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {new Date(job.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
                    <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                        {job.description}
                    </div>

                    <div className="mt-10 pt-8 border-t border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">About {job.companyName}</h3>
                        <p className="text-gray-700 whitespace-pre-line">
                            {job.recruiter?.profile?.companyDescription || 'No company description provided.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
