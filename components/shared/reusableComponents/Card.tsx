import { Card as ShadCard, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const CustomCard = ({ children, className }: Props) => {
  return (
    <ShadCard className={cn("border-border shadow-custom", className)}>
      <CardContent className="p-5">{children}</CardContent>
    </ShadCard>
  );
};

export default CustomCard;
