import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('admin@system.local');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = await login(email, password);
    
    if (user.role === 'admin') navigate('/dashboard');
    else if (user.role === 'coordinator') navigate('/coordinator');
    else if (user.role === 'responder') navigate('/responder');
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Email Address</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          required 
        />
        <p className="text-xs text-muted-foreground mt-1">Hint: admin@, coordinator@, responder@</p>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          required 
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/20 transition-all disabled:opacity-70 flex justify-center items-center"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
      </button>

      <div className="text-center mt-6">
        <button type="button" onClick={() => navigate('/citizen')} className="text-sm text-primary hover:underline font-medium">
          Access Citizen Portal (Public)
        </button>
      </div>
    </form>
  );
}
