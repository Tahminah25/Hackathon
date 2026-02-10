import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { products, categories, subcategories } from '@/data/mockData';

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSub, setSelectedSub] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('recent');

  const category = categories.find(c => c.id === id);
  const subs = subcategories[id || ''] || [];
  let filtered = products.filter(p => p.category === id);
  if (selectedSub !== 'All') filtered = filtered.filter(p => p.subcategory === selectedSub);

  if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered.sort((a, b) => b.seller.rating - a.seller.rating);

  if (!category) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground">Category not found</h1>
        <Link to="/categories"><Button className="mt-4">Browse Categories</Button></Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">{category.title}</h1>
              <p className="text-primary font-medium">{category.subtitle}</p>
            </div>
          </div>
          <p className="text-muted-foreground mt-2">{category.description}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" /> Filter:
          </div>
          <button onClick={() => setSelectedSub('All')}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${selectedSub === 'All' ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:bg-muted'}`}>
            All
          </button>
          {subs.map(sub => (
            <button key={sub} onClick={() => setSelectedSub(sub)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${selectedSub === sub ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:bg-muted'}`}>
              {sub}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="text-sm bg-card border border-border rounded-lg px-3 py-1.5 text-foreground">
              <option value="recent">Most Recent</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rating</option>
            </select>
          </div>
        </div>

        {/* Products */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📭</p>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">No items found</h3>
            <p className="text-muted-foreground">Be the first to list an item in this category!</p>
            <Link to="/sell"><Button className="mt-4">List an Item</Button></Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
