import { Link } from 'react-router-dom';
import { User, Package, Heart, MessageCircle, Star, Leaf, TrendingDown, Users, ArrowRight, ShoppingCart, BarChart3, Recycle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { impactStats, products } from '@/data/mockData';

const Dashboard = () => {
  const { user, wishlist, cart, isLoggedIn } = useCart();
  const listedItems = products.slice(0, 3);

  if (!isLoggedIn) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Login to Access Dashboard</h1>
        <p className="text-muted-foreground mb-6">Sign in to view your profile, orders, and community impact</p>
        <Link to="/login"><Button size="lg">Login <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 eco-gradient rounded-2xl flex items-center justify-center text-primary-foreground font-display font-bold text-2xl">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold text-foreground">{user?.name || 'User'}</h1>
            <p className="text-muted-foreground">{user?.email} • {user?.society}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="text-sm font-medium text-foreground">4.8 rating</span>
              <span className="text-sm text-muted-foreground ml-2">Member since Feb 2026</span>
            </div>
          </div>
          <Link to="/sell"><Button>List an Item <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Listings', value: '3', icon: <Package className="w-5 h-5" />, color: 'bg-primary/10 text-primary' },
            { label: 'In Cart', value: cart.length.toString(), icon: <ShoppingCart className="w-5 h-5" />, color: 'bg-secondary/10 text-secondary' },
            { label: 'Wishlist', value: wishlist.length.toString(), icon: <Heart className="w-5 h-5" />, color: 'bg-destructive/10 text-destructive' },
            { label: 'Active Chats', value: '4', icon: <MessageCircle className="w-5 h-5" />, color: 'bg-accent/10 text-accent' },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${stat.color}`}>{stat.icon}</div>
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Community Impact Dashboard */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground">Community Impact Dashboard</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Total Food Saved', value: impactStats.foodSaved, icon: <Leaf className="w-4 h-4" /> },
                { label: 'Items Reused', value: impactStats.itemsReused, icon: <Recycle className="w-4 h-4" /> },
                { label: 'Waste Recycled', value: impactStats.wasteRecycled, icon: <TrendingDown className="w-4 h-4" /> },
                { label: 'CO₂ Emissions Reduced', value: impactStats.co2Reduced, icon: <TrendingDown className="w-4 h-4" /> },
                { label: 'Communities Active', value: impactStats.communitiesActive.toString(), icon: <Users className="w-4 h-4" /> },
                { label: 'Your CO₂ Saved', value: '12.5 kg', icon: <Leaf className="w-4 h-4" /> },
              ].map((stat, i) => (
                <div key={i} className="eco-light-bg rounded-xl p-4">
                  <div className="flex items-center gap-2 text-primary mb-1">{stat.icon}<span className="text-xs font-medium">{stat.label}</span></div>
                  <p className="font-display font-bold text-lg text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* My Listings */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-foreground">My Listings</h2>
              <Link to="/sell" className="text-sm text-primary font-medium hover:underline">Add New</Link>
            </div>
            <div className="space-y-4">
              {listedItems.map(item => (
                <Link key={item.id} to={`/product/${item.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                  <img src={item.images[0]} alt={item.title} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.postedAt}</p>
                  </div>
                  <span className="font-display font-bold text-primary text-sm">
                    {item.isFree ? 'Free' : `₹${item.price}`}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-card border border-border rounded-2xl p-6 mt-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Order History</h2>
          <div className="text-center py-8 text-muted-foreground">
            <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No orders yet. Start shopping to see your order history!</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
