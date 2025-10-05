import styles from "./FAQs.module.scss";
import { faqs } from "@/data/faqs";

type Props = { limit?: number };

export default function FAQs({ limit }: Props) {
  const list = typeof limit === "number" ? faqs.slice(0, Math.max(0, limit)) : faqs;

  return (
    <section className={styles.faqSection} aria-labelledby="faq-title">
      <h2 id="faq-title">Frequently Asked Questions</h2>
      {list.map(({ id, question, answer }) => (
        <article key={id} style={{ marginBottom: "1.25rem" }}>
          <h3 style={{ marginBottom: "0.25rem" }}>{question}</h3>
          <p style={{ whiteSpace: "pre-line" }}>{answer}</p>
        </article>
      ))}
    </section>
  );
}