import { Heart, ShoppingCart, Clock, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/mockData';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard = ({ product, compact = false }: ProductCardProps) => {
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useCart();
  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[4/3]">
        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isFree && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">FREE</span>
          )}
          {product.isExpiringSoon && (
            <span className="bg-secondary text-secondary-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" /> Expiring Soon
            </span>
          )}
          {product.condition && (
            <span className="bg-card/90 backdrop-blur text-foreground text-xs font-medium px-2.5 py-1 rounded-full">{product.condition}</span>
          )}
        </div>

        {/* Wishlist */}
        <button onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className="absolute top-2 right-2 w-8 h-8 bg-card/90 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-transform">
          <Heart className={`w-4 h-4 ${wishlisted ? 'text-destructive fill-destructive' : 'text-muted-foreground'}`} />
        </button>
      </Link>

      {/* Content */}
      <div className={`p-3 ${compact ? '' : 'p-4'}`}>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
          <MapPin className="w-3 h-3" />{product.location}
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors">{product.title}</h3>
        </Link>
        
        {!compact && <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>}

        {product.expiryDate && (
          <p className="text-xs text-secondary font-medium mt-1">Expires: {new Date(product.expiryDate).toLocaleDateString()}</p>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-primary">
              {product.isFree ? 'Free' : `₹${product.price.toLocaleString()}`}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="w-3 h-3 fill-secondary text-secondary" />
            {product.seller.rating}
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <Button size="sm" className="flex-1 text-xs" onClick={() => addToCart(product)}
            variant={inCart ? 'outline' : 'default'}>
            <ShoppingCart className="w-3 h-3 mr-1" />
            {inCart ? 'In Cart' : 'Add to Cart'}
          </Button>
          <Link to={`/product/${product.id}`} className="flex-1">
            <Button size="sm" variant="outline" className="w-full text-xs">Buy Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
