"use client"

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

return (
    <section id="contact" className="bg-white py-20 w-full">
      <div className=" mx-auto max-w-5xl px-6 lg:px-8">
        <p className="text-sm font-medium text-field-gold">Get In Touch</p>
        <h2 className="mt-2 font-display text-3xl text-field-dark sm:text-4xl">
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
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
            />

            <div>
              <label className="mb-1 block text-sm font-medium text-field-dark">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us what you're thinking..."
                className="w-full rounded-md border border-field-dark/15 px-4 py-2 text-sm outline-none focus:border-field-gold"
              />
            </div>

            <Button type="submit">
              {submitted ? "Message sent — thank you" : "Send Message"}
            </Button>
          </form>

          <div className="rounded-2xl border border-field-dark/10 bg-field-paper/40 p-8">
            <p className="text-sm text-field-dark/60">Field status, right now</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {["healthy", "healthy", "attention", "healthy", "critical", "healthy"].map(
                (status, i) => (
                  <div
                    key={i}
                    className={`h-14 rounded-lg ${
                      status === "healthy"
                        ? "bg-emerald-500/20"
                        : status === "attention"
                          ? "bg-field-gold/25"
                          : "bg-red-500/20"
                    }`}
                  />
                ),
              )}
            </div>

            <div className="mt-8 space-y-3 text-sm text-field-dark/70">
              <p>@smartseason.app</p>
              <p> iam-amani</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}