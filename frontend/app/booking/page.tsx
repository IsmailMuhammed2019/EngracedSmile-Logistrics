'use client';

import { motion } from 'framer-motion';
import BookingForm from '@/components/booking/BookingForm';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      <Header />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Book Your Journey
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Quick and easy booking for all your transportation needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <BookingForm />
        </div>
      </section>

      {/* Service Options */}
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
              Choose Your Service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the perfect transportation option for your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Inter-State Transportation',
                description: 'Comfortable and reliable transportation between states with our fleet of Sienna vehicles.',
                icon: '🚐',
                features: ['Air Conditioning', 'WiFi', 'Comfortable Seats', 'Real-time Tracking'],
                price: 'From ₦5,000',
                popular: true
              },
              {
                title: 'Flight Booking',
                description: 'Book domestic and international flights with competitive prices and excellent service.',
                icon: '✈️',
                features: ['Best Prices', '24/7 Support', 'Flexible Booking', 'Instant Confirmation'],
                price: 'Best Rates Guaranteed',
                popular: false
              },
              {
                title: 'Luxury Car Rental',
                description: 'Premium executive and luxury vehicles for special occasions and business travel.',
                icon: '🚗',
                features: ['Premium Vehicles', 'Professional Drivers', 'Flexible Duration', 'Insurance Included'],
                price: 'From ₦25,000/day',
                popular: false
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-2 ${
                  service.popular ? 'border-primary-300 shadow-primary-100' : 'border-gray-100 hover:border-primary-300'
                }`}
              >
                {service.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-4xl mb-4 text-center">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
                <p className="text-gray-600 mb-6 text-center">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-primary-600">{service.price}</div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300">
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Fleet Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Vehicle Fleet
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our carefully maintained fleet of modern vehicles
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "Toyota Sienna",
                subtitle: "Inter-State Travel",
                price: "₦5,000",
                period: "per trip",
                capacity: "8 passengers",
                features: ["Air Conditioning", "WiFi Connectivity", "Entertainment System", "Professional Driver", "Luggage Space"],
                badge: "Most Popular",
                image: "/images/cars/sienna.webp"
              },
              {
                title: "Toyota Sienna Executive",
                subtitle: "Premium Inter-State",
                price: "₦12,000",
                period: "per trip",
                capacity: "8 passengers",
                features: ["Premium Interior", "Enhanced AC", "Leather Seats", "Professional Service", "Extra Comfort"],
                badge: "Executive",
                image: "/images/cars/sienna2.avif"
              },
              {
                title: "Toyota Sienna VIP",
                subtitle: "Luxury Experience",
                price: "₦18,000",
                period: "per trip",
                capacity: "7 passengers",
                features: ["VIP Interior", "Captain Chairs", "Premium Service", "Entertainment Suite", "Maximum Comfort"],
                badge: "Premium",
                image: "/images/cars/sienna3.avif"
              }
            ].map((vehicle, index) => (
              <motion.div
                key={vehicle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                      {vehicle.badge}
                    </span>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-xs font-medium text-gray-700">{vehicle.capacity}</span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{vehicle.title}</h3>
                    <p className="text-primary-600 font-medium">{vehicle.subtitle}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {vehicle.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{vehicle.price}</span>
                      <span className="text-gray-500 ml-1">/{vehicle.period}</span>
                    </div>
                    <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Process */}
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
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to book your perfect journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Route",
                description: "Select your departure and destination locations",
                icon: "📍"
              },
              {
                step: "2",
                title: "Select Date & Time",
                description: "Pick your preferred travel date and time",
                icon: "📅"
              },
              {
                step: "3",
                title: "Choose Vehicle",
                description: "Select from our fleet of comfortable vehicles",
                icon: "🚐"
              },
              {
                step: "4",
                title: "Confirm & Pay",
                description: "Review your booking and make secure payment",
                icon: "💳"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">{step.step}</span>
                  </div>
                  <div className="text-3xl mb-2">{step.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Book With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our premium features and services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Real-time Tracking', description: 'Track your vehicle in real-time with our advanced GPS system.', icon: '📍' },
              { title: 'Flexible Scheduling', description: 'Book your trips with flexible scheduling options.', icon: '📅' },
              { title: '24/7 Support', description: 'Round-the-clock customer support for all your needs.', icon: '🕐' },
              { title: 'Premium Service', description: 'Experience premium service with our professional team.', icon: '⭐' },
              { title: 'Secure Payments', description: 'Multiple secure payment options for your convenience.', icon: '🔒' },
              { title: 'Nationwide Coverage', description: 'Serving all major cities and states across Nigeria.', icon: '🌍' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-gray-50 p-6 rounded-lg hover:bg-primary-50 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
