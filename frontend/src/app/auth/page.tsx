'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin ? { email, password } : { name, email, password };

        try {
      // 🛑 ማስተካከያ፦ 'http://localhost:5000' የሚለውን ሙሉ በሙሉ ያጥፉት
      // endpoint የሚለው ራሱ '/api/auth/login' ስለሚሆን በቀጥታ እሱን ብቻ ይጥሩ
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'ስህተት ተከስቷል');

      if (isLogin) {
        // ቶከኑን እና የተጠቃሚውን መረጃ በብሮውዘር ውስጥ ማስቀመጥ
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // ወደ ዋናው ዳሽቦርድ ማሻገሪያ
        router.push('/');
      } else {
        setIsLogin(true);
        alert('ምዝገባው ተሳክቷል! አሁን መግባት ይችላሉ።');
      }
    } catch (err: any) {
      setError(err.message);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 text-white">
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          {isLogin ? 'እንኳን ደህና መጡ' : 'አዲስ አካውንት መክፈቻ'}
        </h2>
        {error && <p className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg text-sm mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-sm font-semibold block mb-1 text-slate-300">ሙሉ ስም</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" required />
            </div>
          )}
          <div>
            <label className="text-sm font-semibold block mb-1 text-slate-300">ኢሜይል</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" required />
          </div>
          <div>
            <label className="text-sm font-semibold block mb-1 text-slate-300">ፓስወርድ</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" required />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg transition duration-200 mt-6">
            {isLogin ? 'ግባ' : 'ተመዝገብ'}
          </button>
        </form>
        <p className="text-center text-sm text-slate-400 mt-6">
          {isLogin ? 'አካውንት የለዎትም? ' : 'አካውንት አለዎት? '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-400 hover:underline font-bold">
            {isLogin ? 'ተመዝገብ' : 'ግባ'}
          </button>
        </p>
      </div>
    </div>
  );
}
