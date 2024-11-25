import React from 'react';
import { motion } from 'framer-motion';
import { School, Users, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PricingCard from '../components/pricing/PricingCard';

const schoolPlans = [
  {
    title: 'Basic School Plan',
    price: '¥1,500',
    period: 'student/year',
    description: 'Perfect for schools starting their SEL journey',
    features: [
      { text: 'Student & Teacher Dashboards', included: true },
      { text: 'Core SEL Activities', included: true },
      { text: 'Basic Analytics', included: true },
      { text: 'Standard Support', included: true },
      { text: 'Advanced Analytics', included: false },
      { text: 'Custom Content', included: false }
    ]
  },
  {
    title: 'Premium School Plan',
    price: '¥2,500',
    period: 'student/year',
    description: 'Advanced features for comprehensive SEL programs',
    features: [
      { text: 'Student & Teacher Dashboards', included: true },
      { text: 'Core SEL Activities', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Custom Content', included: true },
      { text: 'School System Integration', included: true }
    ],
    isPopular: true
  }
];

const familyPlans = [
  {
    title: 'Family Plan',
    price: '¥1,200',
    period: 'month',
    description: 'Great for families with up to 2 children',
    features: [
      { text: 'Access for 2 Children', included: true },
      { text: 'Parent Dashboard', included: true },
      { text: 'Personalized Activities', included: true },
      { text: 'Basic Support', included: true },
      { text: 'Advanced Progress Tracking', included: false },
      { text: 'Direct Educator Messaging', included: false }
    ]
  },
  {
    title: 'Family Plus Plan',
    price: '¥2,000',
    period: 'month',
    description: 'Perfect for larger families with up to 5 children',
    features: [
      { text: 'Access for 5 Children', included: true },
      { text: 'Parent Dashboard', included: true },
      { text: 'Personalized Activities', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Advanced Progress Tracking', included: true },
      { text: 'Direct Educator Messaging', included: true }
    ],
    isPopular: true
  }
];

export default function PricingPage() {
  const [planType, setPlanType] = React.useState<'school' | 'family'>('school');
  
  const handleSelectPlan = () => {
    // Handle plan selection
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Choose the perfect plan for your school or family. All plans include a 30-day free trial.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Plan Type Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setPlanType('school')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors
              ${planType === 'school'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-purple-600 hover:bg-purple-50'
              }`}
          >
            <School className="w-5 h-5" />
            For Schools
          </button>
          <button
            onClick={() => setPlanType('family')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors
              ${planType === 'family'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-purple-600 hover:bg-purple-50'
              }`}
          >
            <Users className="w-5 h-5" />
            For Families
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {(planType === 'school' ? schoolPlans : familyPlans).map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        {/* Enterprise Section */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Need a Custom Solution?
                </h2>
                <p className="text-gray-600 max-w-xl">
                  We offer custom plans for larger organizations with specific needs. 
                  Contact our sales team to discuss your requirements.
                </p>
              </div>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white 
                  rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
              >
                Contact Sales
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'How does the free trial work?',
                a: 'You can try Kokoro Quest free for 30 days. No credit card required.'
              },
              {
                q: 'Can I switch plans later?',
                a: 'Yes, you can upgrade or downgrade your plan at any time.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards and bank transfers for school plans.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}