import { Link } from 'react-router-dom';
import { Recycle, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 eco-gradient rounded-lg flex items-center justify-center">
                <Recycle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">ReCircle Market</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-4">
              A smarter way to buy, sell & reuse within your community. Building sustainable communities through smart reuse.
            </p>
            <div className="space-y-2 text-sm opacity-70">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@recirclemarket.com</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 98765 43210</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> India</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2.5 text-sm opacity-70">
              <Link to="/" className="block hover:opacity-100 transition-opacity">Home</Link>
              <Link to="/buy" className="block hover:opacity-100 transition-opacity">Buy</Link>
              <Link to="/sell" className="block hover:opacity-100 transition-opacity">Sell</Link>
              <Link to="/categories" className="block hover:opacity-100 transition-opacity">Categories</Link>
              <Link to="/chat" className="block hover:opacity-100 transition-opacity">Chat</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold mb-4">Categories</h4>
            <div className="space-y-2.5 text-sm opacity-70">
              <Link to="/category/last-chance" className="block hover:opacity-100 transition-opacity">Last-Chance Essentials</Link>
              <Link to="/category/pre-owned" className="block hover:opacity-100 transition-opacity">Pre-Owned Exchange</Link>
              <Link to="/category/waste" className="block hover:opacity-100 transition-opacity">Waste to Value</Link>
              <Link to="/category/eco-made" className="block hover:opacity-100 transition-opacity">Eco-Made Store</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold mb-4">Support & Trust</h4>
            <div className="space-y-2.5 text-sm opacity-70">
              <Link to="/help" className="block hover:opacity-100 transition-opacity">Help & FAQs</Link>
              <Link to="/help" className="block hover:opacity-100 transition-opacity">Safety Guidelines</Link>
              <Link to="/help" className="block hover:opacity-100 transition-opacity">Privacy Policy</Link>
              <Link to="/help" className="block hover:opacity-100 transition-opacity">Terms & Conditions</Link>
              <Link to="/help" className="block hover:opacity-100 transition-opacity">Community Guidelines</Link>
              <Link to="/help" className="block hover:opacity-100 transition-opacity">Contact Support</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center text-sm opacity-60">
          <p>Building Sustainable Communities Through Smart Reuse</p>
          <p className="mt-1">© 2026 ReCircle Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
