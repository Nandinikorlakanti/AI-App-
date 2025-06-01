
import { Button } from '@/components/ui/button';
import { Copy, Save, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tool: string;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    toast({
      title: "Copied to clipboard",
      description: "Message content has been copied."
    });
  };

  const saveMessage = () => {
    toast({
      title: "Message saved",
      description: "Message has been saved to your logs."
    });
  };

  const regenerateResponse = () => {
    toast({
      title: "Regenerating response",
      description: "Creating a new response..."
    });
  };

  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`
        max-w-[80%] rounded-2xl p-4 relative group
        ${message.type === 'user' 
          ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white ml-12' 
          : 'bg-white border border-gray-200 mr-12'
        }
      `}>
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </div>
        
        <div className={`
          text-xs mt-2 flex items-center justify-between
          ${message.type === 'user' ? 'text-purple-100' : 'text-gray-500'}
        `}>
          <span>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          
          {message.type === 'assistant' && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-6 w-6 p-0 hover:bg-gray-100"
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={saveMessage}
                className="h-6 w-6 p-0 hover:bg-gray-100"
              >
                <Save className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={regenerateResponse}
                className="h-6 w-6 p-0 hover:bg-gray-100"
              >
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
