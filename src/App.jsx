import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoogleLogin from './pages/GoogleLogin';
import ChatPage from './pages/ChatPage';
import AuthCallback from './pages/AuthCallback';
import NotFound from './pages/NotFound';
import UsersList from './pages/UsersList';
import ProtectedRoute from './components/ProtectedRoute';
import TestOpenAIPage from './pages/TestOpenAIPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleLogin />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route path="/users" element={<UsersList />} />
        <Route path="/test-openai" element={<TestOpenAIPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;