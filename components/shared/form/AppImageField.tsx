/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Upload } from "lucide-react";
import React, { useState } from "react";

import { uploadImage } from "@/lib/upload/uploadImage";

type Props = {
  field: any;
  label: string;
};

const AppImageField = ({ field, label }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setPreview(URL.createObjectURL(file));
      setLoading(true);

      const url = await uploadImage(file);
      field.handleChange(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <div className="flex items-center gap-4">
        {/* PREVIEW */}
        <div className="w-16 h-16 rounded-full overflow-hidden border bg-muted">
          {preview ? (
            <Image src={preview} alt="preview" width={64} height={64} />
          ) : (
            <div className="flex items-center justify-center h-full text-xs">
              No Image
            </div>
          )}
        </div>

        {/* UPLOAD */}
        <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
          <Upload size={16} />
          {loading ? "Uploading..." : "Upload Image"}
          <input type="file" hidden onChange={handleUpload} />
        </label>
      </div>
    </div>
  );
};

export default AppImageField;
