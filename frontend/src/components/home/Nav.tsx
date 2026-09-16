import UserHome from "./UserHome";
import Link from "next/link";


export default function HomeNav() {
  return (
    <nav className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-[#f5f5f6] px-6 text-black">
  <div className="flex items-center gap-5">
    <Link href="/">Mode</Link>
   <Link href="/features">Features</Link>
    <Link href="/about">About</Link>
    <Link href="/faq">FAQ</Link>
  </div>
  
  <UserHome />
</nav>
  );
}