"use client";

import { useState } from "react";
import { accessService } from "@/services/access.service";
import { FiCheck, FiSend } from "react-icons/fi";


type Props = {
  name?: string;
  sent: boolean;           
  onRequested: () => void; 
};

export default function AgentWelcome({ name, sent, onRequested }: Props) {
  const [loading, setLoading] = useState(false);



   async function requestAccess() {
    try {
      setLoading(true);
      await accessService.request(); 
      onRequested();
    } catch {
      alert("Could not send the request. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="rounded-2xl bg-[#F8F7F4] p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-neutral-900">
        Welcome{name ? `, ${name.split(" ")[0]}` : ""}
      </h2>

     
      <p className="mt-1 text-sm text-neutral-600">
        {sent
          ? "Your request has been sent. An admin will assign your fields soon. Until then, explore the sample field below."
          : "Your account is ready. Request access and an admin will assign your fields. You can explore a sample field in the meantime."}
      </p>

      <button
        type="button"
        onClick={requestAccess}
        disabled={loading || sent}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {sent ? <FiCheck size={14} aria-hidden="true" /> : <FiSend size={14} aria-hidden="true" />}
        {sent ? "Request sent" :  "Request access"}
      </button>
    </div>
  );
}