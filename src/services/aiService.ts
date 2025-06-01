
export interface GenerateRequest {
  prompt: string;
  temperature?: number;
}

export interface GenerateResponse {
  output?: string;
  error?: string;
}

export class AIService {
  private baseUrl: string;

  constructor(baseUrl = 'http://localhost:8000') {
    this.baseUrl = baseUrl;
  }

  async generate(request: GenerateRequest): Promise<GenerateResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: request.prompt,
          temperature: request.temperature || 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/docs`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const aiService = new AIService();
