"use client";

import UserMenu from "./UserMenu";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import FieldForm from "../field/FieldForm";
import CreateUserForm from "@/components/users/CreateUserForm";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {useState,useMemo,useEffect } from "react";
import GlobalSearch from "../dashboard/GlobalSearch";
import Modal from "./Modal";
import AddCropFlow from "@/components/crop/AddCropFlow"; 
import { FiMenu } from "react-icons/fi";

const Icon2 = ({ children }: { children: React.ReactNode }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);


const HomeIcon = () => <Icon2><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></Icon2>;
const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5" aria-hidden="true">
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);
const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

type ModalKey = "registerField" | "createUser" | "addCrop";


const MODALS: Record<
  ModalKey,
  { label: string; Form: React.ComponentType<{ onSuccess?: () => void; onCancel?: () => void;}> }
> = {
  registerField: { label: "Register field", Form: FieldForm },
  createUser: { label: "Create a new user", Form: CreateUserForm},
   addCrop: { label: "Add a new crop", Form: AddCropFlow },
};

const ALL_TABS: { href: string; label: string; roles?: string[]; modal?: ModalKey }[] = [
  { href: "/fields/create", label: "Register Field", roles: ["ADMIN"], modal: "registerField" },
  { href: "/register", label: "Create a new user", roles: ["ADMIN"], modal:"createUser" },
  { href: "/crops", label: "Add a new crop", roles: ["ADMIN", "AGENT"],modal: "addCrop"  },
];

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user } = useAuth();
  const role = user?.role ?? "AGENT";
  const { unreadCount } = useNotifications();
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);
const closeModal = () => setOpenModal(null);

  const router = useRouter();
  const pathname = usePathname();
  

  const [closed, setClosed] = useState<string[]>([]);

  const tabs = useMemo(
    () =>
      ALL_TABS.filter(
        (t) => (!t.roles || t.roles.includes(role)) && !closed.includes(t.href)
      ),
    [role, closed]
  );
  


 

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  function closeTab(e: React.MouseEvent, href: string) {
    e.preventDefault();
    e.stopPropagation();
    const remaining = tabs.filter((t) => t.href !== href);
    setClosed((c) => [...c, href]); 
    if (isActive(href)) router.push(remaining[0]?.href ?? "/dashboard");
  }

 

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-15 items-center gap-2 bg-emerald-50 px-3 md:left-64 md:right-0 md:inset-x-auto">
       <button
    type="button"
    aria-label="Open menu"
    onClick={onMenuClick}
    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-800 hover:bg-black/5 md:hidden"
  >
    <FiMenu size={18} aria-hidden="true" />
  </button>
      

      
      <Link href="/dashboard" aria-label="Home"
        className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-neutral-800 hover:bg-black/5">
        <HomeIcon />
      </Link>

      
      <div className="hidden  min-w-0 grow items-center gap-1 overflow-x-auto md:flex">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const tabClass = `flex h-8 shrink-0 items-center gap-2 rounded-sm px-3 text-[13px] font-medium transition-colors ${
    active ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:bg-black/5 hover:text-neutral-800"
  }`;

  
  if (tab.modal) {
  return (
    <button key={tab.href} type="button" onClick={() => setOpenModal(tab.modal!)}
      aria-haspopup="dialog" className={tabClass}>
      <span>{tab.label}</span>
    </button>
  );
}
          return (
            <Link key={tab.href} href={tab.href} aria-current={active ? "page" : undefined}
              className={`flex h-8 shrink-0 items-center gap-2 rounded-sm px-3 text-[13px] font-medium transition-colors ${
                active
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:bg-black/5 hover:text-neutral-800"
              }`}>
              <span>{tab.label}</span>
              {active && (
                <button onClick={(e) => closeTab(e, tab.href)} aria-label={`Close ${tab.label}`}
                  className="ml-1 text-neutral-400 hover:text-neutral-800">
                  <CloseIcon />
                </button>
              )}
            </Link>
          );
        })}
      </div>
      <div className="grow md:hidden" />

      <div className="flex  items-center gap-2">
      <GlobalSearch />

      
      <Link href="/notifications" aria-label="Notifications"
        className="relative flex h-9 w-9 items-center justify-center  text-neutral-800">
        <BellIcon />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </Link>

        <UserMenu />
    </div>
  {openModal && (() => {
  const { label, Form } = MODALS[openModal];
  return (
    <Modal label={label} onClose={closeModal}>
      <Form onSuccess={closeModal} onCancel={closeModal} />
    </Modal>
  );
})()}
    </header>
  );
}