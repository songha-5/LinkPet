import DOMPurify from 'dompurify';

export default function PostDetail({ data }: { data: string }) {
  const safeHTML = typeof window !== 'undefined'
    ? DOMPurify.sanitize(data)
    : data

  return (
    <div
      className="text-lg"
      dangerouslySetInnerHTML={{ __html: safeHTML}}
    />
  )
}