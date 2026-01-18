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
    answer: 'Click the "START GAME" button on our homepage to access the registration portal. Select your events, fill in your details, and complete the payment to secure your spot.',
  },
  {
    question: 'What is the registration fee?',
    answer: 'Registration fees vary by event. Individual events range from ₹100-₹500. We also offer combo packages for multiple events at discounted rates.',
  },
  {
    question: 'Can I participate in multiple events?',
    answer: 'Yes! You can participate in as many events as you want, as long as they don\'t have overlapping schedules. Check our timetable section for event timings.',
  },
  {
    question: 'Is there any accommodation available?',
    answer: 'Yes, we provide accommodation for outstation participants at a nominal cost. Limited slots available on a first-come-first-served basis.',
  },
  {
    question: 'What should I bring to the event?',
    answer: 'Bring your college ID, registration confirmation, and any event-specific requirements mentioned in the rules. For coding events, you may bring your own laptop.',
  },
  {
    question: 'Are there prizes for winners?',
    answer: 'Absolutely! We have prizes worth over ₹10 Lakhs across all events. Winners receive cash prizes, certificates, and exciting goodies from our sponsors.',
  },
  {
    question: 'How can I contact the organizers?',
    answer: 'Reach us at pixelate@college.edu or call our helpline numbers. You can also DM us on Instagram @pixelate2024 for quick responses.',
  },
  {
    question: 'Is food available at the venue?',
    answer: 'Yes, food stalls will be available throughout the fest with a variety of options. Registered participants get discounted meal coupons.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative z-10 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-arcade text-primary text-glow-yellow mb-4">
            HELP MENU
          </h2>
          <p className="text-sm text-muted-foreground">Frequently Asked Questions</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                className={`w-full text-left p-4 md:p-6 bg-card/50 backdrop-blur border-2 rounded-lg transition-all ${
                  openIndex === index 
                    ? 'border-primary shadow-[0_0_20px_rgba(255,255,0,0.3)]' 
                    : 'border-border hover:border-secondary'
                }`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Pac-Man indicator */}
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-6 h-6 rounded-full bg-primary flex-shrink-0"
                      style={{
                        clipPath: openIndex === index 
                          ? 'circle(50%)' 
                          : 'polygon(100% 50%, 75% 0%, 0% 0%, 0% 100%, 75% 100%)',
                      }}
                      animate={{
                        clipPath: openIndex === index 
                          ? 'circle(50%)' 
                          : [
                              'polygon(100% 50%, 75% 0%, 0% 0%, 0% 100%, 75% 100%)',
                              'polygon(100% 50%, 50% 25%, 0% 0%, 0% 100%, 50% 75%)',
                              'polygon(100% 50%, 75% 0%, 0% 0%, 0% 100%, 75% 100%)',
                            ],
                      }}
                      transition={{ duration: 0.4, repeat: openIndex === index ? 0 : Infinity }}
                    />
                    <span className="text-[10px] md:text-xs font-arcade text-foreground leading-relaxed">
                      {faq.question}
                    </span>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
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
                      <div className="pt-4 pl-9 border-t border-border mt-4">
                        {/* Dots trail */}
                        <div className="flex gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-primary/60"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                            />
                          ))}
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
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
          className="flex justify-center items-center gap-2 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-1">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary/40"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
              />
            ))}
          </div>
          <motion.div
            className="w-6 h-6 rounded-full bg-primary"
            style={{ clipPath: 'polygon(100% 50%, 75% 0%, 0% 0%, 0% 100%, 75% 100%)' }}
            animate={{
              clipPath: [
                'polygon(100% 50%, 75% 0%, 0% 0%, 0% 100%, 75% 100%)',
                'polygon(100% 50%, 50% 25%, 0% 0%, 0% 100%, 50% 75%)',
                'polygon(100% 50%, 75% 0%, 0% 0%, 0% 100%, 75% 100%)',
              ],
            }}
            transition={{ duration: 0.4, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
