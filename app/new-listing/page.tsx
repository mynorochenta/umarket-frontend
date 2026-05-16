"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Tag, AlignLeft, DollarSign } from "lucide-react";
import { pageTransition, slideInLeft, slideInRight } from "@/lib/animations";
import type { ItemCondition } from "@/lib/types";

const CATEGORIES = [
  "Books", "Electronics", "Clothing", "Sports", "Home",
  "Art", "Music", "Transport", "Services", "Notes", "Food", "Other",
];

const CONDITIONS: { value: ItemCondition; label: string; desc: string }[] = [
  { value: "new",  label: "New",       desc: "Unused or with original packaging" },
  { value: "good", label: "Good",      desc: "Used but in excellent condition" },
  { value: "fair", label: "Fair",      desc: "Functional with signs of use" },
];

export default function PublicarPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    condition: "" as ItemCondition | "",
    price: "",
  });
  const [images, setImages] = useState<string[]>([]);

  const step1Valid = !!(form.title && form.description && form.category && form.condition && form.price);
  const step2Valid = images.length >= 1;

  const handleSubmit = async () => {
    if (!step2Valid) return;
    setSubmitting(true);
    // TODO: connect to POST /api/listings
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/feed");
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Post a listing</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Free and takes just a few minutes</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          {[1].map((n) => (
            <div key={n} className="flex-1 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                step > n ? "bg-emerald-500 text-white" : step === n ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-400"
              }`}>
                {step > n ? <CheckCircle className="w-4 h-4" /> : n}
              </div>
              <div className={`flex-1 h-1 rounded-full transition-colors ${step > n ? "bg-emerald-500" : "bg-gray-200 dark:bg-gray-700"}`} />
            </div>
          ))}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
            step >= 2 ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-400"
          }`}>
            {submitting
              ? <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : "2"}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" variants={slideInLeft} initial="initial" animate="animate" exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Item details</h2>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Title</label>
                  <div className="relative">
                    <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      maxLength={80}
                      placeholder="e.g. Texas Instruments TI-84 Plus"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                  <p className="text-right text-xs text-gray-400 mt-1">{form.title.length}/80</p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
                  <div className="relative">
                    <AlignLeft className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      rows={4}
                      maxLength={500}
                      placeholder="Describe the condition, include relevant details..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                    />
                  </div>
                  <p className="text-right text-xs text-gray-400 mt-1">{form.description.length}/500</p>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button key={cat} type="button"
                        onClick={() => setForm((f) => ({ ...f, category: cat }))}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                          form.category === cat
                            ? "bg-primary text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary"
                        }`}
                      >{cat}</button>
                    ))}
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Condition</label>
                  <div className="grid grid-cols-3 gap-2">
                    {CONDITIONS.map((c) => (
                      <button key={c.value} type="button"
                        onClick={() => setForm((f) => ({ ...f, condition: c.value }))}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          form.condition === c.value
                            ? "border-primary bg-primary/10"
                            : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                        }`}
                      >
                        <p className={`text-xs font-semibold ${form.condition === c.value ? "text-primary" : "text-gray-900 dark:text-white"}`}>{c.label}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{c.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="max-w-[180px]">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Price (Q)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                      min={1}
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                </div>

                <motion.button
                  onClick={() => step1Valid && setStep(2)}
                  disabled={!step1Valid}
                  whileHover={{ scale: step1Valid ? 1.01 : 1 }}
                  whileTap={{ scale: step1Valid ? 0.98 : 1 }}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Photos <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="step2" variants={slideInRight} initial="initial" animate="animate" exit={{ opacity: 0, x: 20 }} className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Photos</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add at least 1 photo. More photos = more sales.</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {images.map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-500 transition-colors"
                      >×</button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                      <span className="text-2xl text-gray-300 dark:text-gray-600">+</span>
                      <span className="text-xs text-gray-400 mt-1">Add photo</span>
                      <input type="file" accept="image/*" className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setImages((prev) => [...prev, url]);
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-400">{images.length}/5 photos</p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 px-5 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <motion.button
                    onClick={handleSubmit}
                    disabled={!step2Valid || submitting}
                    whileHover={{ scale: step2Valid ? 1.01 : 1 }}
                    whileTap={{ scale: step2Valid ? 0.98 : 1 }}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-cyan-500 transition-colors disabled:opacity-50"
                  >
                    {submitting
                      ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      : <><CheckCircle className="w-4 h-4" /> Post listing</>
                    }
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
