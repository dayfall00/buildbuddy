import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/layout/AppNavbar';
import { useAuth } from '../contexts/AuthContext';
import { getUserProjects } from '../services/projectService';
import { getManageableApplications } from '../services/applicationService';
import ProjectCard from '../components/project/ProjectCard';
import './MyProjects.css';

export default function MyProjects() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('my_builds');
    const [myBuilds, setMyBuilds] = useState([]);
    const [joinedBuilds, setJoinedBuilds] = useState([]);
    const [fetchedPendingRequests, setFetchedPendingRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) return;

        async function fetchData() {
            setLoading(true);
            try {
                const allProjects = await getUserProjects(currentUser.uid);

                const owned = allProjects.filter(p => p.ownerId === currentUser.uid || p.creator_id === currentUser.uid);
                const joined = allProjects.filter(p => p.ownerId !== currentUser.uid && p.creator_id !== currentUser.uid);

                setMyBuilds(owned);
                setJoinedBuilds(joined);

                const applications = await getManageableApplications(currentUser.uid);
                const pending = applications.filter(app => app.status === 'pending');
                setFetchedPendingRequests(pending);
            } catch (error) {
                console.error("Error fetching projects and requests:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [currentUser]);

    const activeBuildsCount = myBuilds.filter(p => p.status === 'active' || p.recruiting !== false).length;

    const openRolesCount = myBuilds.reduce((sum, p) => {
        const count = p.roles_open !== undefined ? p.roles_open : (p.openRoles?.length || 0);
        return sum + count;
    }, 0);

    const pendingRequestsCount = myBuilds.reduce((sum, p) => {
        if (p.pending_requests !== undefined) {
            return sum + p.pending_requests.length;
        }
        return sum;
    }, 0) || fetchedPendingRequests.length;

    const currentProjects = activeTab === 'my_builds' ? myBuilds : joinedBuilds;
    const formatNumber = (num) => num.toString().padStart(2, '0');

    return (
        <div className="page-wrapper min-h-screen bg-[#f4f1ea]">
            <AppNavbar />

            <main className="max-w-[1100px] mx-auto px-6 pt-10 pb-16">
                {/* Header Section */}
                <div className="header-flex-row">
                    <h1 className="text-4xl md:text-5xl font-black uppercase text-primary-ink tracking-wide font-heading m-0">
                        MY PROJECTS
                    </h1>
                    <button
                        onClick={() => navigate('/projects/new')}
                        className="btn-sketch-red"
                    >
                        + New Build
                    </button>
                </div>

                {/* Tabs -> Spacer: 24px added from header */}
                <div className="flex gap-6 mt-6 border-b border-gray-300 pb-2">
                    <button
                        className={`text-md font-bold transition-colors pb-1 border-b-[3px] ${activeTab === 'my_builds' ? 'text-primary-ink border-primary-ink' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                        onClick={() => setActiveTab('my_builds')}
                    >
                        My Builds ({myBuilds.length})
                    </button>
                    <button
                        className={`text-md font-bold transition-colors pb-1 border-b-[3px] ${activeTab === 'joined_builds' ? 'text-primary-ink border-primary-ink' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                        onClick={() => setActiveTab('joined_builds')}
                    >
                        Joined Builds ({joinedBuilds.length})
                    </button>
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="text-center py-12 mt-6">
                        <h3 className="handwriting text-2xl text-muted animate-pulse">Loading builds...</h3>
                    </div>
                ) : (
                    <div className="mt-6"> {/* Tabs -> Stats: 24px (mt-6) */}
                        {/* Stats Section */}
                        {activeTab === 'my_builds' && (
                            <>
                                {/* Custom CSS class `stats-grid` enforces 3 columns and prevents vertical stretch */}
                                <div className="stats-grid mt-6">
                                    <div className="stat-box stat-box-active">
                                        <h4 className="stat-title">ACTIVE BUILDS</h4>
                                        <div className="stat-value text-primary-ink">{formatNumber(activeBuildsCount)}</div>
                                    </div>
                                    <div className="stat-box stat-box-roles">
                                        <h4 className="stat-title">OPEN ROLES</h4>
                                        <div className="stat-value stat-value-roles">{formatNumber(openRolesCount)}</div>
                                    </div>
                                    <div className="stat-box stat-box-pending" onClick={() => navigate('/notifications')} style={{ cursor: 'pointer' }}>
                                        <h4 className="stat-title">PENDING REQUESTS</h4>
                                        <div className="stat-value text-primary-ink">{formatNumber(pendingRequestsCount)}</div>
                                    </div>
                                </div>

                                {/* Stats -> Divider: 32px (mt-8) */}
                                <div className="border-t border-gray-300 mt-8 mb-0 w-full block"></div>
                            </>
                        )}

                        {/* Projects Grid */}
                        {/* Custom CSS `projects-grid` enforces 2 columns per row and prevents vertical stretching */}
                        <div className={`projects-grid ${activeTab === 'my_builds' ? 'mt-8' : 'mt-2'}`}>
                            {currentProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}

                            {activeTab === 'my_builds' && (
                                <div
                                    onClick={() => navigate('/projects/new')}
                                    className="placeholder-card"
                                >
                                    <span className="placeholder-text">START A NEW PROJECT</span>
                                </div>
                            )}

                            {activeTab === 'joined_builds' && currentProjects.length === 0 && (
                                <div className="text-center py-12" style={{ gridColumn: '1 / -1' }}>
                                    <h3 className="handwriting text-2xl text-muted mb-4">You haven't joined any builds yet.</h3>
                                    <button onClick={() => navigate('/explore')} className="btn-sketch-red px-6 py-3 mx-auto">
                                        Explore Builds
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}