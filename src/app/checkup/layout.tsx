import Footer from "../_components/footer/Footer";
import Header from "../_components/header/Header";

export default function CheckupLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
        <main className="w-full mt-0 relative pbs-25 px-6 mbe-10 max-w-3xl m-auto">
          {children}
        </main>
      <Footer />
    </>
  )
}