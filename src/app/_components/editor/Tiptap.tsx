'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '여기에 내용을 작성해주세요.',
      }),
      Link.configure({ openOnClick: false }),
      Image
    ],
    content: '',
    editable: true,
    autofocus: 'end',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      console.log(html)
    }
  })

  return (
    <EditorContent className='cursor-text' editor={editor} />
  )
}

export default TiptapEditor