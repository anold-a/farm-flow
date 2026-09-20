import UserHome from "./UserHome";
import Link from "next/link";
import Image from "next/image";


export default function HomeNav() {
  return (
    <nav className="rounded-lg fixed top-2 inset-x-0 z-50 flex h-16 w-[92%] max-w-6xl mx-auto items-center justify-between bg-white px-6 text-black shadow-md">
     
     <Image
     src="/agri1.svg"
     alt="logo"
     width={50}
     height={50}
     
     />
  
  <div className="flex items-center justify-center gap-6 mr-10">
    <Link href="/">Mode</Link>
   <Link href="#features">Features</Link>
    <Link href="#facts">App Facts</Link>
     <Link href="#mission">Mission&Vision</Link>
    <Link href="#faqs">FAQ</Link>
    <Link href="#creator">About</Link>
    <Link href="#contact">Get In Touch</Link>
  </div>
  
  <UserHome />
  
</nav>
  );
}