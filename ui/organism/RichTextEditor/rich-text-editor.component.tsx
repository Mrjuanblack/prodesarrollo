"use client";

import { useEffect, useRef } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
} from "lucide-react";
import { addToast, Spinner } from "@heroui/react";
import { useUploadInlineImage } from "@/hooks/news/useUploadInlineImage";

interface RichTextEditorProps {
  value: string;
  placeholder?: string;
  onChange: (html: string) => void;
}

const ToolbarButton: React.FC<{
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}> = ({ onClick, active, disabled, title, children }) => (
  <button
    type="button"
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-2 rounded hover:bg-default-200 transition-colors ${
      active ? "bg-default-200 text-primary" : "text-default-700"
    } disabled:opacity-40 disabled:cursor-not-allowed`}
  >
    {children}
  </button>
);

const Toolbar: React.FC<{
  editor: Editor | null;
  onInsertImage: () => void;
  isUploadingImage: boolean;
}> = ({ editor, onInsertImage, isUploadingImage }) => {
  if (!editor) return null;

  const promptForLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const input = window.prompt("URL del enlace", previous ?? "https://");
    if (input === null) return;
    if (input === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: input, target: "_blank", rel: "noopener noreferrer" })
      .run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-default-200 p-2 bg-default-50">
      <ToolbarButton
        title="Negrita"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Cursiva"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Tachado"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Underline size={16} />
      </ToolbarButton>

      <div className="w-px h-6 bg-default-300 mx-1" />

      <ToolbarButton
        title="Encabezado 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Encabezado 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3 size={16} />
      </ToolbarButton>

      <div className="w-px h-6 bg-default-300 mx-1" />

      <ToolbarButton
        title="Lista"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Lista numerada"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Cita"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote size={16} />
      </ToolbarButton>

      <div className="w-px h-6 bg-default-300 mx-1" />

      <ToolbarButton
        title="Enlace"
        active={editor.isActive("link")}
        onClick={promptForLink}
      >
        <LinkIcon size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Insertar imagen"
        onClick={onInsertImage}
        disabled={isUploadingImage}
      >
        {isUploadingImage ? <Spinner size="sm" /> : <ImageIcon size={16} />}
      </ToolbarButton>

      <div className="w-px h-6 bg-default-300 mx-1" />

      <ToolbarButton
        title="Deshacer"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Rehacer"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo size={16} />
      </ToolbarButton>
    </div>
  );
};

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  placeholder,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadInlineImage();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ HTMLAttributes: { class: "rounded-lg my-3" } }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
          class: "text-primary underline",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder ?? "Escribe el contenido...",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm md:prose-base max-w-none focus:outline-none min-h-[240px] p-4",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // External value changes (e.g. resetting the form) need to be reflected
  // in the editor state. Compare against current HTML to avoid clobbering
  // the cursor while the user types.
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
    }
  }, [value, editor]);

  const onInsertImage = () => {
    fileInputRef.current?.click();
  };

  const onFilePicked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;

    try {
      const { url } = await uploadMutation.mutateAsync(file);
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    } catch (err) {
      console.error(err);
      addToast({
        color: "danger",
        title: "No se pudo subir la imagen",
        description: "Intenta de nuevo en unos segundos.",
      });
    }
  };

  return (
    <div className="border border-default-300 rounded-lg overflow-hidden bg-white">
      <Toolbar
        editor={editor}
        onInsertImage={onInsertImage}
        isUploadingImage={uploadMutation.isPending}
      />
      <EditorContent editor={editor} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFilePicked}
      />
    </div>
  );
};

export default RichTextEditor;
