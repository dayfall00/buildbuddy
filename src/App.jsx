import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import './styles/global.css';

// Layout & Routing
import PrivateRoute from './components/layout/PrivateRoute';
import HomeRouter from './pages/HomeRouter';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject';
import ProjectDetails from './pages/ProjectDetails';
import Profile from './pages/Profile';
import CreateProfile from './pages/CreateProfile';
import Explore from './pages/Explore';
import MyProjects from './pages/MyProjects';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomeRouter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/projects/new" element={
              <PrivateRoute>
                <CreateProject />
              </PrivateRoute>
            } />
            <Route path="/projects/:id" element={
              <PrivateRoute>
                <ProjectDetails />
              </PrivateRoute>
            } />
            <Route path="/profile/:uid" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/create-profile" element={
              <PrivateRoute>
                <CreateProfile />
              </PrivateRoute>
            } />
            <Route path="/explore" element={
              <PrivateRoute>
                <Explore />
              </PrivateRoute>
            } />
            <Route path="/my-projects" element={
              <PrivateRoute>
                <MyProjects />
              </PrivateRoute>
            } />
            <Route path="/messages" element={
              <PrivateRoute>
                <Messages />
              </PrivateRoute>
            } />
            <Route path="/notifications" element={
              <PrivateRoute>
                <Notifications />
              </PrivateRoute>
            } />
            <Route path="/settings" element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
