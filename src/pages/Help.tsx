import { useState } from 'react';
import { HelpCircle, Shield, FileText, Mail, MessageSquare, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const faqs = [
  { question: 'What is ReCircle Market?', answer: 'ReCircle Market is a community-driven sustainable marketplace where members of a society can buy, sell, or giveaway items. It focus on reducing waste and improving local exchange.' },
  { question: 'Is it safe to meet sellers?', answer: 'ReCircle is designed for society-based exchange, meaning most transactions happen within your own gated community or nearby verified societies, making it significantly safer than general marketplaces.' },
  { question: 'How do I list an item for free?', answer: 'When listing an item on the "Sell" page, simply toggle the "List as Free" option. Free items are highlighted with a special "Free" tag and a "Giveaway" badge.' },
  { question: 'What are the delivery options?', answer: 'We offer three types of delivery: Society Pickup (you meet the neighbor), Platform Delivery (ReCircle handles it for a small fee), and Seller Managed.' },
];

const Help = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-display text-4xl font-bold text-foreground mb-4 text-center">How can we help?</h1>
        <p className="text-muted-foreground text-center mb-12 text-lg">Find answers to common questions or reach out to our team.</p>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4 cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground">{faq.question}</h3>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </div>
                {openFaq === i && <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <Shield className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-display font-bold text-xl text-foreground mb-2">Safety Guidelines</h3>
            <p className="text-muted-foreground text-sm mb-4">Learn about our verification process and how to stay safe during exchanges.</p>
            <button className="text-primary font-medium text-sm hover:underline">Read More</button>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <FileText className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-display font-bold text-xl text-foreground mb-2">Policies</h3>
            <p className="text-muted-foreground text-sm mb-4">Our community guidelines, privacy policy, and terms of service.</p>
            <button className="text-primary font-medium text-sm hover:underline">Read More</button>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 text-center">
          <h2 className="font-display text-2xl font-bold mb-2">Still have questions?</h2>
          <p className="opacity-90 mb-8">Our support team is available Mon-Fri, 9am - 6pm.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2"><Mail className="w-5 h-5" /> <span>support@recircle.market</span></div>
            <div className="flex items-center gap-2"><MessageSquare className="w-5 h-5" /> <span>Live Chat</span></div>
            <div className="flex items-center gap-2"><Phone className="w-5 h-5" /> <span>+91 91234 56789</span></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Help;
