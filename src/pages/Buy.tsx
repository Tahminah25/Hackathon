import { useState } from 'react';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { products, categories } from '@/data/mockData';

const Buy = () => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [search, setSearch] = useState('');

  let filtered = [...products];
  if (selectedCat !== 'All') filtered = filtered.filter(p => p.category === selectedCat);
  if (search) filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
  if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered.sort((a, b) => b.seller.rating - a.seller.rating);
  if (sortBy === 'expiry') filtered = filtered.filter(p => p.expiryDate).sort((a, b) => new Date(a.expiryDate!).getTime() - new Date(b.expiryDate!).getTime());

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">Buy & Browse</h1>
        <p className="text-muted-foreground mb-8">All listings from your community and nearby societies</p>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search items, categories..."
            className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <button onClick={() => setSelectedCat('All')}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${selectedCat === 'All' ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:bg-muted'}`}>
            All
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${selectedCat === cat.id ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:bg-muted'}`}>
              {cat.icon} {cat.title}
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
              <option value="expiry">Expiring Soon</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{filtered.length} items found</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Buy;
