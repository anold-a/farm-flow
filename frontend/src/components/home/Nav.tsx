import UserHome from "./UserHome";
import Link from "next/link";


export default function HomeNav() {
  return (
    <nav className="flex h-16 w-full items-center justify-between bg-[#0a0a0a] px-6 text-white">
  <div className="flex items-center gap-5">
    <Link href="/">Mode</Link>
   <Link href="/ffeatures">Features</Link>
    <Link href="/about">About</Link>
    <Link href="/faq">FAQ</Link>
  </div>
  
  <UserHome />
</nav>
  );
}