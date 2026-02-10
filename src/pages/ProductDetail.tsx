import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ShoppingBag, Heart, ShieldCheck, Star, MapPin, Clock, Info, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { products } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, wishlist } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === id);
  const isWishlisted = wishlist.some(item => item.id === id);

  if (!product) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Product not found</h1>
      <Link to="/buy"><Button>Back to Shop</Button></Link>
    </div>
  );

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to results
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="aspect-square rounded-3xl overflow-hidden bg-muted">
              <img src={product.images[selectedImage]} alt={product.title} className="w-full h-full object-cover" />
            </motion.div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`relative w-24 h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${selectedImage === i ? 'border-primary' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">{product.category}</span>
              {product.isFree && <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-wider">Giveaway</span>}
            </div>
            
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">{product.title}</h1>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Price</span>
                <span className="font-display font-black text-4xl text-primary">
                  {product.isFree ? 'FREE' : `₹${product.price.toLocaleString()}`}
                </span>
              </div>
              <div className="h-10 w-px bg-border hidden sm:block" />
              <div className="hidden sm:flex flex-col text-sm">
                <span className="text-muted-foreground">Condition</span>
                <span className="text-foreground font-bold">{product.condition}</span>
              </div>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{product.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl">
                <Clock className="w-5 h-5 text-primary" />
                <div><p className="text-xs text-muted-foreground">Posted At</p><p className="text-sm font-bold text-foreground">{product.postedAt}</p></div>
              </div>
              {product.expiryDate && (
                <div className="flex items-center gap-3 p-4 bg-accent/5 border border-accent/20 rounded-2xl">
                  <Info className="w-5 h-5 text-accent" />
                  <div><p className="text-xs text-accent">Best Before</p><p className="text-sm font-bold text-accent">{product.expiryDate}</p></div>
                </div>
              )}
            </div>

            {/* Seller Card */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-8">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Seller Information</h3>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 eco-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {product.seller.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-foreground">{product.seller.name}</p>
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {product.seller.society}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-sm font-bold text-foreground"><Star className="w-4 h-4 fill-secondary text-secondary" /> {product.seller.rating}</div>
                  <p className="text-xs text-muted-foreground">42 deals</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-4">
              <div className="flex gap-4">
                <Button onClick={handleBuyNow} className="flex-1 h-14 text-lg rounded-xl" size="lg">Buy Now</Button>
                <Button onClick={handleAddToCart} variant="outline" className="h-14 w-14 p-0 rounded-xl"><ShoppingBag className="w-6 h-6" /></Button>
                <Button onClick={() => addToWishlist(product)} variant="outline" className={`h-14 w-14 p-0 rounded-xl ${isWishlisted ? 'text-destructive bg-destructive/5 border-destructive' : ''}`}><Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} /></Button>
              </div>
              <Link to="/chat"><Button variant="secondary" className="w-full h-14 text-lg rounded-xl flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" /> Chat with Seller
              </Link></Link>
            </div>
          </div>
        </div>

        {/* Impact Note */}
        <div className="mt-20 p-10 eco-light-bg rounded-[40px] text-center border border-primary/10">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Sustainability Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            By buying this item, you are preventing <span className="text-primary font-bold">1.2 kg of waste</span> 
            and reducing your CO₂ footprint by <span className="text-primary font-bold">0.8 kg</span> compared to buying new.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
