import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How do I register for events?',
    answer: 'Visit our registration portal, select your events, fill in your details, and complete the payment to secure your spot.',
  },
  {
    question: 'What is the registration fee?',
    answer: 'Fees vary by event (₹100-₹500). We offer combo packages for multiple events at discounted rates.',
  },
  {
    question: 'Can I participate in multiple events?',
    answer: 'Yes! Join as many events as you want, provided they don\'t have overlapping schedules.',
  },
  {
    question: 'Is accommodation available?',
    answer: 'Yes, we provide accommodation for outstation participants at a nominal cost. Limited slots on first-come basis.',
  },
  {
    question: 'What should I bring?',
    answer: 'Bring your college ID, registration confirmation, and event-specific requirements. Laptops allowed for coding events.',
  },
  {
    question: 'Are there prizes for winners?',
    answer: 'Yes! Over ₹10 Lakhs in prizes across all events. Winners receive cash prizes, certificates, and sponsor goodies.',
  },
  {
    question: 'How can I contact organizers?',
    answer: 'Email us at convolution@college.edu or DM us on Instagram @convolution2026 for quick responses.',
  },
  {
    question: 'Is food available at the venue?',
    answer: 'Yes, food stalls available throughout. Registered participants get discounted meal coupons.',
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Page title */}
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-script text-4xl md:text-5xl text-primary mb-2">
          Questions & Answers
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-px bg-primary/40" />
          <span className="text-primary/60">❓</span>
          <div className="w-12 h-px bg-primary/40" />
        </div>
      </motion.div>
      
      {/* FAQ accordion styled as old manuscript */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <motion.button
              className={`w-full text-left p-3 md:p-4 rounded-lg transition-all ${
                openIndex === index 
                  ? 'bg-gradient-to-r from-amber-100 to-amber-50 border-2 border-primary/40 shadow-md' 
                  : 'bg-gradient-to-r from-amber-50/50 to-transparent border border-amber-200/50 hover:border-amber-300/70'
              }`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              whileHover={{ x: 3 }}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Question indicator - quill style */}
                <span className="text-primary text-lg flex-shrink-0">❧</span>
                
                <p className="flex-1 font-display text-xs md:text-sm text-amber-900 font-medium leading-relaxed">
                  {faq.question}
                </p>
                
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </motion.div>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pl-8 border-t border-amber-200/50 mt-3">
                      {/* Decorative initial letter */}
                      <p className="font-body text-xs md:text-sm text-amber-800 leading-relaxed">
                        <span className="font-display text-2xl text-primary float-left mr-2 leading-none">
                          {faq.answer.charAt(0)}
                        </span>
                        {faq.answer.slice(1)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        ))}
      </div>
      
      {/* Bottom decoration */}
      <motion.div
        className="flex justify-center items-center gap-2 mt-4 pt-2 border-t border-amber-200/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-primary/40">✦</span>
        <p className="font-body text-[10px] text-amber-700/50 italic">
          Still have questions? Contact us!
        </p>
        <span className="text-primary/40">✦</span>
      </motion.div>
    </div>
  );
};

export default FAQPage;
