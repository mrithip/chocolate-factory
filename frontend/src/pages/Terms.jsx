import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-gray-900 mb-6">
            Terms & <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Conditions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our services.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and placing an order with Chocolate Factory, you confirm that you are in agreement
              with and bound by the terms and conditions contained in the Terms & Conditions outlined below.
              These terms apply to the entire website and any email or other type of communication between you
              and Chocolate Factory.
            </p>
            <p className="text-gray-600">
              If you do not agree to these terms and conditions, you are not authorized to use this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. User Accounts</h2>
            <div className="space-y-3 text-gray-600">
              <p>When you create an account with us, you must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept all responsibilities for any and all activities that occur under your account</li>
                <li>Notify us immediately if you notice any unauthorized use of your account</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Product Information</h2>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-l-4 border-indigo-600">
              <p className="text-gray-700">
                We strive to display our products and their attributes as accurately as possible. However,
                we cannot guarantee that product descriptions, colors, images, or other content on this
                website are accurate, complete, reliable, current, or error-free.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Pricing and Payment</h2>
            <div className="space-y-4 text-gray-600">
              <p>All prices for our products are subject to change without notice.</p>
              <p>We accept the following payment methods:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Credit/Debit Cards</li>
                <li>UPI Payments</li>
                <li>Net Banking</li>
                <li>Digital Wallets</li>
                <li>Cash on Delivery (select areas only)</li>
              </ul>
              <p>Payment is processed securely through our payment gateway partners.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Shipping and Delivery</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We aim to deliver your order within the estimated delivery time. However, delays may occur
                due to circumstances beyond our control (e.g., weather, logistics issues, etc.).
              </p>
              <p>
                Shipping costs are calculated based on weight, destination, and delivery method selected.
                You will see the shipping cost breakdown during checkout.
              </p>
              <p>
                Risk of loss and title for items purchased pass to you upon delivery to the carrier.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Returns and Refunds</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                <h3 className="font-semibold text-gray-800 mb-3">What We Cannot Accept Returns For:</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Food items that have been opened or tampered with</li>
                  <li>• Perishable items past their shelf life</li>
                  <li>• Custom or personalized orders</li>
                  <li>• Items returned without original packaging</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-800 mb-3">Our Returns Process:</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Contact us within 30 days of receipt</li>
                  <li>• Items must be in original condition</li>
                  <li>• Refunds processed within 5-7 business days</li>
                  <li>• Free return shipping for defective items</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Food Safety & Storage</h2>
            <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-500">
              <h3 className="font-semibold text-gray-800 mb-3">Important Food Safety Guidelines:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-medium mb-2">Storage Instructions:</h4>
                  <ul className="space-y-1">
                    <li>• Keep chocolate in a cool, dry place</li>
                    <li>• Away from direct sunlight</li>
                    <li>• Ideal temperature: 18-22°C (64-72°F)</li>
                    <li>• Shelf life: 6-12 months from production</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Quality Guarantee:</h4>
                  <ul className="space-y-1">
                    <li>• All chocolates are freshly prepared</li>
                    <li>• No artificial preservatives</li>
                    <li>• Best before date clearly marked</li>
                    <li>• Made with natural ingredients</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-600">
              All content on this website including text, graphics, logos, images, and software is the
              property of Chocolate Factory or its content suppliers and protected by international copyright laws.
              The compilation of all content on this site is the exclusive property of Chocolate Factory.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              Chocolate Factory will not be liable for any indirect, special, incidental, or consequential
              damages arising out of the use or inability to use our products or services.
            </p>
            <p className="text-gray-600">
              Our total liability shall not exceed the amount paid for the product or service in question.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your
              use of our website and services, to understand our practices.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-blue-700 text-sm">
                <strong>Note:</strong> By using our services, you consent to the collection and use of your
                information as outlined in our Privacy Policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Governing Law</h2>
            <p className="text-gray-600">
              These terms and conditions are governed by and construed in accordance with the laws of
              the jurisdiction in which Chocolate Factory operates. Any disputes arising from these terms
              shall be resolved through arbitration or the appropriate courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to update these terms and conditions at any time. Changes will be
              posted on this page with an updated "last updated" date. Your continued use of our services
              after any modifications indicates your acceptance of the updated terms.
            </p>
          </section>

          <section className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            <div className="text-gray-600">
              <p><strong>Chocolate Factory Support</strong></p>
              <p>Email: legal@chocolatefactory.com</p>
              <p>Phone: +1 (555) 123-CHOC</p>
              <p>Address: 123 Sweet Street, Cocoa City, CC 12345</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
