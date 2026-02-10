import { useState } from 'react';
import { Camera, MapPin, Tag, Info, Trash2, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { categories, subcategories } from '@/data/mockData';

const Sell = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isFree, setIsFree] = useState(false);
  const [category, setCategory] = useState('');

  const handleImageUpload = () => {
    // Mock image upload
    setImages(prev => [...prev, 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80']);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">Sell an Item</h1>
        <p className="text-muted-foreground mb-10">Give your items a second life in your community</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2 space-y-8">
            <section className="bg-card border border-border rounded-[32px] p-8 space-y-6">
              <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" /> Item Details
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input placeholder="What are you selling?" className="h-12 border-border focus:ring-primary/20" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <select value={category} onChange={e => setCategory(e.target.value)}
                      className="w-full h-12 rounded-xl border border-border bg-background px-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                      <option value="">Select Category</option>
                      {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sub-category</Label>
                    <select className="w-full h-12 rounded-xl border border-border bg-background px-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                      <option value="">Select Sub-category</option>
                      {category && subcategories[category]?.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe the item condition, why you're selling, etc..." className="min-h-[120px] rounded-2xl border-border focus:ring-primary/20" />
                </div>

                <div className="space-y-2">
                  <Label>Condition</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {['New', 'Like New', 'Gently Used'].map(cond => (
                      <button key={cond} className="px-4 py-2 text-xs font-bold border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all uppercase tracking-wider">
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-card border border-border rounded-[32px] p-8 space-y-6">
              <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary" /> Pricing & Delivery
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 eco-gradient rounded-full flex items-center justify-center text-white"><Leaf className="w-5 h-5" /></div>
                    <div><p className="font-bold text-foreground">List for Free</p><p className="text-xs text-muted-foreground text-pretty">Give it away to a neighbor</p></div>
                  </div>
                  <button onClick={() => setIsFree(!isFree)} className={`w-12 h-6 rounded-full transition-colors relative ${isFree ? 'bg-primary' : 'bg-muted'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isFree ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>

                {!isFree && (
                  <div className="space-y-2">
                    <Label>Price (₹)</Label>
                    <Input type="number" placeholder="Enter amount" className="h-12 border-border focus:ring-primary/20" />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Delivery Options</Label>
                  <div className="space-y-3">
                    {[
                      { id: 'pickup', title: 'Society Pickup', desc: 'Buyer picks up from your building', icon: <MapPin className="w-4 h-4" /> },
                      { id: 'platform', title: 'Platform Delivery', desc: 'ReCircle picks up and delivers', icon: <ShieldCheck className="w-4 h-4 text-primary" /> },
                    ].map(opt => (
                      <div key={opt.id} className="flex items-center gap-3 p-4 border border-border rounded-2xl hover:bg-muted/50 cursor-pointer">
                        <div className="w-4 h-4 rounded-full border border-border" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-foreground flex items-center gap-2">{opt.icon} {opt.title}</p>
                          <p className="text-xs text-muted-foreground">{opt.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-[32px] p-6 sticky top-24">
              <h2 className="font-display text-lg font-bold text-foreground mb-4">Photos</h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {images.map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden relative group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button className="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3.3 h-3.3" />
                    </button>
                  </div>
                ))}
                {images.length < 4 && (
                  <button onClick={handleImageUpload} className="aspect-square border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all">
                    <Camera className="w-6 h-6 mb-2" />
                    <span className="text-xs font-medium">Add Photo</span>
                  </button>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground text-center mb-6">Up to 4 photos. Clear photos help items sell faster!</p>
              
              <Button className="w-full h-12 rounded-xl text-md font-bold" size="lg">List Item Now <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </div>

            <div className="p-6 eco-light-bg rounded-[32px] border border-primary/10">
              <h3 className="font-display font-bold text-primary mb-2 flex items-center gap-2"><Leaf className="w-4 h-4" /> Good to know</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                By selling locally, you're preventing CO₂ emissions from long-distance shipping. You are also helping your neighbors find items at better prices.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sell;
