import type { Metadata } from 'next'
import "./globals.css";

export const metadata: Metadata = {
  title: 'linkPet',
  description: '당신의 반려동물의 건강을 확인하고 수의사와 1:1상담도 받을 수 있는 웹사이트',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={'h-full antialiased'}
    >
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  )
}
