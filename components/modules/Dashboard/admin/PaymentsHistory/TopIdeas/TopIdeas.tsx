import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ITopIdeaDetails } from "@/types/adminTypes/adminPayments.types";
import { Trophy } from "lucide-react";

interface TopIdeasProps {
  ideas: ITopIdeaDetails[];
}

const TopIdeas: React.FC<TopIdeasProps> = ({ ideas }) => {
  return (
    <Card className="border-none shadow-sm bg-background/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Top Selling Ideas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ideas.map((idea, index) => (
            <div
              key={idea.ideaId}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
                    {idea.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {idea.purchases} sales
                  </p>
                </div>
              </div>
              <div className="text-xs font-semibold px-2 py-1 bg-muted rounded-md">
                Popular
              </div>
            </div>
          ))}
          {ideas.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No sales data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopIdeas;
