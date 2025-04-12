
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface RecommendationPanelProps {
  recommendations: string[];
  isLoading?: boolean;
}

export function RecommendationPanel({ recommendations, isLoading = false }: RecommendationPanelProps) {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Optimization Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="min-h-[220px] flex items-center justify-center">
            <div className="animate-pulse-subtle text-muted-foreground">Analyzing your activity data...</div>
          </div>
        ) : (
          <ul className="space-y-3 min-h-[220px]">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3 animate-in" style={{ animationDelay: `${index * 100}ms` }}>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                  {index + 1}
                </span>
                <span className="text-sm">{recommendation}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
