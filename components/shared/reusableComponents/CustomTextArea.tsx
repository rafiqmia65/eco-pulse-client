import { Textarea as ShadTextarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const CustomTextarea = ({ className, ...props }: Props) => {
  return (
    <ShadTextarea
      className={cn("focus-visible:ring-primary/50", className)}
      {...props}
    />
  );
};

export default CustomTextarea;
