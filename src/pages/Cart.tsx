import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart as CartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, isLoggedIn } = useCart();

  const deliveryFee = cartTotal > 500 ? 0 : 40;
  const tax = Math.round(cartTotal * 0.05);

  if (cart.length === 0) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <CartIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Browse items from your community and add them to cart</p>
        <Link to="/buy"><Button size="lg">Start Shopping <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">Shopping Cart ({cart.length} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="bg-card border border-border rounded-xl p-4 flex gap-4">
                <Link to={`/product/${item.product.id}`} className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                  <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`} className="font-semibold text-foreground hover:text-primary line-clamp-1">{item.product.title}</Link>
                  <p className="text-sm text-muted-foreground">{item.product.seller.society}</p>
                  <p className="font-display font-bold text-primary mt-1">
                    {item.product.isFree ? 'Free' : `₹${item.product.price.toLocaleString()}`}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24">
            <h3 className="font-display font-bold text-lg text-foreground mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">₹{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery Fee</span><span className="text-foreground">{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax (5%)</span><span className="text-foreground">₹{tax}</span></div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
                <span className="text-foreground">Total</span>
                <span className="text-primary">₹{(cartTotal + deliveryFee + tax).toLocaleString()}</span>
              </div>
            </div>
            <Link to={isLoggedIn ? '/checkout' : '/login'}>
              <Button className="w-full mt-6" size="lg">Proceed to Checkout <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
