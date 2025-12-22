"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

type OfficeLocation = "dbn" | "jhb" | "pta" | "pmb";

interface Office {
  id: OfficeLocation;
  name: string;
  region: string;
  address1: string;
  address2: string;
  phone?: string;
  mapUrl: string;
}

const offices: Office[] = [
  {
    id: "dbn",
    name: "Durban",
    region: "Head Office",
    address1: "391 Anton Lembede Street, Suite 502C",
    address2: "Durban, KwaZulu-Natal, 4001",
    phone: "+27 31 301 1192",
    mapUrl:
      "https://maps.google.com/maps?q=391+Anton+Lembede+Street,Durban,South+Africa&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "jhb",
    name: "Johannesburg",
    region: "Gauteng",
    address1: "Randburg & Germiston Offices",
    address2: "Johannesburg, Gauteng",
    mapUrl:
      "https://maps.google.com/maps?q=Johannesburg,South+Africa&t=&z=12&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "pta",
    name: "Pretoria",
    region: "Gauteng",
    address1: "Pretoria Regional Office",
    address2: "Pretoria, Gauteng",
    mapUrl:
      "https://maps.google.com/maps?q=Pretoria,South+Africa&t=&z=12&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "pmb",
    name: "Pietermaritzburg",
    region: "KwaZulu-Natal",
    address1: "Pietermaritzburg Regional Office",
    address2: "Pietermaritzburg, KwaZulu-Natal",
    mapUrl:
      "https://maps.google.com/maps?q=Pietermaritzburg,South+Africa&t=&z=12&ie=UTF8&iwloc=&output=embed",
  },
];

const socialLinks = [
  {
    label: "X (Twitter)",
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
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
  },
];

export default function OfficeLocations() {
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation>("dbn");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Office List */}
        <motion.div
          className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 flex flex-col justify-center"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.h2
            className="text-3xl font-bold text-slate-900 dark:text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Offices
          </motion.h2>

          <div className="space-y-4">
            {offices.map((office, index) => (
              <motion.div
                key={office.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <motion.button
                  className="group cursor-pointer block relative pl-6 pr-4 py-4 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300 w-full text-left"
                  onClick={() => setSelectedOffice(office.id)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active Indicator */}
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 bg-primary rounded-r-full"
                    initial={false}
                    animate={{
                      height: selectedOffice === office.id ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3
                        className={`text-xl font-semibold transition-colors ${
                          selectedOffice === office.id
                            ? "text-primary"
                            : "text-slate-900 dark:text-white group-hover:text-primary"
                        }`}
                      >
                        {office.name}
                      </h3>
                      <span className="text-xs font-bold uppercase tracking-wider text-primary/70">
                        {office.region}
                      </span>
                    </div>
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
                    {office.phone && (
                      <>
                        <br />
                        <span className="text-primary font-medium">{office.phone}</span>
                      </>
                    )}
                  </p>
                </motion.button>

                {index < offices.length - 1 && (
                  <div className="h-px bg-slate-100 dark:bg-slate-700 w-[90%] mx-auto" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <motion.div
            className="mt-10 pl-6 border-t border-slate-200 dark:border-slate-700 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-3">
              Connect with us
              <span className="h-px bg-slate-200 dark:bg-slate-700 flex-grow" />
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ type: "spring" as const, stiffness: 400, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Map */}
        <motion.div
          className="lg:col-span-7 min-h-[500px] relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
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
          <motion.div
            className="absolute bottom-6 left-6 z-20 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(191,6,3,0.6)]" />
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Live Map View
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
