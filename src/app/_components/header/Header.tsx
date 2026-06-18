import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b-4 border-neonPink fixed z-1 w-full bg-bg">
      <div className="flex items-center justify-between text-neonGreen py-3 px-6 max-w-7xl m-auto">
        <Link href={"/user"} className="text-[32px]" aria-label="LinkPet">[ ^•ﻌ•^ ] LINKPET</Link>
        <span>SECURE_CORE_NODE_V3</span>
      </div>
    </header>
  )
}