import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { User, Mail, Briefcase, FileText, Building } from 'lucide-react';

const Profile = () => {
    const { user, fetchUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        skills: '',
        resumeUrl: '',
        companyName: '',
        companyDescription: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                skills: user.profile?.skills?.join(', ') || '',
                resumeUrl: user.profile?.resumeUrl || '',
                companyName: user.profile?.companyName || '',
                companyDescription: user.profile?.companyDescription || ''
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put('/api/users/profile', formData);
            toast.success('Profile updated successfully');
            fetchUser(); // Refresh user data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-200 bg-slate-50 flex items-center gap-4">
                    <div className="bg-blue-100 p-4 rounded-full">
                        <User className="h-10 w-10 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                        <span className="inline-flex items-center px-2.5 py-0.5 mt-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                            {user.role} Account
                        </span>
                    </div>
                </div>

                <div className="p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Common Fields */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                    <User className="w-4 h-4 mr-1 text-gray-500" /> Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                    <Mail className="w-4 h-4 mr-1 text-gray-500" /> Email
                                </label>
                                <input
                                    type="email"
                                    disabled
                                    value={user.email}
                                    className="block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-500 sm:text-sm cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Seeker Specific Fields */}
                        {user.role === 'seeker' && (
                            <>
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                        <Briefcase className="w-4 h-4 mr-1 text-gray-500" /> Skills (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. React, Node.js, Python"
                                        value={formData.skills}
                                        onChange={(e) => setFormData({...formData, skills: e.target.value})}
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                        <FileText className="w-4 h-4 mr-1 text-gray-500" /> Resume URL
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                                        value={formData.resumeUrl}
                                        onChange={(e) => setFormData({...formData, resumeUrl: e.target.value})}
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                            </>
                        )}

                        {/* Recruiter Specific Fields */}
                        {user.role === 'recruiter' && (
                            <>
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                        <Building className="w-4 h-4 mr-1 text-gray-500" /> Company Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                        <FileText className="w-4 h-4 mr-1 text-gray-500" /> Company Description
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={formData.companyDescription}
                                        onChange={(e) => setFormData({...formData, companyDescription: e.target.value})}
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                            </>
                        )}

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
