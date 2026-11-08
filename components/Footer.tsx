
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);

  const closeAllModals = () => {
    setIsPrivacyOpen(false);
    setIsTermsOpen(false);
    setIsShippingOpen(false);
  };

  const modalClasses =
    "fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4";

  const contentClasses =
    "bg-[#FAF7F0] text-[#173D32] max-w-lg w-full max-h-[80vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-[#E9E4D9] shadow-2xl relative";

  const closeButtonClasses =
    "absolute top-5 right-5 p-2 rounded-full bg-[#E9E4D9] text-[#173D32] hover:bg-[#DCD4C5] transition";

  const headingClasses =
    "text-xl font-black mb-1";

  const sectionClasses =
    "space-y-4 text-xs leading-relaxed text-[#455348]";

  return (
    <footer className="bg-[#10291F] text-white/70 py-12 px-4 sm:px-6 font-sans">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* STORE POLICIES & GUARANTEE */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-white/10 text-left">

          <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#E7C994] mb-1.5">
              Non-Returnable Policy
            </h4>

            <p className="text-[11px] leading-relaxed text-white/80">
              This item is non-returnable. However, if the item arrives
              damaged or defective, you may request a refund.
            </p>
          </div>

          <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#E7C994] mb-1.5">
              Customer Service & Returns
            </h4>

            <p className="text-[11px] leading-relaxed text-white/80">
              Orders are processed promptly. If you encounter any
              defects or damage upon arrival, contact our support
              team with your order details for assistance.
            </p>
          </div>

        </div>

        {/* NAVIGATION & SOCIAL LINKS */}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* BRANDING */}

          <div className="text-center sm:text-left">

            <Link href="/" className="text-xl font-black text-white">
              Festive<span className="text-[#D5B77B]">Vault</span>
            </Link>

            <p className="text-xs text-white/60 mt-1">
              Christmas Made Wearable. 🎄
            </p>

          </div>

          {/* POLICY LINKS */}

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-white/80">

            <button
              type="button"
              onClick={() => setIsShippingOpen(true)}
              className="hover:text-[#D5B77B] transition underline-offset-4 hover:underline"
            >
              Shipping, Returns & Refunds
            </button>

            <span className="text-white/30">·</span>

            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-[#D5B77B] transition underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>

            <span className="text-white/30">·</span>

            <button
              type="button"
              onClick={() => setIsTermsOpen(true)}
              className="hover:text-[#D5B77B] transition underline-offset-4 hover:underline"
            >
              Terms of Service
            </button>

          </div>

          {/* SOCIAL & MARKETPLACE ICONS */}

          <div className="flex items-center gap-4">

            <a
              href="https://www.ebay.com/usr/goodbuy-2022"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our eBay Store"
              title="Visit our eBay Store"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition hover:scale-110 overflow-hidden"
            >
              <img
                src="/ebay.jpeg"
                alt="eBay Store"
                className="w-full h-full object-cover"
              />
            </a>

            <a
              href="https://www.instagram.com/footballalbumtrivia/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              title="Follow us on Instagram"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition hover:scale-110 overflow-hidden"
            >
              <img
                src="/insta.jpeg"
                alt="Instagram"
                className="w-full h-full object-cover"
              />
            </a>

          </div>

        </div>

        {/* COPYRIGHT */}

        <div className="pt-6 border-t border-white/10 text-center text-[10px] text-white/40">
          © 2026 FestiveVault. All rights reserved.
        </div>

      </div>

      {/* SHIPPING, RETURNS & REFUNDS MODAL */}

      {isShippingOpen && (
        <div
          className={modalClasses}
          onClick={closeAllModals}
        >
          <div
            className={contentClasses}
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              onClick={() => setIsShippingOpen(false)}
              className={closeButtonClasses}
              aria-label="Close shipping policy"
            >
              <X size={18} />
            </button>

            <h3 className={headingClasses}>
              Shipping, Returns & Refunds
            </h3>

            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B2635] mb-5">
              FestiveVault Store Policy
            </p>

            <div className={sectionClasses}>

              <div>
  <strong className="text-[#173D32] block mb-1">
    Shipping Policy
  </strong>

  We aim to process and prepare orders as quickly as possible.
  Orders typically arrive within **5–10 business days**.
  Delivery times may vary depending on the destination,
  fulfillment process, and shipping carrier.

  Tracking information will be provided when available.
  Please ensure that your shipping address is correct
  when placing your order.
</div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  Returns Policy
                </strong>

                Our items are non-returnable. We do not accept returns
                for changes of mind or personal preference.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  Damaged or Defective Items
                </strong>

                If your item arrives damaged or defective, you may
                request a refund. Please contact our support team
                with your order details and clear photographs
                showing the issue.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  Refund Processing
                </strong>

                Refund requests will be reviewed individually.
                Approved refunds will be issued to the original
                payment method where possible.
              </div>

            </div>

          </div>
        </div>
      )}

      {/* PRIVACY POLICY MODAL */}

      {isPrivacyOpen && (
        <div
          className={modalClasses}
          onClick={closeAllModals}
        >
          <div
            className={contentClasses}
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              onClick={() => setIsPrivacyOpen(false)}
              className={closeButtonClasses}
              aria-label="Close privacy policy"
            >
              <X size={18} />
            </button>

            <h3 className={headingClasses}>
              Privacy Policy
            </h3>

            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B2635] mb-5">
              Effective November 2026
            </p>

            <div className={sectionClasses}>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  1. Information We Collect
                </strong>

                At FestiveVault, we respect your privacy.
                When you place an order, we may collect information
                such as your name, email address, shipping address,
                contact details, and order information.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  2. How We Use Your Information
                </strong>

                We use collected information to process orders,
                arrange shipping, communicate order updates,
                respond to customer inquiries, and improve
                our shopping experience.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  3. Payment Information
                </strong>

                Payments are processed through the payment
                providers offered at checkout. We do not intend
                to store full payment card details on our website.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  4. Sharing Your Information
                </strong>

                We do not sell customer personal information.
                We may share necessary information with trusted
                service providers, including payment processors,
                shipping carriers, and fulfillment partners,
                to complete your order.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  5. Cookies & Website Usage
                </strong>

                Our website may use cookies and similar technologies
                to support shopping cart functionality, remember
                preferences, and understand website usage.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  6. Data Security
                </strong>

                We take reasonable measures to protect personal
                information. However, no online system can guarantee
                complete security.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  7. Your Privacy Rights
                </strong>

                Depending on your location, you may have rights
                to access, correct, or request deletion of your
                personal information, subject to applicable laws.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  8. Contact
                </strong>

                For questions about this Privacy Policy or
                your personal information, please contact
                our customer support team.
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TERMS OF SERVICE MODAL */}

      {isTermsOpen && (
        <div
          className={modalClasses}
          onClick={closeAllModals}
        >
          <div
            className={contentClasses}
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              onClick={() => setIsTermsOpen(false)}
              className={closeButtonClasses}
              aria-label="Close terms of service"
            >
              <X size={18} />
            </button>

            <h3 className={headingClasses}>
              Terms of Service
            </h3>

            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B2635] mb-5">
              Effective November 2026
            </p>

            <div className={sectionClasses}>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  1. General Information
                </strong>

                By accessing or purchasing from FestiveVault,
                you agree to these Terms of Service.
                These terms apply to all visitors and customers
                using our website.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  2. Products & Descriptions
                </strong>

                We aim to provide accurate product descriptions,
                images, and pricing. Product colors may vary
                slightly depending on screen settings and
                production differences.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  3. Orders & Payments
                </strong>

                By placing an order, you confirm that the
                information provided is accurate and that
                you are authorized to use the selected
                payment method. Orders are subject to
                availability and acceptance.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  4. Shipping & Returns
                </strong>

                Shipping information and estimated delivery
                times are provided during checkout where available.
                Our items are non-returnable. However, if an item
                arrives damaged or defective, you may request
                a refund in accordance with our refund policy.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  5. Intellectual Property
                </strong>

                Website content, original designs, graphics,
                branding, and product descriptions may be
                protected by applicable intellectual property
                laws. Unauthorized reproduction or distribution
                is prohibited.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  6. Website Use
                </strong>

                You agree not to misuse our website, interfere
                with its operation, or attempt unauthorized
                access to our systems or services.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  7. Limitation of Liability
                </strong>

                To the extent permitted by applicable law,
                FestiveVault is not responsible for indirect
                or incidental losses arising from the use
                of our website or products. Nothing in these
                terms limits rights that cannot legally
                be excluded.
              </div>

              <div>
                <strong className="text-[#173D32] block mb-1">
                  8. Changes to These Terms
                </strong>

                We may update these Terms of Service when
                necessary. Updated terms will be published
                on this page.
              </div>

            </div>

          </div>
        </div>
      )}

    </footer>
  );
}
