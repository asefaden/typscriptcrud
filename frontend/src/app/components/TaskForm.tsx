'use client';
import React, { useState } from 'react';

interface TaskFormProps {
  onTaskAdded: () => void;
}

export default function TaskForm({ onTaskAdded }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // 🛑 ማስተካከያ፦ ቶከኑን በደህና መውሰጃ
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, description }),
    });

    setTitle('');
    setDescription('');
    onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-slate-300 text-sm font-medium mb-1">የተግባር ርዕስ</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" placeholder="ምን መስራት ይፈልጋሉ?..." required />
      </div>
      <div>
        <label className="block text-slate-300 text-sm font-medium mb-1">ዝርዝር መግለጫ (ከተፈለገ)</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" placeholder="ተጨማሪ ማብራሪያ..." rows={3} />
      </div>
      <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition duration-200 shadow-lg shadow-emerald-500/20">
        ተግባር ፍጠር
      </button>
    </form>
  );
}
