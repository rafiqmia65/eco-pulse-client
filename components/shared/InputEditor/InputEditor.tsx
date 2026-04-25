/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";

import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

import { useEffect, useRef, useState } from "react";

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Minus,
  Link as LinkIcon,
  Image as ImageIcon,
  CheckSquare,
  Paintbrush,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { uploadImage } from "@/lib/upload/uploadImage";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function InputEditor({ value, onChange }: Props) {
  const [link, setLink] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [color, setColor] = useState("#000000");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit.configure({
        heading: false,
      }),

      Heading.configure({ levels: [1, 2, 3] }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Link.configure({ openOnClick: false }),

      Underline,
      Strike,
      Highlight,
      Image,

      TextStyle,
      Color,

      TaskList,
      TaskItem.configure({ nested: true }),

      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,

      Placeholder.configure({
        placeholder: "Start writing your idea...",
      }),
    ],

    content: value || "",

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  const btn = (active: boolean) =>
    `p-2 rounded-lg hover:bg-muted/80 transition-colors ${active ? "bg-muted text-primary" : "text-muted-foreground hover:text-foreground"}`;


  // LINK
  const addLink = () => {
    if (link) {
      editor.chain().focus().setLink({ href: link }).run();
      setLink("");
    }
  };

  // IMAGE URL
  const addImageFromURL = () => {
    if (imageURL) {
      editor.chain().focus().setImage({ src: imageURL }).run();
      setImageURL("");
    }
  };

  // FILE UPLOAD
  const handleFileUpload = async (file: File) => {
    const url = await uploadImage(file);
    editor.chain().focus().setImage({ src: url }).run();
  };

  // PASTE IMAGE
  const handlePaste = async (event: any) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.includes("image")) {
        const file = item.getAsFile();
        if (file) {
          const url = await uploadImage(file);
          editor.chain().focus().setImage({ src: url }).run();
        }
      }
    }
  };

  return (
    <div onPaste={handlePaste} className="border rounded-xl overflow-hidden shadow-sm bg-card">
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 border-b bg-muted/20">
        
        {/* TEXT STYLE */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <button type="button" title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive("bold"))}>
            <Bold className="w-4 h-4" />
          </button>
          <button type="button" title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive("italic"))}>
            <Italic className="w-4 h-4" />
          </button>
          <button type="button" title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btn(editor.isActive("underline"))}>
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <button type="button" title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} className={btn(editor.isActive("strike"))}>
            <Strikethrough className="w-4 h-4" />
          </button>
          <button type="button" title="Highlight" onClick={() => editor.chain().focus().toggleHighlight().run()} className={btn(editor.isActive("highlight"))}>
            <Highlighter className="w-4 h-4" />
          </button>
          <div className="w-6 h-6 rounded-md overflow-hidden relative ml-1 border cursor-pointer hover:ring-2 ring-primary/50 transition-all">
            <input
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                editor.chain().focus().setColor(e.target.value).run();
              }}
              className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer"
              title="Text Color"
            />
          </div>
          <button type="button" title="Clear Formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className={btn(false)}>
            <Paintbrush className="w-4 h-4" />
          </button>
        </div>

        {/* HEADINGS */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <button type="button" title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btn(editor.isActive("heading", { level: 1 }))}>
            <Heading1 className="w-4 h-4" />
          </button>
          <button type="button" title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive("heading", { level: 2 }))}>
            <Heading2 className="w-4 h-4" />
          </button>
          <button type="button" title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive("heading", { level: 3 }))}>
            <Heading3 className="w-4 h-4" />
          </button>
        </div>

        {/* LISTS & BLOCKS */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <button type="button" title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive("bulletList"))}>
            <List className="w-4 h-4" />
          </button>
          <button type="button" title="Numbered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive("orderedList"))}>
            <ListOrdered className="w-4 h-4" />
          </button>
          <button type="button" title="Task List" onClick={() => editor.chain().focus().toggleTaskList().run()} className={btn(editor.isActive("taskList"))}>
            <CheckSquare className="w-4 h-4" />
          </button>
          <button type="button" title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive("blockquote"))}>
            <Quote className="w-4 h-4" />
          </button>
          <button type="button" title="Code Block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btn(editor.isActive("codeBlock"))}>
            <Code className="w-4 h-4" />
          </button>
          <button type="button" title="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btn(false)}>
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* ALIGNMENT */}
        <div className="hidden sm:flex items-center gap-1 pr-2 border-r">
          <button type="button" title="Align Left" onClick={() => editor.chain().focus().setTextAlign("left").run()} className={btn(editor.isActive({ textAlign: "left" }))}>
            <AlignLeft className="w-4 h-4" />
          </button>
          <button type="button" title="Align Center" onClick={() => editor.chain().focus().setTextAlign("center").run()} className={btn(editor.isActive({ textAlign: "center" }))}>
            <AlignCenter className="w-4 h-4" />
          </button>
          <button type="button" title="Align Right" onClick={() => editor.chain().focus().setTextAlign("right").run()} className={btn(editor.isActive({ textAlign: "right" }))}>
            <AlignRight className="w-4 h-4" />
          </button>
        </div>

        {/* INSERTS */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" title="Insert Link" className={btn(editor.isActive("link"))}>
                <LinkIcon className="w-4 h-4" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Add Link</DialogTitle>
              </DialogHeader>
              <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..." />
              <Button onClick={addLink}>Add Link</Button>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <button type="button" title="Insert Image" className={btn(editor.isActive("image"))}>
                <ImageIcon className="w-4 h-4" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Add Image</DialogTitle>
              </DialogHeader>
              <Input
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="Image URL"
              />
              <Button onClick={addImageFromURL}>Add from URL</Button>
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                Upload File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* UNDO/REDO */}
        <div className="flex items-center gap-1">
          <button type="button" title="Undo" onClick={() => editor.chain().focus().undo().run()} className={btn(false)}>
            <Undo className="w-4 h-4" />
          </button>
          <button type="button" title="Redo" onClick={() => editor.chain().focus().redo().run()} className={btn(false)}>
            <Redo className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* EDITOR */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-[200px] max-h-[300px] overflow-y-auto prose max-w-none focus:outline-none"
      />
    </div>
  );
}
