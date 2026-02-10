import { ArrowRight, Leaf, Recycle, TrendingDown, Users, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { products, categories, impactStats } from '@/data/mockData';
import { motion } from 'framer-motion';

const Index = () => {
  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80" 
            alt="Sustainable living" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20 mb-6">
              🌱 Your Local Eco-Marketplace
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              Shop Sustainably, <br />
              <span className="text-secondary">Save Locally.</span>
            </h1>
            <p className="text-xl opacity-90 max-w-xl mb-10 leading-relaxed">
              Join your society's private marketplace. Buy fresh, sell leftovers, 
              and giveaway items to neighbors. Reduce waste, one exchange at a time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/buy"><Button size="lg" className="h-14 px-8 text-lg rounded-xl">Start Shopping</Button></Link>
              <Link to="/sell"><Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl bg-white/5 border-white/30 hover:bg-white/10">List an Item</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Food Saved', value: impactStats.foodSaved, icon: <Leaf className="w-5 h-5" /> },
              { label: 'Items Reused', value: impactStats.itemsReused, icon: <Recycle className="w-5 h-5" /> },
              { label: 'CO₂ Reduced', value: impactStats.co2Reduced, icon: <TrendingDown className="w-5 h-5" /> },
              { label: 'Active Societies', value: impactStats.communitiesActive, icon: <Users className="w-5 h-5" /> },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-3">{stat.icon}</div>
                <h3 className="font-display text-2xl font-bold text-foreground">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-3">Explore Categories</h2>
              <p className="text-muted-foreground">Find everything you need right in your neighborhood</p>
            </div>
            <Link to="/categories"><Button variant="ghost" className="hover:gap-2 transition-all">All Categories <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((cat) => (
              <Link key={cat.id} to={`/category/${cat.id}`} className="group relative h-64 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-card transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-3xl mb-2 block">{cat.icon}</span>
                  <p className="text-sm font-medium text-secondary mb-1">{cat.subtitle}</p>
                  <h3 className="text-xl font-bold font-display">{cat.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-3">Recent Listings Near You</h2>
              <p className="text-muted-foreground">Freshly posted items in your society</p>
            </div>
            <Link to="/buy"><Button variant="ghost" className="hover:gap-2 transition-all">View All <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-primary rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10 flex-1 text-center md:text-left">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
                Ready to make a local <br /> difference today?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-10 max-w-lg mx-auto md:mx-0">
                Join 500+ neighbors in your society who are already saving money 
                and the planet with ReCircle Market.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link to="/signup"><Button size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-xl">Join Now</Button></Link>
                <Link to="/help"><Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-xl border-white/30 text-white hover:bg-white/10">Learn More</Button></Link>
              </div>
            </div>
            <div className="relative z-10 flex-1 flex justify-center">
              <div className="w-full max-w-sm aspect-square bg-white/10 backdrop-blur-3xl rounded-[40px] border border-white/20 p-8 rotate-3">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full eco-gradient flex items-center justify-center text-white"><ShoppingBag className="w-6 h-6" /></div>
                  <div><p className="font-bold text-white">Latest Sale</p><p className="text-white/60 text-sm">2 mins ago</p></div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 bg-white/20 rounded-full w-full" />
                  <div className="h-2 bg-white/20 rounded-full w-3/4" />
                  <div className="h-2 bg-white/20 rounded-full w-5/6" />
                </div>
                <div className="mt-8 pt-8 border-t border-white/10 flex justify-between">
                  <span className="text-white/60 text-sm">Impact</span>
                  <span className="text-secondary font-bold">2.4kg CO₂ Saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
