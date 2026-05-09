"use client";

import CustomButton from "../reusableComponents/CustomButton";
import { LogOut } from "lucide-react";
import { logoutAction } from "./logoutActions";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";

const LogOutButton = ({ className }: { className?: string }) => {
  const logout = useAppStore((state) => state.logout);

  return (
    <form action={logoutAction} className="w-full" onSubmit={() => logout()}>
      <CustomButton
        type="submit"
        variant="ghost"
        className={cn("flex items-center gap-2", className)}
      >
        <LogOut size={16} /> Logout
      </CustomButton>
    </form>
  );
};

export default LogOutButton;
