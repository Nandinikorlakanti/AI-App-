
import { useState } from 'react';
import Header from '@/components/Header';
import ToolSidebar from '@/components/ToolSidebar';
import ChatInterface from '@/components/ChatInterface';
import SettingsPanel from '@/components/SettingsPanel';

const Index = () => {
  const [selectedTool, setSelectedTool] = useState('writer');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isToolSidebarOpen, setIsToolSidebarOpen] = useState(true);
  const [modelStatus, setModelStatus] = useState('connected');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Header 
        modelStatus={modelStatus}
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
        isToolSidebarOpen={isToolSidebarOpen}
        setIsToolSidebarOpen={setIsToolSidebarOpen}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Tool Selection Sidebar */}
        <ToolSidebar 
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          isOpen={isToolSidebarOpen}
          setIsOpen={setIsToolSidebarOpen}
        />
        
        {/* Main Chat Interface */}
        <ChatInterface 
          selectedTool={selectedTool}
          isToolSidebarOpen={isToolSidebarOpen}
          isSettingsOpen={isSettingsOpen}
        />
        
        {/* Settings Panel */}
        <SettingsPanel 
          isOpen={isSettingsOpen}
          setIsOpen={setIsSettingsOpen}
          modelStatus={modelStatus}
          setModelStatus={setModelStatus}
        />
      </div>
    </div>
  );
};

export default Index;
