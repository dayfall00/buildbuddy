import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/layout/AppNavbar';
import QuickAccessPanel from '../components/home/QuickAccessPanel';
import YourStackPanel from '../components/home/YourStackPanel';
import TopBuildersPanel from '../components/home/TopBuildersPanel';
import TrendingTechPanel from '../components/home/TrendingTechPanel';
import { useAuth } from '../contexts/AuthContext';
import { getUserProjects, updateProject } from '../services/projectService';
import { Timestamp, serverTimestamp } from 'firebase/firestore';
import '../pages/Home.css';

export default function MyProjects() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('All');
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);

    useEffect(() => {
        const handleClickOutside = () => setOpenMenuId(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

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

    // Robust fallbacks
    const getProjectVisuals = (p) => ({
        status: p.status || 'active',
        isPinned: !!p.isPinned,
        pinnedAt: p.pinnedAt || null,
        updatedAt: p.updatedAt || null
    });

    // Filtering logic for the main feed
    const displayedProjects = allProjects.filter(p => {
        const visuals = getProjectVisuals(p);
        
        if (activeTab === 'All') return visuals.status === 'active';
        if (activeTab === 'Active') return visuals.status === 'active';
        if (activeTab === 'Archived') return visuals.status === 'archived';
        return false; 
    });

    // Filtering & Sorting logic for Pinned Projects
    const pinnedProjects = allProjects
        .filter(p => {
            const visuals = getProjectVisuals(p);
            return visuals.status === 'active' && visuals.isPinned === true;
        })
        .sort((a, b) => {
            const aVis = getProjectVisuals(a);
            const bVis = getProjectVisuals(b);
            
            const aPinnedTime = aVis.pinnedAt?.toMillis ? aVis.pinnedAt.toMillis() : (aVis.pinnedAt?.getTime ? aVis.pinnedAt.getTime() : 0);
            const bPinnedTime = bVis.pinnedAt?.toMillis ? bVis.pinnedAt.toMillis() : (bVis.pinnedAt?.getTime ? bVis.pinnedAt.getTime() : 0);
            
            if (aPinnedTime !== bPinnedTime) return bPinnedTime - aPinnedTime; // Primary: pinnedAt descending
            
            const aUpdatedTime = aVis.updatedAt?.toMillis ? aVis.updatedAt.toMillis() : (aVis.updatedAt?.getTime ? aVis.updatedAt.getTime() : 0);
            const bUpdatedTime = bVis.updatedAt?.toMillis ? bVis.updatedAt.toMillis() : (bVis.updatedAt?.getTime ? bVis.updatedAt.getTime() : 0);
            return bUpdatedTime - aUpdatedTime; // Fallback: updatedAt descending
        });

    const handlePinToggle = async (project, e) => {
        e.stopPropagation();
        setOpenMenuId(null);
        
        const newIsPinned = !project.isPinned;
        // Optimistic update
        setAllProjects(prev => prev.map(p => 
            p.id === project.id 
                ? { ...p, isPinned: newIsPinned, pinnedAt: newIsPinned ? Timestamp.now() : null }
                : p
        ));
        
        try {
            await updateProject(project.id, { 
                isPinned: newIsPinned, 
                pinnedAt: newIsPinned ? serverTimestamp() : null 
            });
        } catch (err) {
            console.error("Failed to toggle pin:", err);
            // In a real app we'd revert or show a toast
        }
    };

    const handleArchiveToggle = async (project, e) => {
        e.stopPropagation();
        setOpenMenuId(null);
        
        const newStatus = project.status === 'archived' ? 'active' : 'archived';
        
        // Optimistic update
        setAllProjects(prev => prev.map(p => 
            p.id === project.id 
                ? { ...p, status: newStatus, isPinned: false, pinnedAt: null }
                : p
        ));
        
        try {
            await updateProject(project.id, { status: newStatus, isPinned: false, pinnedAt: null });
        } catch (err) {
            console.error(`Failed to ${newStatus === 'archived' ? 'archive' : 'unarchive'} project:`, err);
        }
    };

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
                            {activeTab !== 'Archived' && pinnedProjects.length > 0 && (
                                <div className="pinned-section mb-6">
                                    <h3 className="text-sm font-bold tracking-wider text-on-surface-variant uppercase mb-3 px-1">Pinned Projects</h3>
                                    <div className="flex flex-col gap-3">
                                        {pinnedProjects.map(project => (
                                            <div key={`pinned-${project.id}`} 
                                                className="bg-surface border-2 border-primary/30 rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-[2px] transition-all cursor-pointer flex gap-4 items-center relative"
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
                                                <button className="px-4 py-2 mr-8 rounded-full bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-colors shadow-sm whitespace-nowrap">
                                                    Continue Building
                                                </button>

                                                {/* 3-Dot Menu */}
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                    <button 
                                                        className="p-1 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant z-10 text-xl font-bold leading-none"
                                                        onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === project.id ? null : project.id); }}
                                                    >
                                                        ⋮
                                                    </button>
                                                    {openMenuId === project.id && (
                                                        <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-outline-variant shadow-lg rounded-xl overflow-hidden z-[100] flex flex-col py-1">
                                                            <button 
                                                                className="px-4 py-2.5 text-left text-sm font-bold text-on-surface hover:bg-surface-container transition-colors w-full"
                                                                onClick={(e) => handlePinToggle(project, e)}
                                                            >
                                                                Unpin Project
                                                            </button>
                                                            <button 
                                                                className="px-4 py-2.5 text-left text-sm font-bold text-error hover:bg-error-container hover:text-on-error-container transition-colors w-full"
                                                                onClick={(e) => handleArchiveToggle(project, e)}
                                                            >
                                                                Archive Project
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
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
                                        <div key={project.id} className={`sketch-card recruitment-card bg-surface-container-lowest border ${project.isPinned ? 'border-primary/40 ring-2 ring-primary/10' : 'border-thin'} shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-300 relative`}>
                                            
                                            {/* 3-Dot Menu */}
                                            <div className="absolute right-4 top-4">
                                                <button 
                                                    className="p-1 rounded-md hover:bg-surface-container transition-colors text-on-surface-variant z-10 text-xl font-bold leading-none"
                                                    onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === project.id ? null : project.id); }}
                                                >
                                                    ⋮
                                                </button>
                                                {openMenuId === project.id && (
                                                    <div className="absolute right-0 top-full mt-1 w-48 bg-surface border border-outline-variant shadow-lg rounded-xl overflow-hidden z-[100] flex flex-col py-1">
                                                        {project.status !== 'archived' && (
                                                            <button 
                                                                className="px-4 py-2.5 text-left text-sm font-bold text-on-surface hover:bg-surface-container transition-colors w-full"
                                                                onClick={(e) => handlePinToggle(project, e)}
                                                            >
                                                                {project.isPinned ? 'Unpin Project' : 'Pin Project'}
                                                            </button>
                                                        )}
                                                        <button 
                                                            className={`px-4 py-2.5 text-left text-sm font-bold transition-colors w-full ${project.status === 'archived' ? 'text-on-surface hover:bg-surface-container' : 'text-error hover:bg-error-container hover:text-on-error-container'}`}
                                                            onClick={(e) => handleArchiveToggle(project, e)}
                                                        >
                                                            {project.status === 'archived' ? 'Unarchive Project' : 'Archive Project'}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Header */}
                                            <div className="rc-header pr-8">
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