import { Link } from 'react-router-dom';
import { Package, Truck, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const deliveries = [
  { id: 'DEL-001', product: 'Organic Whole Milk (1L)', status: 'Pickup Scheduled', date: 'Feb 10, 2026', type: 'Pickup', seller: 'Rahul Sharma' },
  { id: 'DEL-002', product: 'Recycled Paper Notebook Set', status: 'In Transit', date: 'Feb 9, 2026', type: 'Platform Delivery', seller: 'ReCircle Market' },
  { id: 'DEL-003', product: 'Wooden Study Table', status: 'Delivered', date: 'Feb 7, 2026', type: 'Seller Managed', seller: 'Sneha Roy' },
];

const Delivery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Delivery Management</h1>
        <p className="text-muted-foreground mb-8">Track and manage your deliveries</p>

        <div className="space-y-4">
          {deliveries.map(del => (
            <div key={del.id} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{del.product}</h3>
                  <p className="text-sm text-muted-foreground">From: {del.seller} • {del.id}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${del.status === 'Delivered' ? 'bg-primary/10 text-primary' : del.status === 'In Transit' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'}`}>
                  {del.status}
                </span>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2 mb-3">
                {['Confirmed', 'Picked Up', 'In Transit', 'Delivered'].map((step, i) => {
                  const active = del.status === 'Delivered' ? i <= 3 : del.status === 'In Transit' ? i <= 2 : i <= 0;
                  return (
                    <div key={step} className="flex items-center gap-2 flex-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 ${active ? 'eco-gradient text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {active ? <CheckCircle className="w-3 h-3" /> : i + 1}
                      </div>
                      {i < 3 && <div className={`h-0.5 flex-1 ${active ? 'eco-gradient' : 'bg-muted'}`} />}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Truck className="w-3 h-3" />{del.type}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{del.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Delivery;
