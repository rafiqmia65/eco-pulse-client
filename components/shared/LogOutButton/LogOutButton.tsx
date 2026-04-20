import CustomButton from "../reusableComponents/CustomButton";
import { LogOut } from "lucide-react";
import { logoutAction } from "./logoutActions";

const LogOutButton = () => {
  return (
    <form action={logoutAction}>
      <CustomButton variant="ghost" className="flex items-center gap-2">
        <LogOut size={16} /> Logout
      </CustomButton>
    </form>
  );
};

export default LogOutButton;
