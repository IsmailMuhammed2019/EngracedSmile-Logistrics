'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Image from 'next/image';

export default function FlightBookingPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header 
        title="Flight Booking" 
        variant="flight-booking"
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-white/20">
                ✈️ Flight Services
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Book Your Flights with Confidence
              </h1>
              <p className="text-lg text-blue-100 mb-8">
                Experience seamless flight booking with competitive prices and excellent service. 
                We partner with major airlines to bring you the best deals for both domestic and international travel.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✈️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Domestic Flights</h3>
                    <p className="text-sm text-blue-200">All major Nigerian cities</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">International</h3>
                    <p className="text-sm text-blue-200">Worldwide destinations</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Best Prices</h3>
                    <p className="text-sm text-blue-200">Competitive rates guaranteed</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🕐</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">24/7 Support</h3>
                    <p className="text-sm text-blue-200">Round-the-clock assistance</p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Book Flight Now
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/flight.jpg"
                  alt="Flight booking services"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Ready to Fly?</h3>
                  <p className="text-blue-200">Book your next adventure with us</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flight Booking Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Book Your Flight
            </h2>
            <p className="text-xl text-gray-600">
              Fill in your travel details and we'll find the best flight options for you
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select departure city</option>
                    <option>Lagos (LOS)</option>
                    <option>Abuja (ABV)</option>
                    <option>Kano (KAN)</option>
                    <option>Port Harcourt (PHC)</option>
                    <option>Enugu (ENU)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select destination city</option>
                    <option>Lagos (LOS)</option>
                    <option>Abuja (ABV)</option>
                    <option>Kano (KAN)</option>
                    <option>Port Harcourt (PHC)</option>
                    <option>Enugu (ENU)</option>
                    <option>London (LHR)</option>
                    <option>New York (JFK)</option>
                    <option>Dubai (DXB)</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>1 Passenger</option>
                    <option>2 Passengers</option>
                    <option>3 Passengers</option>
                    <option>4 Passengers</option>
                    <option>5+ Passengers</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trip Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Round Trip</option>
                    <option>One Way</option>
                    <option>Multi City</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Economy</option>
                    <option>Business</option>
                    <option>First Class</option>
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
              >
                Search Flights
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Discover amazing places to visit with our flight deals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { city: "Lagos", country: "Nigeria", price: "From ₦25,000", image: "/flight.jpg" },
              { city: "Abuja", country: "Nigeria", price: "From ₦30,000", image: "/flight.jpg" },
              { city: "London", country: "United Kingdom", price: "From ₦450,000", image: "/flight.jpg" },
              { city: "New York", country: "United States", price: "From ₦650,000", image: "/flight.jpg" },
              { city: "Dubai", country: "UAE", price: "From ₦350,000", image: "/flight.jpg" },
              { city: "Paris", country: "France", price: "From ₦500,000", image: "/flight.jpg" }
            ].map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48">
                  <Image
                    src={destination.image}
                    alt={`${destination.city}, ${destination.country}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{destination.city}</h3>
                    <p className="text-sm text-gray-200">{destination.country}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{destination.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative w-12 h-12">
                  <Image
                    src="/logo.png"
                    alt="Engraced Smile Logistics"
                    fill
                    className="object-contain"
                    sizes="48px"
                  />
                </div>
              </div>
              <p className="text-gray-400 mb-4">Premium flight booking and travel services</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Flight Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Domestic Flights</li>
                <li>International Flights</li>
                <li>Business Class</li>
                <li>Group Bookings</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>24/7 Customer Service</li>
                <li>Flight Changes</li>
                <li>Refund Policy</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400 mb-4">Get in touch for flight bookings</p>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors">
                Book Flight
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2024 Engraced Smile Logistics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
