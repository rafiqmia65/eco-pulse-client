/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

interface Props {
  content: any;
}

const TiptapRenderer = ({ content }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="prose dark:prose-invert max-w-none">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapRenderer;
