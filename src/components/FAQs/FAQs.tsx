import { useState } from "react";
import styles from "./FAQs.module.scss";
import { faqs } from "@/data/faqs";

type Props = { limit?: number };

export default function FAQs({ limit }: Props) {
  const list = typeof limit === "number" ? faqs.slice(0, Math.max(0, limit)) : faqs;
  const [openIds, setOpenIds] = useState<Set<number>>(new Set<number>(list.slice(0, 3).map(f => f.id)));

  const toggleFAQ = (id: number) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section className={styles.faqSection} aria-labelledby="faq-title">
      <h2 id="faq-title">Frequently Asked Questions</h2>
      {list.map(({ id, question, answer }) => {
        const isOpen = openIds.has(id);
        return (
          <article key={id} className={styles.faqItem}>
            <h3 onClick={() => toggleFAQ(id)} className={styles.question}>
              {question}
              <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
            </h3>
            <p className={`${styles.answer} ${!isOpen ? styles.hidden : ''}`}>{answer}</p>
          </article>
        );
      })}
    </section>
  );
}