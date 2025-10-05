import "../globals.scss";

import Link from "next/link";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Thumbli respects your privacy. Learn how we handle data, cookies, and ads responsibly to keep your experience fast, safe, and transparent.",
  alternates: { canonical: "https://thumbli.com/privacy" },
};

export default function PrivacyPolicy() {
  return (
    <main id="privacy-policy-top" className="mainContainer">
      <section className="buttonContainer">
        <BackButton>Back</BackButton>
      </section>

      <section className="card green">
        <h1>Privacy Policy</h1>
        <p>
          <strong>Effective date:</strong> October 5, 2025
        </p>

        <p>
          At <strong>Thumbli</strong>, your privacy matters. This policy explains what information we do (and don’t)
          collect, how ads work on this site, and how you can control your data.
        </p>

        <h2>1. What data we collect</h2>
        <p>
          Thumbli does not require sign-ups, accounts, or logins. We do not collect, store, or log your pasted video
          links or downloaded thumbnails. All thumbnail generation happens directly in your browser —{" "}
          <strong>not on our servers</strong>.
        </p>

        <h2>2. Cookies, ads, and your choices</h2>
        <p>
          To keep Thumbli free, we show ads using <strong>Google AdSense</strong> and their ad partners. These
          third-party providers may use cookies and similar technologies (like device identifiers) to collect certain
          data (such as your IP address, device type, and interests) to deliver personalized or non-personalized ads and
          measure their performance.
        </p>

        <h3>Your ad choices and consent (GDPR/EEA users)</h3>
        <p>
          <strong>For users in the European Economic Area (EEA) and the UK</strong>, we are legally required to obtain
          your explicit consent before using cookies for personalized advertising. When you first visit, you will see a{" "}
          <strong>Consent Management Platform (CMP) banner</strong> asking for your choice. We will only serve
          personalized ads if you agree. You can change your consent choices at any time (see the link in the footer or
          your browser settings).
        </p>

        <p>
          Please note that Google and its partners act as <strong>independent data controllers</strong> for the data
          they collect through our site for advertising purposes. Learn more here:{" "}
          <Link href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            Google’s Partner Policy
          </Link>
          .
        </p>

        <p>
          You can also opt out of personalized advertising globally by visiting{" "}
          <Link href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
            Google Ad Settings
          </Link>{" "}
          or by disabling cookies in your browser settings.
        </p>

        <h2>3. Analytics</h2>
        <p>
          Thumbli may use lightweight, privacy-friendly analytics (such as anonymous page views) to understand site usage
          and improve performance. These analytics do not collect personal or identifying information.
        </p>

        <h2>4. External links</h2>
        <p>
          This site may include links to third-party websites (like YouTube, Twitch, Dailymotion, or others). We are not
          responsible for their content, privacy policies, or practices. Always review their terms if you follow a link.
        </p>

        <h2>5. Children’s privacy</h2>
        <p>
          Thumbli is not intended for children under 13 years of age. We do not knowingly collect data from children. If
          you believe a child has provided us with personal data, please contact us and we’ll remove it promptly.
        </p>

        <h2>6. Data security</h2>
        <p>
          We design Thumbli to process everything in your browser. No personal data, links, or images are stored on our
          end. Ad providers and third-party services operate under their own privacy and data policies.
        </p>

        <h2>7. Changes to this policy</h2>
        <p>
          We may occasionally update this Privacy Policy. Any changes will be posted on this page with an updated
          effective date.
        </p>

        <h2>8. Contact</h2>
        <p>For questions about this Privacy Policy or your privacy on Thumbli, please reach out:</p>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:setupsheaventeam@gmail.com" rel="noopener noreferrer">
              setupsheaventeam@gmail.com
            </a>
          </li>
          <li>
            Contact form: <Link href="/contact">Our Contact Page</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
