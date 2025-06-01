
import { Settings, Menu, X, Cpu, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  modelStatus: string;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isToolSidebarOpen: boolean;
  setIsToolSidebarOpen: (open: boolean) => void;
}

const Header = ({ 
  modelStatus, 
  isSettingsOpen, 
  setIsSettingsOpen, 
  isToolSidebarOpen, 
  setIsToolSidebarOpen 
}: HeaderProps) => {
  const getStatusColor = () => {
    switch (modelStatus) {
      case 'connected': return 'bg-green-500';
      case 'connecting': return 'bg-yellow-500 animate-pulse';
      case 'disconnected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (modelStatus) {
      case 'connected': return <Wifi className="w-4 h-4" />;
      case 'connecting': return <Cpu className="w-4 h-4 animate-spin" />;
      case 'disconnected': return <WifiOff className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsToolSidebarOpen(!isToolSidebarOpen)}
          className="lg:hidden"
        >
          {isToolSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Local AI Assistant
            </h1>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Model Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full">
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
          <div className="text-gray-600">
            {getStatusIcon()}
          </div>
          <span className="text-sm font-medium text-gray-700 capitalize hidden sm:inline">
            {modelStatus}
          </span>
        </div>

        {/* Settings Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`transition-colors ${isSettingsOpen ? 'bg-purple-100 text-purple-700' : ''}`}
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
