import { Loader2, X, Check } from "lucide-react";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";

interface CommentEditFormProps {
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  isPending: boolean;
  rows?: number;
  size?: "sm" | "default";
}

export default function CommentEditForm({
  value,
  onChange,
  onCancel,
  onSave,
  isPending,
  rows = 3,
  size = "default",
}: CommentEditFormProps) {
  const isSmall = size === "sm";

  return (
    <div className={`${isSmall ? 'mt-2' : 'mt-3'} space-y-2 w-full`}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        autoFocus
      />
      <div className="flex items-center gap-2 justify-end">
        <CustomButton
          variant="outline"
          onClick={onCancel}
          className={`${isSmall ? 'h-7 text-[10px] px-2' : 'h-8 text-xs px-3'}`}
        >
          <X size={isSmall ? 10 : 12} className="mr-1" /> Cancel
        </CustomButton>
        <CustomButton
          onClick={onSave}
          disabled={!value.trim() || isPending}
          className={`${isSmall ? 'h-7 text-[10px] px-2' : 'h-8 text-xs px-3'}`}
        >
          {isPending ? (
            <Loader2 className="animate-spin mr-1" size={isSmall ? 10 : 12} />
          ) : (
            <Check size={isSmall ? 10 : 12} className="mr-1" />
          )}
          Save
        </CustomButton>
      </div>
    </div>
  );
}
