"use client";

import { useState } from "react";

type OfficeLocation = "ny" | "lon" | "chi";

interface Office {
  id: OfficeLocation;
  name: string;
  address1: string;
  address2: string;
  mapUrl: string;
}

const offices: Office[] = [
  {
    id: "ny",
    name: "New York",
    address1: "205 West 37th Street",
    address2: "New York, NY 10018",
    mapUrl:
      "https://maps.google.com/maps?q=205+West+37th+Street,New+York,NY&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "lon",
    name: "London",
    address1: "8 Devonshire Square",
    address2: "London, UK EC2M",
    mapUrl:
      "https://maps.google.com/maps?q=8+Devonshire+Square,London,UK&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "chi",
    name: "Chicago",
    address1: "110 North Wacker Drive",
    address2: "Chicago, IL 60606",
    mapUrl:
      "https://maps.google.com/maps?q=110+North+Wacker+Drive,Chicago,IL&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
];

const socialLinks = [
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.641c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.247h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
      </svg>
    ),
  },
];

export default function OfficeLocations() {
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation>("ny");

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Office List */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Our Offices
          </h2>

          <div className="space-y-4">
            {offices.map((office, index) => (
              <div key={office.id}>
                <button
                  className="group cursor-pointer block relative pl-6 pr-4 py-4 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300 w-full text-left"
                  onClick={() => setSelectedOffice(office.id)}
                >
                  {/* Active Indicator */}
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 bg-primary rounded-r-full transition-all duration-300 ease-out ${
                      selectedOffice === office.id ? "h-full" : "h-0"
                    }`}
                  />

                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className={`text-xl font-semibold transition-colors ${
                        selectedOffice === office.id
                          ? "text-primary"
                          : "text-slate-900 dark:text-white group-hover:text-primary"
                      }`}
                    >
                      {office.name}
                    </h3>
                    <span
                      className={`material-symbols-outlined transition-colors ${
                        selectedOffice === office.id
                          ? "text-primary"
                          : "text-slate-400 dark:text-slate-500 group-hover:text-primary"
                      }`}
                    >
                      location_on
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {office.address1}
                    <br />
                    {office.address2}
                  </p>
                </button>

                {index < offices.length - 1 && (
                  <div className="h-px bg-slate-100 dark:bg-slate-700 w-[90%] mx-auto" />
                )}
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="mt-10 pl-6 border-t border-slate-200 dark:border-slate-700 pt-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-3">
              Connect with us
              <span className="h-px bg-slate-200 dark:bg-slate-700 flex-grow" />
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="lg:col-span-7 min-h-[500px] relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
          {/* Loading State */}
          <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900 animate-pulse z-0" />

          {/* Map iframes */}
          {offices.map((office) => (
            <iframe
              key={office.id}
              allowFullScreen
              className={`absolute inset-0 w-full h-full z-10 saturate-[0.7] hover:saturate-100 transition-all duration-500 ${
                selectedOffice === office.id ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={office.mapUrl}
              title={`${office.name} office location`}
            />
          ))}

          {/* Live Indicator */}
          <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(191,6,3,0.6)]" />
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Live Map View
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
