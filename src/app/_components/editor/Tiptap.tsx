'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

const TiptapEditor = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image,
      Placeholder.configure({
        placeholder: '여기에 내용을 작성해주세요.',
      })
    ],
    content: value,
    autofocus: 'end',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })
  return <EditorContent editor={editor} />
}

export default TiptapEditor