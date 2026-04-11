import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FileText, User, Mail, ExternalLink } from 'lucide-react';

const ViewApplicants = () => {
    const { id } = useParams();
    const { user, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [applicants, setApplicants] = useState([]);
    const [jobInfo, setJobInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user || user.role !== 'recruiter') {
                navigate('/dashboard');
            } else {
                fetchApplicants();
            }
        }
    }, [user, authLoading, navigate, id]);

    const fetchApplicants = async () => {
        try {
            // First fetch job info to get the title
            const jobRes = await axios.get(`/api/jobs/${id}`);
            setJobInfo(jobRes.data);

            // Then fetch applicants
            const appRes = await axios.get(`/api/jobs/${id}/applicants`);
            setApplicants(appRes.data);
        } catch (error) {
            toast.error('Failed to load applicants');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (applicationId, newStatus) => {
        try {
            await axios.put(`/api/applications/${applicationId}/status`, { status: newStatus });
            toast.success(`Application marked as ${newStatus}`);
            // Update local state to reflect change without re-fetching everything
            setApplicants(applicants.map(app => 
                app._id === applicationId ? { ...app, status: newStatus } : app
            ));
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update status');
            console.error(error);
        }
    };

    if (loading || authLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-6">
                <Link to="/dashboard" className="text-sm text-blue-600 hover:text-blue-800 inline-block mb-2">
                    &larr; Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">
                    Applicants for {jobInfo?.title || 'Job'}
                </h1>
                <p className="text-gray-600 mt-2">
                    Found {applicants.length} applicant{applicants.length !== 1 ? 's' : ''}.
                </p>
            </div>

            {applicants.length === 0 ? (
                <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
                    <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No applicants yet</h3>
                    <p className="text-gray-500">Wait for seekers to discover and apply to your job posting.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {applicants.map((app) => (
                        <div key={app._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{app.applicant.name}</h3>
                                    <div className="flex items-center text-gray-600 mt-1">
                                        <Mail className="h-4 w-4 mr-2" />
                                        <a href={`mailto:${app.applicant.email}`} className="text-blue-600 hover:underline">
                                            {app.applicant.email}
                                        </a>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Applied on: {new Date(app.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right flex flex-col gap-2">
                                    <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize 
                                        ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-blue-100 text-blue-800'}`}>
                                        Status: {app.status}
                                    </span>
                                    {app.status === 'pending' && (
                                        <div className="flex gap-2 mt-1">
                                            <button 
                                                onClick={() => handleStatusChange(app._id, 'accepted')}
                                                className="text-xs bg-green-50 text-green-700 hover:bg-green-100 px-2 py-1 rounded border border-green-200 transition"
                                            >
                                                Accept
                                            </button>
                                            <button 
                                                onClick={() => handleStatusChange(app._id, 'rejected')}
                                                className="text-xs bg-red-50 text-red-700 hover:bg-red-100 px-2 py-1 rounded border border-red-200 transition"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <FileText className="h-4 w-4 mr-2" /> Resume
                                </h4>
                                {((app.resumeUrl && app.resumeUrl !== 'Not Provided') || app.applicant?.profile?.resumeUrl) ? (
                                    <a 
                                        href={app.resumeUrl !== 'Not Provided' ? app.resumeUrl : app.applicant.profile.resumeUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition bg-blue-50 px-3 py-2 rounded-md"
                                    >
                                        View Attached Resume <ExternalLink className="h-3 w-3 ml-1" />
                                    </a>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">No resume provided.</p>
                                )}
                            </div>

                            {app.applicant.profile?.skills?.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {app.applicant.profile.skills.map((skill, index) => (
                                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewApplicants;
