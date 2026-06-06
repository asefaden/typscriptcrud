'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from '@/types';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const fetchTasks = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/auth');
      return;
    }

    try {
      const res = await fetch('/api/tasks', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });
      
      if (res.status === 401) {
        localStorage.clear();
        router.push('/auth');
        return;
      }
      
      const data = await res.json();
      if (Array.isArray(data)) setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (userStr && userStr !== "undefined") {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || user.email);
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/auth');
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white py-10 px-4">
      {/* የገጹ ከፍተኛ ስፋት (max-w) በደንብ እንዲዘረጋ ወደ 6xl አሳድገነዋል */}
      <div className="max-w-6xl mx-auto">
        
        {/* የራስጌ ክፍል (Header) */}
        <div className="flex justify-between items-center mb-8 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
          <div>
            <p className="text-slate-400 text-sm">እንኳን ደህና መጡ 👋</p>
            <h1 className="text-2xl font-bold text-blue-400">{userName}</h1>
          </div>
          <button onClick={handleLogout} className="bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/30 text-red-400 text-sm font-semibold px-4 py-2 rounded-xl transition duration-200">
            ውጣ (Logout)
          </button>
        </div>

        {/* 🛑 ማስተካከያ፦ በኮምፒውተር ስክሪን ላይ (md:) ጎን ለጎን 2 ኮለም እንዲሆን ማድረግ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* በግራ በኩል፦ አዲስ ተግባር ማከያ */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl sticky top-6">
            <h2 className="text-xl font-bold mb-4 text-emerald-400 border-b border-slate-700 pb-2">
              አዲስ ተግባር ማከያ
            </h2>
            <TaskForm onTaskAdded={fetchTasks} />
          </div>
          
          {/* በቀኝ በኩል፦ የተተገበሩ ተግባራት ዝርዝር */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl max-h-[70vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-bold mb-4 text-indigo-400 border-b border-slate-700 pb-2 flex justify-between items-center">
              <span>የተግባራት ዝርዝር</span>
              <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full font-semibold">
                {tasks.length} ጠቅላላ
              </span>
            </h2>
            <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
          </div>

        </div>

      </div>
    </main>
  );
}
