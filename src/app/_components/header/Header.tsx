import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b-4 border-neonPink static">
      <div className="flex items-center justify-between max-w-7xl m-auto text-neonGreen py-3 px-6">
        <Link href={"/user"} className="text-[32px]" aria-label="LinkPet">[ ^•ﻌ•^ ] LINKPET</Link>
        <span>SECURE_CORE_NODE_V3</span>
      </div>
    </header>
  )
}