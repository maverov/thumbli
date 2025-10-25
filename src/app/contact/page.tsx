import "../globals.scss";
import { FAQs } from "@/components/FAQs";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Thumbli team! Reach out with feature requests, feedback, or bug reports at maverov.digital@gmail.com.",
  alternates: { canonical: "https://thumbli.net/contact" },
};

export default function ContactPage() {
  return (
    <main id="contact-top" className="mainContainer">
      <section className="buttonContainer">
        <BackButton>Back</BackButton>
      </section>

      <section className="card orange">
        <h1>Contact Us</h1>
        <p>
          Have feedback, found a bug, or got an idea for a new feature? We’d love to hear from you!
        </p>
        <p>
          Just drop us an email at{" "}
          <a
            href="mailto:maverov.digital@gmail.com"
            style={{ fontWeight: "600", textDecoration: "underline" }}
          >
            maverov.digital@gmail.com
          </a>{" "}
          — we read every message and usually reply within a day or two. ✉️
        </p>
        <p>
          Whether it’s a feature request, bug report, or just a friendly hello — your feedback helps make Thumbli better for everyone. 💚
        </p>
      </section>

      <div className={`card green`}>
        <FAQs />
      </div>
    </main>
  );
}
