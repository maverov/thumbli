import "../globals.scss";

import BackButton from "@/components/BackButton";

export const metadata = {
  title: "Terms of Service",
  description:
    "Read Thumbli’s Terms of Service to understand your rights and responsibilities when using our free video thumbnail downloader.",
  alternates: { canonical: "https://thumbli.net/terms-of-service" },
};

export default function TermsOfService() {
  return (
    <main id="terms-of-service-top" className="mainContainer">
      <section className="buttonContainer">
        <BackButton>Back</BackButton>
      </section>
      <section className={`card green`}>
        <h1>Terms of Service</h1>
        <p><strong>Effective date:</strong> October 5, 2025</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using <strong>Thumbli</strong>, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you must not use this website.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          You must be at least 13 years old to use this service. By using Thumbli, you represent that you meet this age requirement.
        </p>

        <h2>3. Use of the Service</h2>
        <p>
          Thumbli allows you to view and download publicly available video thumbnails from supported platforms including YouTube, Twitch, Dailymotion, BitChute, Streamable, and Rumble. The service is provided for lawful, personal, and educational purposes only.
        </p>
        <p>
          You agree not to:
        </p>
        <ul>
          <li>Use the service for any illegal purpose or in violation of any laws</li>
          <li>Violate the intellectual property rights of content creators or platforms</li>
          <li>Attempt to interfere with, disrupt, or overload the service</li>
          <li>Use automated tools to scrape or access the service excessively</li>
          <li>Redistribute or commercially exploit thumbnails without proper authorization</li>
        </ul>

        <h2>4. Intellectual Property & Platform Compliance</h2>
        <p>
          All thumbnails belong to their respective copyright owners and platforms. Thumbli does not claim ownership of any content and does not grant you rights to use, reproduce, or distribute copyrighted material. You are solely responsible for ensuring your use complies with applicable copyright laws and the terms of service of third-party platforms.
        </p>

        <h2>5. Privacy & Data Collection</h2>
        <p>
          Thumbli does not collect, store, or transmit your video URLs or downloaded thumbnails. All processing occurs in your browser. This website uses Google AdSense for advertising, which may collect data and use cookies. See our <a href="/privacy">Privacy Policy</a> for details.
        </p>

        <h2>6. Advertising</h2>
        <p>
          This site displays advertisements through Google AdSense to provide free access. We do not control ad content and do not use deceptive practices such as pop-ups or forced clicks. Ad networks may collect data subject to their own privacy policies.
        </p>

        <h2>7. Disclaimer of Warranties</h2>
        <p>
          Thumbli is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee that the service will be uninterrupted, error-free, or secure.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Thumbli and its creator shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
        </p>
        <ul>
          <li>Your use or inability to use the service</li>
          <li>Any unauthorized access to or use of our servers</li>
          <li>Any bugs, viruses, or harmful code transmitted through the service</li>
          <li>Any content obtained from the service</li>
          <li>Any actions taken by third-party platforms regarding your use of downloaded thumbnails</li>
        </ul>

        <h2>9. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless Thumbli and its creator from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the service or violation of these Terms.
        </p>

        <h2>10. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to Thumbli at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
        </p>

        <h2>11. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of the service after changes constitutes acceptance of the revised Terms. Material changes will be noted by updating the &quot;Effective date&quot; above.
        </p>

        <h2>12. Governing Law</h2>
        <p>
          These Terms are governed by the laws of Bulgaria. Any disputes shall be resolved in the courts of Sofia, Bulgaria.
        </p>

        <h2>13. Contact</h2>
        <p>
          For questions about these Terms, contact us via our <a href="/contact">Contact</a> page.
        </p>
      </section>
    </main>
  );
}
