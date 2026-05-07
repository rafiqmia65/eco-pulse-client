import CustomButton from "../reusableComponents/CustomButton";
import { LogOut } from "lucide-react";
import { logoutAction } from "./logoutActions";
import { cn } from "@/lib/utils";

const LogOutButton = ({ className }: { className?: string }) => {
  return (
    <form action={logoutAction} className="w-full">
      <CustomButton
        variant="ghost"
        className={cn("flex items-center gap-2", className)}
      >
        <LogOut size={16} /> Logout
      </CustomButton>
    </form>
  );
};

export default LogOutButton;
