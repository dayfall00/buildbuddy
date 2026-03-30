import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/layout/AppNavbar';
import QuickAccessPanel from '../components/home/QuickAccessPanel';
import YourStackPanel from '../components/home/YourStackPanel';
import TopBuildersPanel from '../components/home/TopBuildersPanel';
import TrendingTechPanel from '../components/home/TrendingTechPanel';
import { useAuth } from '../contexts/AuthContext';
import { getUserProjects } from '../services/projectService';
import '../pages/Home.css';

export default function MyProjects() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('All');
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currentUser) return;

        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const fetchedProjects = await getUserProjects(currentUser.uid);
                // In a real app we might merge joined/owned/applied differently. 
                // For now we just use the user projects.
                setAllProjects(fetchedProjects);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError("Failed to load your projects.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [currentUser]);

    // Filtering logic
    const displayedProjects = allProjects.filter(p => {
        const isRecruiting = p.status === 'active' || p.recruiting !== false;
        if (activeTab === 'Active') return isRecruiting;
        if (activeTab === 'Archived') return !isRecruiting;
        return true; 
    });

    // Pinned projects: grab the first two active projects, just as an example
    const pinnedProjects = allProjects.filter(p => (p.status === 'active' || p.recruiting !== false)).slice(0, 2);

    return (
        <div className="home-page">
            <AppNavbar />
            <div className="container home-grid">

                {/* Left Column: Quick Access & Your Stack */}
                <aside className="home-left-col">
                    <QuickAccessPanel />
                    <YourStackPanel />
                </aside>

                {/* Center Column: My Projects Feed */}
                <main className="home-main-col">
                    
                    {/* Header Section (Matching IdeaInputBar spacing) */}
                    <div className="sketch-card idea-input-container p-6 mb-6 pb-2" style={{ borderBottom: 'none' }}>
                        <h1 className="text-3xl font-black font-heading text-on-surface mb-1">🚀 My Projects</h1>
                        <p className="text-on-surface-variant font-medium text-sm">Track, manage and build your ideas</p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex gap-3 mb-6 px-1">
                        {['All', 'Active', 'Archived'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
                                    activeTab === tab 
                                    ? 'bg-secondary-container text-on-secondary-container shadow-sm' 
                                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface border border-outline-variant hover:shadow-sm'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {error && <div className="sketch-card error-card mb-4">{error}</div>}

                    {loading ? (
                        <div className="loading-state sketch-card text-center py-5 mt-4">
                            <h3 className="handwriting">Loading your workspace...</h3>
                        </div>
                    ) : (
                        <div className="project-feed-list flex flex-col gap-4">
                            
                            {/* Pinned Projects Section - If activeTab == All */}
                            {activeTab === 'All' && pinnedProjects.length > 0 && (
                                <div className="pinned-section mb-6">
                                    <h3 className="text-sm font-bold tracking-wider text-on-surface-variant uppercase mb-3 px-1">Pinned Projects</h3>
                                    <div className="flex flex-col gap-3">
                                        {pinnedProjects.map(project => (
                                            <div key={`pinned-${project.id}`} 
                                                className="bg-surface border border-thin rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all cursor-pointer flex gap-4 items-center"
                                                onClick={() => navigate(`/projects/${project.id}`)}
                                            >
                                                <div className="w-16 h-16 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 border border-outline-variant">
                                                    <span className="text-2xl font-black text-primary">{project.title?.charAt(0).toUpperCase()}</span>
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="font-heading font-bold text-on-surface leading-tight text-lg mb-1">{project.title}</h4>
                                                    <div className="w-full bg-surface-container-low rounded-full h-1.5 max-w-[200px] mb-2">
                                                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '65%' }}></div>
                                                    </div>
                                                </div>
                                                <button className="px-4 py-2 rounded-full bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-colors shadow-sm whitespace-nowrap">
                                                    Continue Building
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-thin mt-6"></div>
                                </div>
                            )}

                            {/* Project List (Main Feed) */}
                            {displayedProjects.length === 0 ? (
                                <div className="empty-state sketch-card text-center py-8 mt-4 bg-surface-container-lowest border-thin shadow-sm">
                                    <h3 className="text-xl font-heading mb-2">No projects found for {activeTab}.</h3>
                                    <p className="text-on-surface-variant text-sm">Start building something new or explore available projects.</p>
                                </div>
                            ) : (
                                displayedProjects.map(project => {
                                    const isRecruiting = project.status === 'active' || project.recruiting !== false;
                                    const statusText = isRecruiting ? "ACTIVE" : "ARCHIVED";
                                    const badgeClass = isRecruiting ? "badge-recruiting" : "badge-closed";
                                    const avatarInitial = project.ownerName?.charAt(0).toUpperCase() || 'U';

                                    return (
                                        <div key={project.id} className="sketch-card recruitment-card bg-surface-container-lowest border border-thin shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-300">
                                            {/* Header */}
                                            <div className="rc-header">
                                                <div className="rc-user-info cursor-pointer" onClick={() => window.open(`/profile/${project.ownerId}`, '_blank')}>
                                                    <div className="rc-avatar border border-outline-variant shadow-sm">{avatarInitial}</div>
                                                    <div className="rc-user-meta">
                                                        <div className="rc-creator-name font-bold">{project.ownerName}</div>
                                                        <div className="flex gap-2 text-xs font-bold text-on-surface-variant flex-wrap">
                                                            <span>{project.role || 'Project Lead'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`rc-status-badge ${badgeClass} text-[10px]`}>{statusText}</div>
                                            </div>

                                            {/* Body */}
                                            <div className="rc-body mt-3">
                                                <h3 className="rc-title font-heading text-on-surface cursor-pointer hover:text-primary transition-colors" onClick={() => navigate(`/projects/${project.id}`)}>
                                                    {project.title}
                                                </h3>
                                                <p className="rc-desc line-clamp-3 text-on-surface-variant text-sm mt-1">
                                                    {project.description}
                                                </p>
                                            </div>

                                            {/* Tags */}
                                            <div className="rc-tags mt-4 flex flex-wrap gap-2">
                                                {(project.tags || []).slice(0, 4).map(tag => (
                                                    <span key={tag} className="px-2 py-1 bg-surface-container-low border border-outline-variant text-[10px] uppercase tracking-wider font-bold rounded-md text-on-surface hover:bg-surface transition-colors cursor-default">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags?.length > 4 && (
                                                    <span className="px-2 py-1 bg-surface-container-low border border-outline-variant text-[10px] font-bold rounded-md text-on-surface-variant">
                                                        +{project.tags.length - 4}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action Row */}
                                            <div className="rc-actions mt-5 flex justify-between items-center border-t border-thin pt-4">
                                                <button 
                                                    className="px-5 py-2.5 rounded-pill bg-primary text-on-primary font-bold text-sm tracking-wide hover:-translate-y-[1px] shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                                                    onClick={() => navigate(`/projects/${project.id}`)}
                                                >
                                                    Continue Building
                                                </button>
                                                <span className="text-xs font-bold text-on-surface-variant cursor-pointer hover:text-on-surface transition-colors" onClick={() => navigate(`/projects/${project.id}`)}>
                                                    Open Dashboard &rarr;
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                </main>

                {/* Right Column: Top Builders & Trending Tech */}
                <aside className="home-right-col">
                    <TopBuildersPanel />
                    <TrendingTechPanel />
                </aside>

            </div>
        </div>
    );
}