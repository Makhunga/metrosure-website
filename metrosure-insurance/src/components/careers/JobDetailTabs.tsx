"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Job } from "@/data/jobs";
import JobDetailContent from "./JobDetailContent";
import ApplicationForm from "./ApplicationForm";

interface JobDetailTabsProps {
  job: Job;
}

type TabId = "overview" | "application";

const tabs = [
  { id: "overview" as TabId, label: "Overview" },
  { id: "application" as TabId, label: "Application" },
];

export default function JobDetailTabs({ job }: JobDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  // Handle hash-based navigation (e.g., #apply links)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#apply") {
        setActiveTab("application");
        // Scroll to tabs section
        const tabsElement = document.getElementById("job-tabs");
        if (tabsElement) {
          tabsElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div id="job-tabs">
      {/* Tabs Navigation */}
      <div className="sticky top-[72px] z-30 bg-[rgb(var(--color-surface-card))] border-b border-[rgb(var(--color-border-light))]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-4 text-base font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-text-body))]"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "overview" && <JobDetailContent job={job} />}
        {activeTab === "application" && (
          <ApplicationForm id="apply" selectedPosition={job.title} />
        )}
      </div>
    </div>
  );
}
