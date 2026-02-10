import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, X, Recycle, User, ChevronDown, Package, Truck, MessageCircle, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, wishlist, isLoggedIn } = useCart();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/categories', label: 'Categories' },
    { to: '/sell', label: 'Sell' },
    { to: '/buy', label: 'Buy' },
    { to: '/chat', label: 'Chat', icon: <MessageCircle className="w-4 h-4" /> },
  ];

  const menuItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/delivery', label: 'Delivery Management', icon: <Truck className="w-4 h-4" /> },
    { to: '/cart', label: 'Cart', icon: <ShoppingCart className="w-4 h-4" /> },
    { to: '/wishlist', label: 'Wishlist', icon: <Heart className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 eco-gradient rounded-lg flex items-center justify-center">
              <Recycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground hidden sm:block">ReCircle Market</span>
          </Link>

          {/* Center Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${isActive(link.to) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                {link.icon}{link.label}
              </Link>
            ))}

            {/* List Menu */}
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1">
                <Package className="w-4 h-4" />
                More
                <ChevronDown className={`w-3 h-3 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>
              {menuOpen && (
                <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-xl shadow-xl py-2 min-w-[200px]">
                  {menuItems.map(item => (
                    <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      {item.icon}{item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:flex items-center bg-muted rounded-lg px-3 py-1.5">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search items..." className="bg-transparent border-none outline-none text-sm pl-2 w-32 lg:w-48 text-foreground placeholder:text-muted-foreground" />
            </div>

            <Link to="/wishlist" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-destructive fill-destructive' : 'text-muted-foreground'}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground rounded-full text-[10px] flex items-center justify-center font-bold">{wishlist.length}</span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 eco-gradient text-primary-foreground rounded-full text-[10px] flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </Link>

            {isLoggedIn ? (
              <Link to="/dashboard" className="p-2 rounded-lg hover:bg-muted">
                <User className="w-5 h-5 text-primary" />
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
                <Link to="/signup"><Button size="sm">Sign Up</Button></Link>
              </div>
            )}

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 py-4 space-y-1">
          <div className="flex items-center bg-muted rounded-lg px-3 py-2 mb-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input placeholder="Search items..." className="bg-transparent border-none outline-none text-sm pl-2 flex-1 text-foreground" />
          </div>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${isActive(link.to) ? 'bg-primary/10 text-primary' : 'text-foreground'}`}>
              {link.label}
            </Link>
          ))}
          {menuItems.map(item => (
            <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground">
              {item.icon}{item.label}
            </Link>
          ))}
          {!isLoggedIn && (
            <div className="flex gap-2 pt-3 border-t border-border">
              <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full" size="sm">Login</Button>
              </Link>
              <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button className="w-full" size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
