'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import {
  mockDocuments,
  Document,
  formatShortDate,
  getDocumentIcon,
} from '@/data/portalMockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

type CategoryFilter = 'all' | Document['category'];

const categoryOptions: { value: CategoryFilter; label: string; icon: string }[] = [
  { value: 'all', label: 'All Documents', icon: 'folder' },
  { value: 'policies', label: 'Policies', icon: 'description' },
  { value: 'claims', label: 'Claims', icon: 'assignment' },
  { value: 'invoices', label: 'Invoices', icon: 'receipt' },
  { value: 'certificates', label: 'Certificates', icon: 'verified' },
];

export default function DocumentsPage() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredDocuments = useMemo(() => {
    return mockDocuments.filter((doc) => {
      const matchesCategory =
        categoryFilter === 'all' || doc.category === categoryFilter;
      const matchesSearch =
        searchQuery === '' ||
        doc.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  const documentCounts = useMemo(() => {
    return {
      all: mockDocuments.length,
      policies: mockDocuments.filter((d) => d.category === 'policies').length,
      claims: mockDocuments.filter((d) => d.category === 'claims').length,
      invoices: mockDocuments.filter((d) => d.category === 'invoices').length,
      certificates: mockDocuments.filter((d) => d.category === 'certificates').length,
    };
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)] mb-2">
            Documents
          </h1>
          <p className="text-[var(--text-muted)]">
            Access and download your policy documents
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white font-medium text-sm hover:bg-[var(--primary-hover)] transition-colours shadow-lg shadow-primary/25 w-fit">
          <span className="material-symbols-outlined text-lg">upload</span>
          Upload Document
        </button>
      </motion.div>

      {/* Search & Filters */}
      <motion.div variants={itemVariants} className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-subtle)]">
            search
          </span>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[var(--border-light)] bg-white dark:bg-stone-900 text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] hover:text-[var(--text-muted)]"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>

        {/* Category Filters & View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setCategoryFilter(option.value)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  categoryFilter === option.value
                    ? 'bg-[var(--primary)] text-white shadow-lg shadow-primary/25'
                    : 'bg-[var(--surface-inset)] text-[var(--text-body)] hover:bg-[var(--surface)] border border-[var(--border-light)]'
                }`}
              >
                <span className="material-symbols-outlined text-lg">
                  {option.icon}
                </span>
                {option.label}
                <span
                  className={`px-1.5 py-0.5 rounded-full text-xs ${
                    categoryFilter === option.value
                      ? 'bg-white/20 text-white'
                      : 'bg-[var(--surface)] text-[var(--text-muted)]'
                  }`}
                >
                  {documentCounts[option.value]}
                </span>
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-[var(--surface-inset)] border border-[var(--border-light)]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-stone-800 shadow-sm text-[var(--primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
              }`}
              aria-label="Grid view"
            >
              <span className="material-symbols-outlined text-lg">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-stone-800 shadow-sm text-[var(--primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
              }`}
              aria-label="List view"
            >
              <span className="material-symbols-outlined text-lg">
                format_list_bulleted
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Documents */}
      <motion.section variants={itemVariants}>
        {filteredDocuments.length > 0 ? (
          viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group p-5 rounded-2xl bg-white dark:bg-stone-900 border border-[var(--border-light)] hover:border-[var(--primary)]/30 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl text-[var(--primary)]">
                        {getDocumentIcon(doc.type)}
                      </span>
                    </div>
                    <button className="p-2 rounded-lg text-[var(--text-subtle)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 opacity-0 group-hover:opacity-100 transition-all">
                      <span className="material-symbols-outlined text-lg">
                        download
                      </span>
                    </button>
                  </div>
                  <h3 className="font-medium text-[var(--text-main)] text-sm mb-2 line-clamp-2">
                    {doc.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span>{formatShortDate(doc.uploadedDate)}</span>
                    <span>{doc.fileSize}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-[var(--border-light)] overflow-hidden">
              <div className="divide-y divide-[var(--border-light)]">
                {filteredDocuments.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center gap-4 p-4 hover:bg-[var(--surface-inset)]/50 transition-colours cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-xl text-[var(--primary)]">
                        {getDocumentIcon(doc.type)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[var(--text-main)] text-sm truncate">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)]">
                        {formatShortDate(doc.uploadedDate)} · {doc.fileSize}
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-inset)] text-[var(--text-muted)] capitalize">
                      {doc.category}
                    </span>
                    <button className="p-2 rounded-lg text-[var(--text-subtle)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all">
                      <span className="material-symbols-outlined text-lg">
                        download
                      </span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 rounded-2xl bg-[var(--surface-inset)]">
            <span className="material-symbols-outlined text-5xl text-[var(--text-subtle)] mb-4">
              folder_off
            </span>
            <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">
              No documents found
            </h3>
            <p className="text-[var(--text-muted)] max-w-md mx-auto mb-6">
              {searchQuery
                ? `No documents match "${searchQuery}". Try a different search term.`
                : 'No documents in this category yet.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface)] text-[var(--text-body)] font-medium text-sm border border-[var(--border-light)] hover:border-[var(--border-medium)] transition-colours"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                  Clear Search
                </button>
              )}
              {categoryFilter !== 'all' && (
                <button
                  onClick={() => setCategoryFilter('all')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] text-white font-medium text-sm hover:bg-[var(--primary-hover)] transition-colours"
                >
                  <span className="material-symbols-outlined text-lg">
                    refresh
                  </span>
                  View All Documents
                </button>
              )}
            </div>
          </div>
        )}
      </motion.section>

      {/* Help Section */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[var(--surface-inset)] border border-[var(--border-light)]">
            <span className="material-symbols-outlined text-2xl text-[var(--primary)] mb-3">
              upload_file
            </span>
            <h3 className="font-semibold text-[var(--text-main)] mb-1">
              Upload Documents
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-3">
              Securely upload supporting documents for your policies or claims.
            </p>
            <button className="text-sm text-[var(--primary)] font-medium hover:underline inline-flex items-center gap-1">
              Upload Now
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface-inset)] border border-[var(--border-light)]">
            <span className="material-symbols-outlined text-2xl text-[var(--primary)] mb-3">
              security
            </span>
            <h3 className="font-semibold text-[var(--text-main)] mb-1">
              Secure Storage
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-3">
              All documents are encrypted and stored securely in compliance with
              POPIA.
            </p>
            <a
              href="/privacy"
              className="text-sm text-[var(--primary)] font-medium hover:underline inline-flex items-center gap-1"
            >
              Privacy Policy
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface-inset)] border border-[var(--border-light)]">
            <span className="material-symbols-outlined text-2xl text-[var(--primary)] mb-3">
              support_agent
            </span>
            <h3 className="font-semibold text-[var(--text-main)] mb-1">
              Need a Document?
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-3">
              Contact us if you need a specific document or certificate.
            </p>
            <a
              href="/contact"
              className="text-sm text-[var(--primary)] font-medium hover:underline inline-flex items-center gap-1"
            >
              Contact Support
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
