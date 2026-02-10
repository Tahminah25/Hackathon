import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  if (wishlist.length === 0) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-6">Save items you're interested in while browsing</p>
        <Link to="/buy"><Button size="lg">Explore Items <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">My Wishlist ({wishlist.length})</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <div key={product.id} className="bg-card border border-border rounded-2xl overflow-hidden group">
              <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden relative">
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <button onClick={(e) => { e.preventDefault(); removeFromWishlist(product.id); }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-destructive hover:scale-110 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.id}`} className="font-bold text-foreground line-clamp-1 hover:text-primary transition-colors">{product.title}</Link>
                <div className="flex items-center justify-between mt-4">
                  <p className="font-display font-bold text-primary">₹{product.price.toLocaleString()}</p>
                  <Button onClick={() => addToCart(product)} size="sm" className="h-8 px-3 text-xs gap-1">
                    <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
