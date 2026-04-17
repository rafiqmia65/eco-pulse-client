import React from "react";
import { Label } from "@/components/ui/label";
import CustomInput from "./CustomInput";

interface Props {
  label: string;
  placeholder?: string;
  name?: string;
}

const CustomFormField: React.FC<Props> = ({ label, placeholder, name }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <CustomInput id={name} placeholder={placeholder} />
    </div>
  );
};

export default CustomFormField;
