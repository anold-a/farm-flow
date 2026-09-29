import { InputHTMLAttributes } from "react";
 interface Props extends InputHTMLAttributes<HTMLInputElement> { 
  label: string; className?: string; 
} 
  export default function Input(
    { label, className = "", ...props }: Props) { 
      return ( 
      <div className="space-y-1.5"> 
      <label className="block text-sm font-semibold text-gray-800">
         {label} 
         </label>
          <input 
          {...props} 
          className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 ${className}`} /> 
          </div> 
          );
         }
