import  LogoutButton from "./Logout";

export default function UserMenu() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex h-10 w-10  items-center justify-center rounded-full bg-green-600 text-white">
        <LogoutButton />
      </div>

      
    </div>
  );
}