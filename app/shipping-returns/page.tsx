export default function ShippingReturns() {
  return (
    <main className="min-h-screen bg-[#FAF7F0] text-[#252B25] px-5 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-[#173D32] mb-8">
          Shipping, Returns & Refunds
        </h1>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#173D32] mb-3">
            Shipping Policy
          </h2>
          <p className="leading-7 text-[#666]">
             We aim to process and prepare orders as quickly as possible.
  Orders typically arrive within **5–10 business days**.
  Delivery times may vary depending on the destination,
  fulfillment process, and shipping carrier.

  Tracking information will be provided when available.
  Please ensure that your shipping address is correct
  when placing your order.
          </p>
          <p className="leading-7 text-[#666] mt-3">
            Once your order has shipped, tracking information will be
            provided when available. Please ensure your shipping address
            is correct when placing your order.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#173D32] mb-3">
            Returns Policy
          </h2>
          <p className="leading-7 text-[#666]">
            Our products are non-returnable. We do not accept returns
            or exchanges for reasons such as a change of mind, incorrect
            size selection, or personal preference.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#173D32] mb-3">
            Refunds & Damaged Items
          </h2>
          <p className="leading-7 text-[#666]">
            If your item arrives damaged or defective, you may contact
            us to request a refund. Please provide your order details
            and clear photographs showing the issue.
          </p>
          <p className="leading-7 text-[#666] mt-3">
            Each request will be reviewed individually. Approved refunds
            will be processed to the original payment method.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#173D32] mb-3">
            Contact Us
          </h2>
          <p className="leading-7 text-[#666]">
            If you have questions about shipping, your order, or a
            damaged or defective product, please contact our customer
            support team.
          </p>
        </section>
      </div>
    </main>
  );
}