import "../globals.scss";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "Disclaimers",
  description:
    "Disclaimer for Thumbli — information provided is for general use only. Learn about our limitations, affiliate notices, and content responsibilities.",
  alternates: { canonical: "https://thumbli.net/disclaimer" },
};

export default function Disclaimer() {
  return (
    <main id="disclaimer-top" className="mainContainer">
      <section className="buttonContainer">
        <BackButton>Back</BackButton>
      </section>

      <section className="card green">
        <h1>Disclaimer for Thumbli</h1>

        <div className="contact-info">
          <p>
            This website is operated by: <br />
            <strong>Thumbli</strong>
            <br />
            Based in Sofia, Bulgaria
            <br />
            Contact Email:{" "}
            <a href="mailto:setupsheaventeam@gmail.com">
              setupsheaventeam@gmail.com
            </a>
          </p>
          <p className="important">Last updated: October 5, 2025</p>
        </div>

        <h2>1. General Disclaimer</h2>
        <p>
          The information provided by <strong>Thumbli</strong> (“we,” “us,” or
          “our”) on{" "}
          <Link href="https://thumbli.net" target="_blank" rel="noopener noreferrer">
            thumbli.net
          </Link>{" "}
          (the “Site”) is for general informational purposes only. All
          information on the Site is provided in good faith, however, we make no
          representation or warranty of any kind, express or implied, regarding
          the accuracy, adequacy, validity, reliability, or completeness of any
          information on the Site.
        </p>
        <p>
          <strong>
            UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY
            LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE
            SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE
            OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS
            SOLELY AT YOUR OWN RISK.
          </strong>
        </p>

        <h2>2. Professional Disclaimer</h2>
        <p>
          The Site does not provide any professional advice — including but not
          limited to legal, medical, or financial guidance. All content and
          tools (like the thumbnail fetcher) are provided for general
          informational and educational purposes only.
        </p>
        <ul>
          <li>
            <strong>Legal:</strong> We do not provide legal advice. Always
            consult with a qualified professional for specific concerns.
          </li>
          <li>
            <strong>Medical/Health:</strong> Thumbli does not provide medical
            advice or diagnostics.
          </li>
          <li>
            <strong>Financial:</strong> We do not provide financial planning or
            investment advice.
          </li>
        </ul>
        <p>
          Before taking any action based on information found here, you should
          consult with the appropriate professional. The use or reliance of any
          information contained on this Site is solely at your own risk.
        </p>

        <h2>3. External Links Disclaimer</h2>
        <p>
          The Site may contain links to external websites or third-party content
          such as YouTube, Twitch, Dailymotion, BitChute, or Rumble. These links
          are provided for convenience only and are not under our control. We do
          not guarantee the accuracy, relevance, timeliness, or completeness of
          any information found on these external sites.
        </p>

        <h2>4. Affiliate/Advertising Disclaimer</h2>
        <p>
          The Site may display ads through <strong>Google AdSense</strong> or
          similar advertising programs. These ads help keep the service free. We
          do not endorse or control the products or services shown in these ads.
          Clicking on an ad may result in a small commission to us at{" "}
          <strong>no extra cost to you</strong>.
        </p>
        <p>
          For details on how ads and cookies work, please see our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>

        <h2>5. Errors and Omissions Disclaimer</h2>
        <p>
          While every effort has been made to ensure the accuracy of the
          information provided on this Site, <strong>Thumbli</strong> assumes no
          responsibility for errors, omissions, or results obtained from the use
          of such information. All information is provided “as is,” without
          warranty of any kind — express or implied — including but not limited
          to warranties of performance, merchantability, or fitness for a
          particular purpose.
        </p>

        <h2>6. Fair Use Disclaimer</h2>
        <p>
          This Site may use publicly available media or copyrighted material
          from platforms like YouTube, Twitch, and others solely for
          informational, educational, and research purposes. We believe this
          qualifies as “fair use” under section 107 of the U.S. Copyright Law.
          If you are a copyright owner and believe your content is used
          improperly, please contact us for resolution.
        </p>

        <h2>7. Views Expressed Disclaimer</h2>
        <p>
          Any views or opinions expressed on this Site are personal and belong
          solely to the author. They do not represent the views of any
          affiliated organizations or advertisers.
        </p>

        <h2>8. Copyright Notice</h2>
        <p>© {new Date().getFullYear()} Thumbli. All Rights Reserved.</p>
      </section>
    </main>
  );
}
