import UserHome from "./UserHome";
import Link from "next/link";
import Image from "next/image";


export default function HomeNav() {
  return (
    <nav className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-[#f5f5f6] px-6 text-black">
     
     <Image
     src="/agri1.svg"
     alt="logo"
     width={50}
     height={50}
     
     />
  
  <div className="flex items-center justify-center gap-4 mr-50">
    <Link href="/">Mode</Link>
   <Link href="/features">Features</Link>
    <Link href="/about">About</Link>
    <Link href="/faq">FAQ</Link>
  </div>
  
  <UserHome />
  
</nav>
  );
}