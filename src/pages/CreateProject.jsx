import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/layout/AppNavbar';
import { useAuth } from '../contexts/AuthContext';
import { createProject } from '../services/projectService';
import './CreateProject.css';

const CreateProject = () => {
    const { currentUser, userProfile } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        description: '',
        teamSize: '4',
        openRoles: '',
        requiredSkills: '',
        techStack: '',
        tags: '',
        category: 'web',
        difficultyLevel: 'beginner',
        githubRepo: '',
        liveDemo: '',
        documentation: '',
        figma: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.shortDescription || !formData.description) {
            return setError('Title, short description, and detailed description are required.');
        }

        try {
            setLoading(true);
            setError('');

            const splitAndFormat = (str) => str.split(',').map(s => s.trim().toLowerCase()).filter(s => s !== '');

            const newProjectId = await createProject({
                ...formData,
                openRoles: formData.openRoles.split(',').map(s => s.trim()).filter(s => s !== ''), // Keep case for roles
                requiredSkills: splitAndFormat(formData.requiredSkills),
                techStack: splitAndFormat(formData.techStack),
                tags: splitAndFormat(formData.tags),
                ownerId: currentUser.uid,
                ownerName: currentUser.displayName || 'Anonymous Buddy',
                ownerPhoto: userProfile?.photoURL || currentUser?.photoURL || ''
            });

            // Redirect to the dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Failed to create the project. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-page">
            <AppNavbar />

            <main className="create-main container pb-5">
                <div className="sketch-card form-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 className="mb-4 text-2xl">Start a new <span className="handwriting highlight">Project</span></h2>

                    {error && <div className="sketch-card error-card mb-4">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form create-form">

                        {/* Section 1: Basic Info */}
                        <div className="form-section mb-4 pb-4 border-b border-dashed">
                            <h3 className="handwriting text-accent mb-3">// 1. Basic Information</h3>

                            <div className="form-group">
                                <label>Project Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="sketch-input"
                                    placeholder="e.g. Dorm-Link: Peer-to-Peer Wi-Fi"
                                    maxLength={60}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Short Description (Elevator Pitch) *</label>
                                <input
                                    type="text"
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleChange}
                                    className="sketch-input"
                                    placeholder="One sentence describing what it does."
                                    maxLength={120}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Detailed Description *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="sketch-input sketch-textarea"
                                    placeholder="What exactly are you building? Explain the problem, the goals, and why people should join."
                                    rows={5}
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Section 2: Team & Roles */}
                        <div className="form-section mb-4 pb-4 border-b border-dashed">
                            <h3 className="handwriting text-accent mb-3">// 2. Team Structure</h3>

                            <div className="form-row">
                                <div className="form-group half-width">
                                    <label>Total Team Size</label>
                                    <input
                                        type="number"
                                        name="teamSize"
                                        value={formData.teamSize}
                                        onChange={handleChange}
                                        className="sketch-input"
                                        min="2"
                                        max="20"
                                    />
                                </div>
                                <div className="form-group half-width">
                                    <label>Open Roles (comma separated)</label>
                                    <input
                                        type="text"
                                        name="openRoles"
                                        value={formData.openRoles}
                                        onChange={handleChange}
                                        className="sketch-input"
                                        placeholder="Backend Dev, UI/UX Designer"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Skills & Domain */}
                        <div className="form-section mb-4 pb-4 border-b border-dashed">
                            <h3 className="handwriting text-accent mb-3">// 3. Skills & Domain</h3>

                            <div className="form-row mb-3">
                                <div className="form-group half-width">
                                    <label>Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="sketch-input"
                                    >
                                        <option value="web">Web Development</option>
                                        <option value="mobile">Mobile App</option>
                                        <option value="ai">AI / Machine Learning</option>
                                        <option value="robotics">Robotics</option>
                                        <option value="iot">Internet of Things</option>
                                        <option value="game">Game Development</option>
                                    </select>
                                </div>
                                <div className="form-group half-width">
                                    <label>Difficulty Level</label>
                                    <select
                                        name="difficultyLevel"
                                        value={formData.difficultyLevel}
                                        onChange={handleChange}
                                        className="sketch-input"
                                    >
                                        <option value="beginner">Beginner Friendly</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Required Skills (comma separated)</label>
                                <input
                                    type="text"
                                    name="requiredSkills"
                                    value={formData.requiredSkills}
                                    onChange={handleChange}
                                    className="sketch-input"
                                    placeholder="Python, React, Figma"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group half-width">
                                    <label>Tech Stack</label>
                                    <input
                                        type="text"
                                        name="techStack"
                                        value={formData.techStack}
                                        onChange={handleChange}
                                        className="sketch-input"
                                        placeholder="Next.js, Firebase, Stripe"
                                    />
                                </div>
                                <div className="form-group half-width">
                                    <label>Discovery Tags</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        className="sketch-input"
                                        placeholder="Web3, Social Good, EdTech"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 4: External Links */}
                        <div className="form-section mb-4 pb-4">
                            <h3 className="handwriting text-accent mb-3">// 4. Resources (Optional)</h3>

                            <div className="form-row mb-3">
                                <div className="form-group half-width">
                                    <label>GitHub Repository</label>
                                    <input
                                        type="url"
                                        name="githubRepo"
                                        value={formData.githubRepo}
                                        onChange={handleChange}
                                        className="sketch-input"
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                                <div className="form-group half-width">
                                    <label>Live Demo</label>
                                    <input
                                        type="url"
                                        name="liveDemo"
                                        value={formData.liveDemo}
                                        onChange={handleChange}
                                        className="sketch-input"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group half-width">
                                    <label>Documentation</label>
                                    <input
                                        type="url"
                                        name="documentation"
                                        value={formData.documentation}
                                        onChange={handleChange}
                                        className="sketch-input"
                                        placeholder="Notion, ReadMe..."
                                    />
                                </div>
                                <div className="form-group half-width">
                                    <label>Figma / Design File</label>
                                    <input
                                        type="url"
                                        name="figma"
                                        value={formData.figma}
                                        onChange={handleChange}
                                        className="sketch-input"
                                        placeholder="https://figma.com/..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-actions mt-4 pt-4 border-t border-dashed">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate('/dashboard')}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary"
                            >
                                {loading ? 'Publishing...' : 'Launch Project 🚀'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CreateProject;
