import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Mail, User, MapPin, ShieldCheck, ArrowLeft, Leaf, Building2, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    society: '',
    phone: ''
  });
  const [otp, setOtp] = useState(['', '', '', '']);

  const societies = ['Green Valley Apartments', 'Sunrise Heights', 'Palm Grove', 'Eco Park', 'Crystal Tower'];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData.name, formData.email, formData.society);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-10 h-10 eco-gradient rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter text-foreground">ReCircle</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Join Your Community</h1>
          <p className="text-muted-foreground">Start buying and selling with neighbors</p>
        </div>

        <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1.5 rounded-full transition-all ${s === step ? 'w-6 bg-primary' : 'w-1.5 bg-muted'}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleNext} className="space-y-5">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input placeholder="Enter your name" className="pl-10 h-12" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input type="email" placeholder="name@example.com" className="pl-10 h-12" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 text-md mt-4">Next Step <ArrowRight className="w-5 h-5 ml-2" /></Button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleNext} className="space-y-5">
                <div className="space-y-2">
                  <Label>Select Your Society</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                    <select required className="w-full h-12 rounded-xl border border-border bg-background pl-10 pr-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
                      value={formData.society} onChange={e => setFormData({ ...formData, society: e.target.value })}>
                      <option value="">Choose your building/society</option>
                      {societies.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input placeholder="+91 98765 43210" className="pl-10 h-12" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="h-12 w-12 p-0"><ArrowLeft className="w-5 h-5" /></Button>
                  <Button type="submit" className="flex-1 h-12 text-md">Verify Details <ArrowRight className="w-5 h-5 ml-2" /></Button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.form initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onSubmit={handleFinish} className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">One Last Step</h3>
                  <p className="text-sm text-muted-foreground">Enter the 4-digit code sent to your phone</p>
                </div>
                <div className="flex justify-between gap-3">
                  {otp.map((digit, i) => (
                    <Input key={i} type="text" maxLength={1} className="w-16 h-16 text-center text-2xl font-bold bg-muted border-none rounded-2xl" value={digit} onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[i] = e.target.value;
                      setOtp(newOtp);
                      if (e.target.value && e.target.nextSibling) (e.target.nextSibling as HTMLInputElement).focus();
                    }} />
                  ))}
                </div>
                <Button type="submit" className="w-full h-12 text-md">Create Account <ShieldCheck className="w-5 h-5 ml-2" /></Button>
                <button type="button" onClick={() => setStep(2)} className="w-full text-xs text-muted-foreground hover:text-primary transition-colors">Entered wrong details? Go Back</button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center mt-8 text-muted-foreground">
          Already a member? <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
