import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Chocolate Factory</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Passionate artisans crafting the world's finest chocolates since our humble beginnings
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded with a simple vision - to create chocolates that transcend mere confections and become
                moments of pure joy. What started as a small family workshop has grown into a beloved destination
                for chocolate lovers worldwide.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey began when our founder discovered the magical alchemy of combining the finest cocoa
                beans with traditional artisanal techniques. Each chocolate is a testament to our commitment to
                perfection and our unwavering passion for the craft.
              </p>
              <p className="text-gray-600">
                Today, we continue this legacy by sourcing the finest ingredients globally and maintaining
                traditional methods while embracing innovation in our artisanal process.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Premium Ingredients Only</h3>
                    <p className="text-gray-600 text-sm">Sourcing the finest cocoa beans and natural ingredients from trusted global partners</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Artisanal Craftsmanship</h3>
                    <p className="text-gray-600 text-sm">Master chocolatiers with decades of experience crafting each piece by hand</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Sustainable Practices</h3>
                    <p className="text-gray-600 text-sm">Committed to ethical sourcing, fair trade practices, and environmental responsibility</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Chocolate Journey</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every bite tells a story of passion, tradition, and innovation. Experience the difference
              that comes from decades of chocolate mastery and an unwavering commitment to perfection.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">50+</div>
                <div className="text-sm text-gray-600">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">25K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">200+</div>
                <div className="text-sm text-gray-600">Chocolate Varieties</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
