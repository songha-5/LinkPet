import type { Metadata } from 'next'
import "./globals.css";
import Image from 'next/image';

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
      <body className="flex min-h-full flex-col h-full">
        {/* 배경 데코 */}
        <Image
          className="absolute -z-2 top-1/12 left-2/12 opacity-6 animate-float object-contain w-127.5 h-120"
          src="/bg_1.svg"
          alt=""
          width={510}
          height={480}
        />
        <Image
          className="absolute -z-2 bottom-1/12 right-1/20 opacity-6 animate-float duration-800 [animation-delay:1.5s] object-contain w-77.5 h-70"
          src="/bg_2.svg"
          alt=""
          width={310}
          height={280}
        />
        <div className="absolute bottom-1/4 left-1/8 w-1.5 h-1.5 text-neonGreen shadow-[-6px_0_0_0_currentColor,6px_0_0_0_currentColor,0_-6px_0_0_currentColor,0_6px_0_0_currentColor] bg-neonGreen -z-2 scale-200 opacity-20"></div>
        <div className="absolute top-1/4 right-1/20 w-1.5 h-1.5 text-neonPink shadow-[-6px_0_0_0_currentColor,6px_0_0_0_currentColor,0_-6px_0_0_currentColor,0_6px_0_0_currentColor] bg-neonPink -z-2 scale-200 opacity-20"></div>
        {children}
      </body>
    </html>
  )
}
