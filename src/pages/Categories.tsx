import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { categories } from '@/data/mockData';
import { motion } from 'framer-motion';

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">All Categories</h1>
        <p className="text-muted-foreground mb-10">Explore all types of items available on ReCircle Market</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link to={`/category/${cat.id}`}
                className="block group bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 h-full">
                <span className="text-5xl mb-4 block">{cat.icon}</span>
                <h2 className="font-display font-bold text-2xl text-foreground mb-1">{cat.title}</h2>
                <p className="text-primary font-medium mb-2">{cat.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed">{cat.description}</p>
                <div className="mt-4 flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
