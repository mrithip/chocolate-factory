import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-gray-900 mb-6">
            Privacy <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We are committed to protecting your privacy and personal information.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Effective: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
            <p className="text-gray-600 mb-4">
              At Chocolate Factory, we value your privacy and are committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website and use our services.
            </p>
            <p className="text-gray-600">
              Please read this privacy policy carefully. By using our website or services, you consent
              to the practices described here.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-800 mb-3">Personal Information</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Name, email address, phone number</li>
                  <li>• Shipping and billing addresses</li>
                  <li>• Payment information</li>
                  <li>• Account credentials</li>
                  <li>• Purchase history</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-800 mb-3">Non-Personal Information</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Browser type and version</li>
                  <li>• IP address and location data</li>
                  <li>• Device information</li>
                  <li>• Website usage patterns</li>
                  <li>• Cookies and tracking data</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Collect Information</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Directly from You</h3>
                  <p className="text-sm">When you register, place orders, contact us, or subscribe to our newsletter</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Through Technology</h3>
                  <p className="text-sm">Using cookies, web beacons, and similar tracking technologies</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">From Third Parties</h3>
                  <p className="text-sm">Including payment processors, delivery services, and analytics providers</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-l-4 border-indigo-600">
              <h3 className="font-semibold text-gray-800 mb-4">We use collected information to:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 🌟 Provide and improve our services</li>
                  <li>• 📦 Process and fulfill your orders</li>
                  <li>• 💳 Handle payments securely</li>
                  <li>• 📧 Send order confirmations and updates</li>
                  <li>• 🎯 Personalize your shopping experience</li>
                </ul>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 📱 Respond to your questions and concerns</li>
                  <li>• 📧 Send marketing communications (with consent)</li>
                  <li>• 🔒 Ensure security and prevent fraud</li>
                  <li>• 👥 Analyze usage patterns and improve our website</li>
                  <li>• 📊 Meet legal and regulatory requirements</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your
              information only in the following circumstances:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-green-800 mb-2">Service Providers</h3>
                <p className="text-sm text-green-700">Only for order fulfillment, payment processing, and delivery</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-800 mb-2">Legal Requirements</h3>
                <p className="text-sm text-blue-700">When required by law or to protect our rights</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-purple-800 mb-2">Business Transfers</h3>
                <p className="text-sm text-purple-700">In case of merger, acquisition, or sale of assets</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Security</h2>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border-l-4 border-emerald-600">
              <h3 className="font-semibold text-gray-800 mb-3">How We Protect Your Data:</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Encryption
                  </h4>
                  <p>SSL/TLS encryption for all data transmission</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Access Control
                  </h4>
                  <p>Strict access controls and regular security audits</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Regular Updates
                  </h4>
                  <p>Continuous security monitoring and updates</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Employee Training
                  </h4>
                  <p>Regular security awareness training</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookies and Tracking</h2>
            <div className="space-y-4 text-gray-600">
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>📊 Analyze website traffic and usage patterns</li>
                <li>🎯 Personalize your shopping experience</li>
                <li>💾 Remember your preferences and settings</li>
                <li>🔒 Ensure security and prevent fraud</li>
                <li>📢 Display relevant advertisements</li>
              </ul>
              <p>
                You can control cookies through your browser settings. However, disabling cookies
                may affect your experience on our website.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Rights and Choices</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200">
                <h3 className="font-semibold text-indigo-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Access
                </h3>
                <p className="text-sm text-indigo-700">Request a copy of the personal information we hold about you</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
                <h3 className="font-semibold text-emerald-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM10 6a1 1 0 011 1v3h2a1 1 0 110 2h-2v1a1 1 0 11-2 0v-1H7a1 1 0 110-2h2V7a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Rectification
                </h3>
                <p className="text-sm text-emerald-700">Correct inaccurate or incomplete personal information</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
                <h3 className="font-semibold text-red-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 5a2 2 0 00-2 2v6a2 2 0 002 2 2 2 0 002-2V7a2 2 0 00-2-2z" clipRule="evenodd" />
                  </svg>
                  Deletion
                </h3>
                <p className="text-sm text-red-700">Request deletion of your personal information</p>
              </div>
            </div>
            <p className="text-gray-600 mt-4">
              To exercise any of these rights, please contact us using the information provided below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Children's Privacy</h2>
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl border-l-4 border-pink-500">
              <h3 className="font-semibold text-gray-800 mb-3">Protecting Young Users</h3>
              <p className="text-gray-700 mb-4">
                Our services are not intended for children under 13 years of age. We do not knowingly
                collect personal information from children under 13.
              </p>
              <p className="text-gray-700 text-sm">
                If we become aware that we have collected personal information from a child under 13,
                we will take steps to delete such information promptly.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">International Data Transfers</h2>
            <p className="text-gray-600">
              Your information may be transferred to and processed in countries other than your own.
              We ensure that such transfers comply with applicable data protection laws and maintain
              appropriate safeguards to protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Retention</h2>
            <p className="text-gray-600">
              We retain your personal information only for as long as necessary to fulfill the purposes
              outlined in this Privacy Policy, unless a longer retention period is required or permitted
              by law. We securely delete or anonymize information when it is no longer needed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the "Effective" date. Your continued
              use of our services after any modifications indicates your acceptance of the updated policy.
            </p>
          </section>

          <section className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">📧 Email</h3>
                <p className="text-gray-600">privacy@chocolatefactory.com</p>
                <p className="text-gray-600">support@chocolatefactory.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">📞 Phone</h3>
                <p className="text-gray-600">+1 (555) 123-CHOC</p>
                <p className="text-gray-600">Mon-Fri: 9AM - 6PM EST</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-300">
              <h3 className="font-semibold text-gray-800 mb-3">✉️ Postal Address</h3>
              <p className="text-gray-600">
                Chocolate Factory<br />
                123 Sweet Street<br />
                Cocoa City, CC 12345<br />
                United States
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
