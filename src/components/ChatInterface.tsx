import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Copy, RotateCcw, Save, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import MessageBubble from '@/components/MessageBubble';
import ToolControls from '@/components/ToolControls';
import { aiService } from '@/services/aiService';

interface ChatInterfaceProps {
  selectedTool: string;
  isToolSidebarOpen: boolean;
  isSettingsOpen: boolean;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tool: string;
}

const ChatInterface = ({ selectedTool, isToolSidebarOpen, isSettingsOpen }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Test backend connection on mount
  useEffect(() => {
    const testConnection = async () => {
      const connected = await aiService.testConnection();
      setIsConnected(connected);
      if (!connected) {
        toast({
          title: "Backend not connected",
          description: "Make sure your FastAPI backend is running on localhost:8000",
          variant: "destructive"
        });
      }
    };
    
    testConnection();
  }, []);

  const getPlaceholder = () => {
    switch (selectedTool) {
      case 'writer': return 'Describe what you want to write about...';
      case 'rephraser': return 'Paste the text you want to rephrase...';
      case 'explainer': return 'What concept would you like explained?';
      case 'search': return 'Ask a question about your documents...';
      default: return 'Type your message...';
    }
  };

  const getToolTitle = () => {
    switch (selectedTool) {
      case 'writer': return 'AI Writer';
      case 'rephraser': return 'Rephraser';
      case 'explainer': return 'Explainer';
      case 'search': return 'Custom Search';
      default: return 'AI Assistant';
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!isConnected) {
      toast({
        title: "No backend connection",
        description: "Please start your FastAPI backend first",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
      tool: selectedTool
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiService.generate({
        prompt: userMessage.content,
        temperature: temperature
      });

      if (response.error) {
        throw new Error(response.error);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.output || 'No response received',
        timestamp: new Date(),
        tool: selectedTool
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      toast({
        title: "Response generated",
        description: "AI response has been logged to chat_log.txt"
      });
    } catch (error) {
      console.error('Error generating response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to generate response'}`,
        timestamp: new Date(),
        tool: selectedTool
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Generation failed",
        description: "Check console for details",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast({
      title: "Chat cleared",
      description: "All messages have been removed."
    });
  };

  return (
    <div className={`
      flex-1 flex flex-col bg-white/50 transition-all duration-300
      ${isToolSidebarOpen ? 'lg:ml-0' : ''}
      ${isSettingsOpen ? 'lg:mr-0' : ''}
    `}>
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {getToolTitle()}
            </h2>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              {isConnected ? 'Backend connected' : 'Backend disconnected'}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">
              Temp: {temperature}
            </div>
            <Button variant="ghost" size="sm" onClick={clearChat}>
              <RotateCcw className="w-4 h-4" />
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* Tool-specific Controls */}
      <ToolControls selectedTool={selectedTool} />

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Start a conversation
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Use the {getToolTitle()} with your local Ollama model. 
                {!isConnected && (
                  <span className="block mt-2 text-red-600 font-medium">
                    ⚠️ Backend not connected - start your FastAPI server first
                  </span>
                )}
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}
          
          {isLoading && (
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Ollama is generating response...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={getPlaceholder()}
                className="min-h-[60px] max-h-32 resize-none pr-12 focus:ring-2 focus:ring-purple-500"
                disabled={isLoading || !isConnected}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {input.length}/2000
              </div>
            </div>
            
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || !isConnected}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Press Ctrl+Enter to send</span>
            <span>{isConnected ? 'Ollama Ready' : 'Backend Disconnected'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
