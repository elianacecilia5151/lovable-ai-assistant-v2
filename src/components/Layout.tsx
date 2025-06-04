
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  BarChart3, 
  History, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  userType: 'operador' | 'compliance';
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

const Layout = ({ children, userType, currentView, onViewChange, onLogout }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const operatorMenuItems = [
    { id: 'chat', label: 'Chat IA', icon: MessageSquare },
    { id: 'history', label: 'Histórico', icon: History },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const complianceMenuItems = [
    { id: 'chat', label: 'Chat IA', icon: MessageSquare },
    { id: 'compliance', label: 'Compliance', icon: BarChart3 },
    { id: 'history', label: 'Histórico', icon: History },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const menuItems = userType === 'compliance' ? complianceMenuItems : operatorMenuItems;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <div className="flex items-center space-x-3">
                  <img 
                    src="/lovable-uploads/72fa2729-2d0c-4507-9ade-518c825abcec.png" 
                    alt="GSK IA" 
                    className="w-8 h-8"
                  />
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">GSK CASA V2</h2>
                    <Badge variant="outline" className="text-xs mt-1">
                      {userType === 'compliance' ? 'Compliance' : 'Operador'}
                    </Badge>
                  </div>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2"
              >
                {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <li key={item.id}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        !sidebarOpen ? 'px-2' : 'px-3'
                      } ${
                        isActive 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => onViewChange(item.id)}
                    >
                      <Icon className={`w-4 h-4 ${sidebarOpen ? 'mr-3' : ''}`} />
                      {sidebarOpen && item.label}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              onClick={onLogout}
              className={`w-full justify-start text-gray-700 hover:bg-gray-100 ${
                !sidebarOpen ? 'px-2' : 'px-3'
              }`}
            >
              <LogOut className={`w-4 h-4 ${sidebarOpen ? 'mr-3' : ''}`} />
              {sidebarOpen && 'Sair'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Layout;
