import Link from "next/link";

import { CiUser } from "react-icons/ci";

export default function UserHome() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
        <Link href="/login">
          <CiUser />
        </Link>
        
        
    
      </div>
    </div>
  );
}