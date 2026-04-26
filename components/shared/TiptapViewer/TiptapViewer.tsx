/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  content: any; 
}

const TiptapViewer = ({ content }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapViewer;
