
import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, DownloadCloud, ExternalLink, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocalTracking } from '@/hooks/useLocalTracking';
import { pipeline } from '@huggingface/transformers';
import { Link } from 'react-router-dom';

type LlmStatus = 'not-installed' | 'installing' | 'ready' | 'loading' | 'error';
type LlmModel = 'microsoft/DialoGPT-small' | 'distilbert/distilbert-base-uncased' | 'microsoft/phi-2';

export function LocalLLM() {
  const [status, setStatus] = useState<LlmStatus>('not-installed');
  const [selectedModel, setSelectedModel] = useState<LlmModel>('microsoft/DialoGPT-small');
  const [modelSize, setModelSize] = useState('800MB');
  const [progressPercent, setProgressPercent] = useState(0);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const { activities } = useLocalTracking();
  const { toast } = useToast();

  const generateRecommendations = async () => {
    try {
      setStatus('loading');
      
      // Display toast to inform user that generation has started
      toast({
        title: "Generating Recommendations",
        description: "Local LLM is analyzing your activity data",
      });
      
      // Use a small, browser-friendly model for text generation
      const generator = await pipeline(
        'text-generation', 
        selectedModel,
        { device: 'webgpu' }
      );

      // Generate recommendations based on activities
      const activityPrompt = activities.map(a => 
        `I spent ${a.duration} seconds on ${a.application} working on ${a.title}`
      ).join('. ');

      const generatedText = await generator(
        `Given these activities: ${activityPrompt}. Provide 3 productivity recommendations.`, 
        { max_new_tokens: 100 }
      );

      // Handle different response formats from the transformer model
      let extractedText = '';
      if (Array.isArray(generatedText)) {
        // Access the generated text safely with optional chaining
        const firstResult = generatedText[0];
        if (typeof firstResult === 'object' && firstResult !== null) {
          extractedText = 
            // Try different possible property names based on model output format
            (firstResult as any).generated_text || 
            (firstResult as any).text || 
            '';
        }
      } else if (typeof generatedText === 'object' && generatedText !== null) {
        extractedText = (generatedText as any).text || '';
      }

      const extractedRecommendations = extractedText
        .split('.')
        .filter(rec => rec.trim().length > 10)
        .slice(0, 3);

      setRecommendations(extractedRecommendations);
      setStatus('ready');
      
      toast({
        title: "Recommendations Ready",
        description: "Your activity data has been analyzed",
      });
    } catch (error) {
      console.error('LLM generation error:', error);
      setStatus('error');
      toast({
        title: "LLM Error",
        description: "Could not generate recommendations. Try reinstalling the model.",
        variant: "destructive"
      });
    }
  };

  // Simulate LLM download/installation process
  const handleInstallModel = () => {
    setStatus('installing');
    setProgressPercent(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgressPercent(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10);
        if (newProgress >= 100) {
          clearInterval(interval);
          setStatus('ready');
          generateRecommendations();
          toast({
            title: "Model installed successfully",
            description: `${selectedModel} is now ready to provide insights`,
          });
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  // Handle model selection
  const handleSelectModel = (model: LlmModel) => {
    setSelectedModel(model);
    
    // Set model size based on selection
    switch(model) {
      case 'microsoft/DialoGPT-small':
        setModelSize('800MB');
        break;
      case 'distilbert/distilbert-base-uncased':
        setModelSize('1.2GB');
        break;
      case 'microsoft/phi-2':
        setModelSize('2.4GB');
        break;
    }
    
    // If model is already installed, reset to not installed
    if (status === 'ready' || status === 'error') {
      setStatus('not-installed');
      setRecommendations([]);
    }
  };

  // Handle the connect to Supabase action
  const handleConnectSupabase = () => {
    toast({
      title: "Supabase Connection",
      description: "To connect to Supabase, click the green Supabase button in the top right of the interface.",
    });
  };

  // Handle refresh recommendations
  const handleRefreshRecommendations = () => {
    if (status === 'ready') {
      generateRecommendations();
    }
  };

  useEffect(() => {
    if (status === 'ready' && activities.length > 0) {
      generateRecommendations();
    }
  }, [status, activities]);

  // Determine status message and action button
  const getStatusInfo = () => {
    switch (status) {
      case 'not-installed':
        return {
          title: "Local LLM Not Installed",
          description: "Install a lightweight model to analyze your activity data privately on your device.",
          action: (
            <div className="space-y-4 w-full">
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  size="sm" 
                  variant={selectedModel === 'microsoft/DialoGPT-small' ? 'default' : 'outline'} 
                  onClick={() => handleSelectModel('microsoft/DialoGPT-small')}
                  className="w-full"
                >
                  Small
                </Button>
                <Button 
                  size="sm" 
                  variant={selectedModel === 'distilbert/distilbert-base-uncased' ? 'default' : 'outline'} 
                  onClick={() => handleSelectModel('distilbert/distilbert-base-uncased')}
                  className="w-full"
                >
                  Medium
                </Button>
                <Button 
                  size="sm" 
                  variant={selectedModel === 'microsoft/phi-2' ? 'default' : 'outline'} 
                  onClick={() => handleSelectModel('microsoft/phi-2')}
                  className="w-full"
                >
                  Large
                </Button>
              </div>
              <Button onClick={handleInstallModel} className="w-full gap-2">
                <DownloadCloud className="h-4 w-4" /> Install Model ({modelSize})
              </Button>
            </div>
          )
        };
      case 'installing':
        return {
          title: "Installing Local LLM",
          description: `Downloading and setting up ${selectedModel}...`,
          action: (
            <div className="w-full space-y-2">
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground text-right">{progressPercent}% complete</div>
            </div>
          )
        };
      case 'ready':
        return {
          title: "Local LLM Ready",
          description: "Your data is being analyzed privately on your device.",
          action: (
            <div className="w-full">
              <div className="text-sm text-muted-foreground mb-2">Model is actively analyzing your activity data</div>
              <Button variant="outline" size="sm" onClick={handleRefreshRecommendations} className="w-full gap-2">
                <Activity className="h-4 w-4" /> Refresh Recommendations
              </Button>
            </div>
          )
        };
      case 'loading':
        return {
          title: "LLM Processing",
          description: "Analyzing your data...",
          action: <div className="animate-pulse text-sm text-muted-foreground">Processing data...</div>
        };
      case 'error':
        return {
          title: "LLM Error",
          description: "There was an error with the local model.",
          action: <Button variant="destructive" onClick={handleInstallModel}>Reinstall Model</Button>
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Local AI Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center gap-2 my-4">
          <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
            status === 'ready' ? 'bg-green-100 text-green-700' : 
            status === 'error' ? 'bg-red-100 text-red-700' : 
            'bg-primary/10 text-primary'
          }`}>
            <Brain className="h-8 w-8" />
          </div>
          <h3 className="font-medium mt-2">{statusInfo.title}</h3>
          <p className="text-sm text-muted-foreground">{statusInfo.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        <div className="w-full">{statusInfo.action}</div>
        {recommendations.length > 0 && (
          <div className="mt-4 w-full">
            <h4 className="text-sm font-medium mb-2">AI Recommendations:</h4>
            <ul className="space-y-2">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="text-xs text-muted-foreground">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Supabase connection section */}
        <div className="w-full mt-4 pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Enhance with Supabase</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Connect to Supabase to unlock cloud storage and advanced AI features.
          </p>
          <Button 
            variant="outline" 
            className="w-full gap-2"
            onClick={handleConnectSupabase}
          >
            <ExternalLink className="h-4 w-4" />
            Connect to Supabase
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
