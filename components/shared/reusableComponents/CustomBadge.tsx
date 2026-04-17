import { Badge as ShadBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const CustomBadge = ({ children, className }: Props) => {
  return (
    <ShadBadge className={cn("bg-muted text-muted-foreground", className)}>
      {children}
    </ShadBadge>
  );
};

export default CustomBadge;
