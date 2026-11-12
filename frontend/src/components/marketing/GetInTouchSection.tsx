"use client"
import Link from "next/link"
import { useState } from "react"
import Button from "../ui/Button"
import Input from "../ui/Input"



export default function GetInTouchSection(){
  const [formData,setFormData] = useState({
    fullName:"",
    email:"",
    message:"",
});

const [submitted,setSubmitted] = useState(false);

function handleChange(event:React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement>){
  const {name,value} = event.target;
  setFormData((prev) =>({...prev,[name]:value}))
}

function handleSubmit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  setSubmitted(true);
}
const inputClass =
  "bg-gray-100! border-transparent! text-gray-900 placeholder-gray-400 text-sm py-2.5 focus:border-emerald-600! focus:bg-white! focus:ring-2 focus:ring-emerald-600/20";

return (
    
    <section id="contact" className="w-full bg-emerald-50 py-16">
     
      <div className="mx-auto max-w-6xl rounded-sm bg-white p-8 lg:p-10">
        
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">

          <div>
            
            <h2 className="text-4xl font-normal tracking-tight text-gray-900 sm:text-5xl">
              Get in touch
            </h2>

            
            <div className="mt-8 space-y-5 text-sm">
              <div>
                <p className="text-xs text-gray-500">Email:</p>
                
                <Link href="mailto:hello@smartseason.app" className="mt-0.5 block font-medium text-gray-900 hover:text-emerald-600">
                  hello@smartseason.app
                </Link>
              </div>

              <div>
                <p className="text-xs text-gray-500">Phone:</p>
                <p className="mt-0.5 font-medium text-gray-900">+254 7******</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Address:</p>
                <p className="mt-0.5 font-medium leading-relaxed text-gray-900">
                  Central<br />
                  Nyeri, Kenya
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Follow us</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <Link
                    href="https://github.com/anold-a"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                    </svg>
                  </Link>
                  <Link
                    href="mailto:hello@smartseason.app"
                    aria-label="Email"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Your Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className={inputClass}
              />
              <Input
                label="Email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                className={inputClass}
              />
            </div>

            <div>
              
              <label htmlFor="message" className="mb-1 block text-xs font-medium text-gray-700">
                Message
              </label>
              
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Write something..."
                className="w-full resize-none rounded-lg border border-transparent bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>

            
            <Button
              type="submit"
              className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              {submitted ? "Message sent — thank you" : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}