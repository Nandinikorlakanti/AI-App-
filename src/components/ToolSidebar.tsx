
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PenTool, RotateCcw, BookOpen, Search, X } from 'lucide-react';

interface ToolSidebarProps {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const tools = [
  {
    id: 'writer',
    title: 'AI Writer',
    description: 'Generate creative content from topics',
    icon: PenTool,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'rephraser',
    title: 'Rephraser',
    description: 'Rewrite text in different styles',
    icon: RotateCcw,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'explainer',
    title: 'Explainer',
    description: 'Explain complex concepts simply',
    icon: BookOpen,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'search',
    title: 'Custom Search',
    description: 'Query local documents with RAG',
    icon: Search,
    gradient: 'from-orange-500 to-red-500'
  }
];

const ToolSidebar = ({ selectedTool, setSelectedTool, isOpen, setIsOpen }: ToolSidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative lg:translate-x-0 z-50 lg:z-auto
        w-80 h-full bg-white/90 backdrop-blur-md border-r border-gray-200
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between lg:hidden">
          <h2 className="text-lg font-semibold text-gray-800">AI Tools</h2>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <ScrollArea className="h-full p-4">
          <div className="space-y-3">
            <div className="hidden lg:block mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">AI Tools</h2>
              <p className="text-sm text-gray-600">Choose your AI assistant</p>
            </div>
            
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isSelected = selectedTool === tool.id;
              
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    setSelectedTool(tool.id);
                    setIsOpen(false); // Close on mobile
                  }}
                  className={`
                    w-full p-4 rounded-xl border-2 transition-all duration-200
                    hover:shadow-lg hover:scale-[1.02] group
                    ${isSelected 
                      ? 'border-purple-300 bg-purple-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`
                      w-10 h-10 rounded-lg bg-gradient-to-br ${tool.gradient}
                      flex items-center justify-center transition-transform
                      ${isSelected ? 'scale-110' : 'group-hover:scale-105'}
                    `}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <h3 className={`
                        font-semibold transition-colors
                        ${isSelected ? 'text-purple-700' : 'text-gray-800'}
                      `}>
                        {tool.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Conversation History Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Conversations</h3>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <button
                  key={i}
                  className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-700 truncate">
                    Conversation {i}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    2 minutes ago
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default ToolSidebar;
