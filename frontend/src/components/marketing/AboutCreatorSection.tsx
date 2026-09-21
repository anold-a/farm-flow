import Image from "next/image";
import Link from "next/link";

export default function AboutCreatorSection() {
  return (
    <section id="creator" className="bg-white py-20 w-full">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-sm font-medium text-emerald-600">About the Creator</p>
        <h2 className="mt-2 font-display text-3xl text-gray-900 sm:text-4xl">
          Meet Amani, the builder behind SmartSeason
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="rounded-2xl border border-gray-200 bg-emerald-50/40 p-6 text-center">
            <Image
  src="/amani-profile.jpg"
  alt="Amani Arnold"
  width={160}
  height={160}
  className="mx-auto h-40 w-40 rounded-full object-cover"
/>

            <h3 className="mt-5 font-display text-xl text-gray-900">
              Amani Arnold
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Software Developer 
            </p>

            <div className="mt-4 flex justify-center gap-4 text-gray-400">
              
              <Link  href="https://github.com/iam-amani"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-gray-900"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 0C5.37 0 0 5.4 0 12.07c0 5.33 3.44 9.86 8.21 11.46.6.11.82-.26.82-.58v-2.1c-3.34.73-4.04-1.62-4.04-1.62-.55-1.4-1.34-1.78-1.34-1.78-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.26 1.86 1.26 1.08 1.86 2.83 1.32 3.52 1.01.11-.79.42-1.32.77-1.63-2.67-.31-5.47-1.36-5.47-6.04 0-1.33.47-2.42 1.24-3.28-.12-.31-.54-1.55.12-3.23 0 0 1.01-.33 3.3 1.25a11.4 11.4 0 0 1 6 0c2.29-1.58 3.3-1.25 3.3-1.25.66 1.68.24 2.92.12 3.23.77.86 1.24 1.95 1.24 3.28 0 4.69-2.81 5.72-5.49 6.03.43.38.81 1.13.81 2.28v3.38c0 .32.22.7.83.58C20.57 21.92 24 17.4 24 12.07 24 5.4 18.63 0 12 0z" />
                </svg>
              </Link>
              

            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 text-gray-700">
            <p>
           Hi, Amani Arnold - a passionate full-stack developer from swahili world. I combine technical expertise with creative problem-solving to build impactful digital solutions.

Beyond coding & learning, I enjoy experimenting with new technologies that push the boundaries of what's possible.After,I recharge on outdoor walks. For me, a true legacy is/will be built in code, so is in the environment we appreciate and the community we help grow.
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
}