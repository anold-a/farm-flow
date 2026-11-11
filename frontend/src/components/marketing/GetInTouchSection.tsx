"use client"
import Link from "next/link"
import { useState } from "react"
import Button from "../ui/Button"
import Input from "../ui/Input"
import Image from "next/image"


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

return (
    <section id="contact" className="bg-white py-20 w-full">
      <div className=" mx-auto max-w-6xl px-6 lg:px-8">
        <p className="text-sm font-medium text-emerald-600">Get In Touch</p>
        <h2 className="mt-2 font-display text-3xl text-gray-900 sm:text-4xl">
          Questions about SmartSeason? Reach out
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your name"
              className="bg-slate-800 border-slate-700 text-gray-900 placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="bg-slate-800 border-slate-700 text-gray-900 placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
            />

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Yes,you.Tell me what you're thinking..."
                className="w-full rounded-md border border-slate-700 bg-white px-4 py-2 text-sm outline-none focus:border-emerald-600 text-gray-900"
              />
            </div>

            <Button type="submit">
              {submitted ? "Message sent — thank you" : "Send Message"}
            </Button>
          </form>

          <div className="rounded-2xl border border-gray-200 bg-emerald-50/40 p-8">
           
            <div className="relative w-100 h-100 shrink-0 sm:w-80 sm:h-50">
          <Image 
            src="/harvest.svg" 
            alt="Customer care support graphic"
            width={1680}
            height={1680}
          />
        </div>

            <div className="mt-8  flex  space-y-3 text-sm text-gray-700">
              <Link href="mailto:hello@smartseason.app" className="block mr-20 hover:text-emerald-600"> 
                hello@smartseason.app
              </Link>
              
              <Link  href="https://github.com/iam-amani" 
                target="_blank"
                rel="noreferrer"
                className="block hover:text-emerald-600"
              >
                github.com/iam-amani
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}