import { useState } from 'react';
import { Send, Image, MapPin, Search } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const conversations = [
  { id: '1', name: 'Rahul Sharma', society: 'Green Valley Apartments', avatar: 'RS', lastMessage: 'Is the milk still available?', time: '2 min ago', unread: 2 },
  { id: '2', name: 'Priya Patel', society: 'Sunrise Heights', avatar: 'PP', lastMessage: 'Can you do ₹30 for the vegetables?', time: '15 min ago', unread: 0 },
  { id: '3', name: 'Arjun Mehta', society: 'Sunrise Heights', avatar: 'AM', lastMessage: 'I can pick it up tomorrow evening', time: '1 hour ago', unread: 1 },
  { id: '4', name: 'Sneha Roy', society: 'Green Valley Apartments', avatar: 'SR', lastMessage: 'Great, deal! When can we meet?', time: '3 hours ago', unread: 0 },
];

const chatMessages = [
  { id: 1, sender: 'them', text: 'Hi! Is the organic milk still available?', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Yes, it is! Best before tomorrow though.', time: '10:32 AM' },
  { id: 3, sender: 'them', text: 'That\'s fine, I\'ll use it today. Can you do ₹20?', time: '10:33 AM' },
  { id: 4, sender: 'me', text: 'How about ₹22? It\'s organic after all 🌿', time: '10:35 AM' },
  { id: 5, sender: 'them', text: 'Deal! Can I pick it up from your building?', time: '10:36 AM' },
  { id: 6, sender: 'me', text: 'Sure, I\'m at Green Valley, Tower B. Come anytime before 6 PM.', time: '10:37 AM' },
  { id: 7, sender: 'them', text: 'Perfect, I\'ll be there around 4 PM. Thanks!', time: '10:38 AM' },
];

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { id: prev.length + 1, sender: 'me', text: message, time: 'Just now' }]);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-6">Messages</h1>

        <div className="bg-card border border-border rounded-2xl overflow-hidden h-[600px] flex">
          {/* Sidebar */}
          <div className="w-80 border-r border-border flex flex-col shrink-0 hidden md:flex">
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..." className="w-full bg-muted rounded-lg pl-9 pr-3 py-2 text-sm outline-none text-foreground placeholder:text-muted-foreground" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map(conv => (
                <button key={conv.id} onClick={() => setSelectedChat(conv)}
                  className={`w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-center gap-3 ${selectedChat.id === conv.id ? 'bg-muted' : ''}`}>
                  <div className="w-10 h-10 eco-gradient rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-foreground">{conv.name}</span>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 eco-gradient text-primary-foreground rounded-full text-[10px] flex items-center justify-center font-bold">{conv.unread}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Chat Features Info */}
            <div className="p-4 border-t border-border">
              <p className="text-xs text-muted-foreground font-medium mb-2">Chat Features:</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>💬 Real-time messaging</p>
                <p>💰 Price negotiation</p>
                <p>🚚 Delivery discussion</p>
                <p>📷 Image sharing</p>
                <p>📍 Location sharing</p>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-3">
              <div className="w-9 h-9 eco-gradient rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                {selectedChat.avatar}
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">{selectedChat.name}</p>
                <p className="text-xs text-muted-foreground">{selectedChat.society}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${msg.sender === 'me' ? 'eco-gradient text-primary-foreground' : 'bg-muted text-foreground'}`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border flex items-center gap-2">
              <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground"><Image className="w-5 h-5" /></button>
              <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground"><MapPin className="w-5 h-5" /></button>
              <input value={message} onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..." className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm outline-none text-foreground placeholder:text-muted-foreground" />
              <button onClick={handleSend}
                className="w-9 h-9 eco-gradient rounded-full flex items-center justify-center text-primary-foreground hover:scale-105 transition-transform">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
