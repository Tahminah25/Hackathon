import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Mail, Lock, ShieldCheck, ArrowLeft, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useCart();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep(2);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    login('John Doe', email, 'Green Valley Apartments');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-10 h-10 eco-gradient rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter text-foreground">ReCircle</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your society marketplace</p>
        </div>

        <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleSendOtp} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="name@example.com" className="pl-10 h-12" required value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 text-lg">Send Login Code <ArrowRight className="w-5 h-5 ml-2" /></Button>
              </motion.form>
            ) : (
              <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleVerify} className="space-y-6">
                <button onClick={() => setStep(1)} type="button" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline mb-2">
                  <ArrowLeft className="w-4 h-4" /> Change Email
                </button>
                <div className="space-y-4">
                  <Label>Verification Code</Label>
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
                  <p className="text-xs text-muted-foreground text-center">We've sent a 4-digit code to {email}</p>
                </div>
                <Button type="submit" className="w-full h-12 text-lg">Verify & Login <ShieldCheck className="w-5 h-5 ml-2" /></Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center mt-8 text-muted-foreground">
          Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Join your society</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
