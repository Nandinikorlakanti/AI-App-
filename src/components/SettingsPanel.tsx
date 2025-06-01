
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { X, Download, Trash2, Settings } from 'lucide-react';
import { useState } from 'react';

interface SettingsPanelProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  modelStatus: string;
  setModelStatus: (status: string) => void;
}

const SettingsPanel = ({ isOpen, setIsOpen, modelStatus, setModelStatus }: SettingsPanelProps) => {
  const [selectedModel, setSelectedModel] = useState('llama2-7b');
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState('2048');
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful AI assistant.');
  const [autoSave, setAutoSave] = useState(true);
  const [autoLogging, setAutoLogging] = useState(true);

  const models = [
    { id: 'llama2-7b', name: 'Llama 2 7B', status: 'available' },
    { id: 'llama2-13b', name: 'Llama 2 13B', status: 'available' },
    { id: 'codellama-7b', name: 'CodeLlama 7B', status: 'downloading' },
    { id: 'mistral-7b', name: 'Mistral 7B', status: 'unavailable' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Settings Panel */}
      <div className={`
        fixed lg:relative lg:translate-x-0 z-50 lg:z-auto
        w-80 h-full bg-white/90 backdrop-blur-md border-l border-gray-200
        transition-transform duration-300 ease-in-out right-0
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="lg:hidden">
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <ScrollArea className="h-full p-4">
          <div className="space-y-6">
            {/* Model Configuration */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Model Configuration</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Active Model
                  </label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem 
                          key={model.id} 
                          value={model.id}
                          disabled={model.status === 'unavailable'}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{model.name}</span>
                            <span className={`
                              text-xs px-2 py-1 rounded-full ml-2
                              ${model.status === 'available' ? 'bg-green-100 text-green-700' :
                                model.status === 'downloading' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'}
                            `}>
                              {model.status}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Temperature: {temperature[0]}
                  </label>
                  <Slider
                    value={temperature}
                    onValueChange={setTemperature}
                    max={2}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>More focused</span>
                    <span>More creative</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Max Tokens
                  </label>
                  <Input
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(e.target.value)}
                    type="number"
                    min="1"
                    max="4096"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    System Prompt
                  </label>
                  <Textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="min-h-[80px]"
                    placeholder="Define the AI's behavior and personality..."
                  />
                </div>
              </div>
            </div>

            {/* Output Settings */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Output Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Auto-save responses</label>
                    <p className="text-xs text-gray-500">Automatically save AI responses</p>
                  </div>
                  <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Enable logging</label>
                    <p className="text-xs text-gray-500">Log all interactions</p>
                  </div>
                  <Switch checked={autoLogging} onCheckedChange={setAutoLogging} />
                </div>

                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Chat History
                  </Button>
                  
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Settings
                  </Button>
                </div>
              </div>
            </div>

            {/* Logging Controls */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Logging & Data</h3>
              
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-1">Log Statistics</div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Total conversations: 42</div>
                    <div>Total tokens used: 125,430</div>
                    <div>Storage used: 2.3 MB</div>
                  </div>
                </div>

                <Button variant="destructive" size="sm" className="w-full justify-start">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Logs
                </Button>
              </div>
            </div>

            {/* Connection Status */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Connection Status</h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Model Status</span>
                    <div className={`
                      w-2 h-2 rounded-full
                      ${modelStatus === 'connected' ? 'bg-green-500' :
                        modelStatus === 'connecting' ? 'bg-yellow-500' :
                        'bg-red-500'}
                    `} />
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Model: {selectedModel}</div>
                    <div>Response time: 1.2s avg</div>
                    <div>Memory usage: 4.2 GB</div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setModelStatus('connecting');
                    setTimeout(() => setModelStatus('connected'), 2000);
                  }}
                >
                  Reconnect Model
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default SettingsPanel;
