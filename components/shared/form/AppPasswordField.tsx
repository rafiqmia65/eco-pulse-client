/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AppField from "./AppField";

const AppPasswordField = (props: any) => {
  const [show, setShow] = useState(false);

  return (
    <AppField
      {...props}
      type={show ? "text" : "password"}
      append={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="text-muted-foreground hover:text-foreground"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
};

export default AppPasswordField;
