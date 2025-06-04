
import React, { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import Layout from '@/components/Layout';
import ChatInterface from '@/components/ChatInterface';
import CompliancePanel from '@/components/CompliancePanel';
import OperatorHistory from '@/components/OperatorHistory';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'operador' | 'compliance'>('operador');
  const [currentView, setCurrentView] = useState('chat');

  const handleLogin = (type: 'operador' | 'compliance') => {
    setUserType(type);
    setIsLoggedIn(true);
    setCurrentView('chat');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('operador');
    setCurrentView('chat');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'chat':
        return <ChatInterface userType={userType} />;
      case 'compliance':
        return <CompliancePanel />;
      case 'history':
        return <OperatorHistory />;
      case 'settings':
        return (
          <div className="p-6 bg-gray-50 h-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Configurações</h1>
            <p className="text-gray-600">Painel de configurações em desenvolvimento.</p>
          </div>
        );
      default:
        return <ChatInterface userType={userType} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Layout
      userType={userType}
      currentView={currentView}
      onViewChange={setCurrentView}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default Index;
