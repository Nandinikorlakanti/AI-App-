
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

interface ToolControlsProps {
  selectedTool: string;
}

const ToolControls = ({ selectedTool }: ToolControlsProps) => {
  const [temperature, setTemperature] = useState([0.7]);
  const [contentType, setContentType] = useState('blog');
  const [tone, setTone] = useState('professional');
  const [complexity, setComplexity] = useState([5]);

  if (selectedTool === 'writer') {
    return (
      <div className="p-4 border-b border-gray-200 bg-gray-50/50">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Type:</span>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blog">Blog Post</SelectItem>
                <SelectItem value="tweet">Tweet</SelectItem>
                <SelectItem value="story">Story</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="article">Article</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Tone:</span>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 min-w-32">
            <span className="text-sm font-medium text-gray-700">Creativity:</span>
            <Slider
              value={temperature}
              onValueChange={setTemperature}
              max={1}
              min={0.1}
              step={0.1}
              className="flex-1"
            />
            <span className="text-xs text-gray-500 w-8">{temperature[0]}</span>
          </div>
        </div>
      </div>
    );
  }

  if (selectedTool === 'rephraser') {
    return (
      <div className="p-4 border-b border-gray-200 bg-gray-50/50">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 mr-2">Style:</span>
          {['CEO', 'Teenager', 'Academic', 'Comedian', 'Poet'].map((style) => (
            <Button
              key={style}
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setTone(style.toLowerCase())}
            >
              {style}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (selectedTool === 'explainer') {
    return (
      <div className="p-4 border-b border-gray-200 bg-gray-50/50">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-sm font-medium text-gray-700">Complexity:</span>
            <Slider
              value={complexity}
              onValueChange={setComplexity}
              max={10}
              min={1}
              step={1}
              className="flex-1 max-w-32"
            />
            <span className="text-xs text-gray-500 w-16">
              {complexity[0] <= 3 ? 'Elementary' : 
               complexity[0] <= 7 ? 'Intermediate' : 'Expert'}
            </span>
          </div>
          
          <div className="flex gap-2">
            {['Science', 'Tech', 'History', 'Math'].map((subject) => (
              <Button
                key={subject}
                variant="outline"
                size="sm"
                className="h-7 text-xs"
              >
                {subject}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedTool === 'search') {
    return (
      <div className="p-4 border-b border-gray-200 bg-gray-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                Documents: <span className="text-purple-600">0 indexed</span>
              </span>
              <Button variant="outline" size="sm">
                Upload Documents
              </Button>
            </div>
            <div className="text-xs text-gray-500">
              Vector DB: Ready
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ToolControls;
