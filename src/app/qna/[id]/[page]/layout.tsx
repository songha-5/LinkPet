import Footer from "@/src/app/_components/footer/Footer";
import Header from "@/src/app/_components/header/Header";

export default function QnALayout({ children }: React.PropsWithChildren ) {
  return (
    <>
      <Header />
      <main className="w-full h-full relative pbs-25 px-6 mbe-10 max-w-7xl m-auto">
        {children}
      </main>
      <Footer />
    </>
  )
}