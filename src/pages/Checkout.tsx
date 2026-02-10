import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, CheckCircle, ArrowLeft, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/layout/Navbar';
import { useCart } from '@/context/CartContext';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const deliveryFee = cartTotal > 500 ? 0 : 40;
  const tax = Math.round(cartTotal * 0.05);
  const total = cartTotal + deliveryFee + tax;

  const handlePlaceOrder = () => {
    setStep(4);
    clearCart();
  };

  if (step === 4) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 eco-gradient rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-2">Order #RC-{Math.floor(Math.random() * 90000 + 10000)}</p>
        <p className="text-muted-foreground mb-8">Thank you for supporting sustainable shopping! You'll receive tracking details via email.</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
          <Button variant="outline" onClick={() => navigate('/buy')}>Continue Shopping</Button>
        </div>
      </div>
    </div>
  );

  if (cart.length === 0 && step !== 4) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate('/cart')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-8">
          {['Delivery', 'Payment', 'Confirm'].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i + 1 <= step ? 'eco-gradient text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{i + 1}</div>
              <span className={`text-sm ${i + 1 <= step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{s}</span>
              {i < 2 && <div className={`w-12 h-0.5 ${i + 1 < step ? 'eco-gradient' : 'bg-muted'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="font-display font-bold text-lg text-foreground">Delivery Address</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>Full Address</Label>
                    <Input placeholder="House/Flat No., Building Name" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>City</Label>
                    <Input placeholder="City" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>PIN Code</Label>
                    <Input placeholder="PIN Code" className="mt-1.5" />
                  </div>
                  <div className="col-span-2">
                    <Label>Phone Number</Label>
                    <Input placeholder="+91 98765 43210" className="mt-1.5" />
                  </div>
                </div>
                <Button onClick={() => setStep(2)} className="w-full" size="lg">Continue to Payment</Button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <h2 className="font-display font-bold text-lg text-foreground">Payment Method</h2>
                </div>
                {['upi', 'card', 'netbanking'].map(method => (
                  <button key={method} onClick={() => setPaymentMethod(method)}
                    className={`w-full text-left p-4 rounded-xl border transition-colors ${paymentMethod === method ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'}`}>
                    <span className="font-medium text-foreground capitalize">{method === 'upi' ? 'UPI' : method === 'card' ? 'Debit/Credit Card' : 'Net Banking'}</span>
                  </button>
                ))}
                {paymentMethod === 'upi' && (
                  <div>
                    <Label>UPI ID</Label>
                    <Input placeholder="yourname@upi" className="mt-1.5" />
                  </div>
                )}
                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2"><Label>Card Number</Label><Input placeholder="1234 5678 9012 3456" className="mt-1.5" /></div>
                    <div><Label>Expiry</Label><Input placeholder="MM/YY" className="mt-1.5" /></div>
                    <div><Label>CVV</Label><Input placeholder="***" className="mt-1.5" type="password" /></div>
                  </div>
                )}
                <Button onClick={() => setStep(3)} className="w-full" size="lg">Review Order</Button>
              </div>
            )}

            {step === 3 && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="font-display font-bold text-lg text-foreground">Review Your Order</h2>
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <img src={item.product.images[0]} alt={item.product.title} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.product.title}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-primary text-sm">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 p-3 eco-light-bg rounded-xl text-sm text-primary">
                  <Truck className="w-4 h-4" />
                  <span>Estimated delivery: 2-3 days</span>
                </div>
                <Button onClick={handlePlaceOrder} className="w-full" size="lg">Place Order • ₹{total.toLocaleString()}</Button>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24">
            <h3 className="font-display font-bold text-foreground mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Items ({cart.length})</span><span className="text-foreground">₹{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-foreground">{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span className="text-foreground">₹{tax}</span></div>
              <div className="border-t border-border pt-2 flex justify-between font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
