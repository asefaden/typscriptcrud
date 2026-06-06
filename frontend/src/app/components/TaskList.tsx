'use client';
import { useState } from 'react';
import { Task } from '@/types';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: () => void;
}

export default function TaskList({ tasks, onTaskUpdated }: TaskListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // 🛑 ረዳት ፋንክሽን፦ ቶከኑን ከብሮውዘር ብቻ በደህና መሳቢያ
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  // የይዘት ማጠናቀቂያ (Checkbox) ማስተካከያ
  const toggleComplete = async (task: Task) => {
    await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}` // 👈 እዚህ ጋር getToken() ተጠቀምን
      },
      body: JSON.stringify({ isCompleted: !task.isCompleted }),
    });
    onTaskUpdated();
  };

  // የኤዲት ሁነታን ማስነሻ
  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  // የተስተካከለውን መረጃ ወደ ዳታቤዝ መላኪያ
   // የተስተካከለውን መረጃ ወደ ዳታቤዝ መላኪያ
  const saveEdit = async (id: number) => {
    if (!editTitle.trim()) return;

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ 
          title: editTitle, 
          description: editDescription 
          // እዚህ ጋር ቼክቦክሱን ባለበት እንዲቆይ ለማድረግ isCompleted አንልክም
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`ማስተካከል አልተቻለም፦ ${errorData.error || 'ስህተት'}`);
        return;
      }

      setEditingId(null); // የኤዲት ሳጥኑን መዝጊያ
      onTaskUpdated();    // ዋናውን ገጽ በንጽህና ማደሻ (Fetch)
    } catch (err) {
      console.error("ኤዲት ጥሪ ስህተት፦", err);
    }
  };

  // ተግባር ማጥፊያ
  const deleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` } // 👈 እዚህ ጋር getToken() ተጠቀምን
    });
    onTaskUpdated();
  };

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-slate-500 text-center py-4">ምንም የተግባር ዝርዝር የለም። አዲስ ይጨምሩ!</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="flex flex-col p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-md">
            
            {editingId === task.id ? (
              <div className="space-y-3 w-full">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
                <div className="flex space-x-2 justify-end">
                  <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-semibold transition">
                    ሰርዝ
                  </button>
                  <button onClick={() => saveEdit(task.id)} className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition">
                    አስቀምጥ
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => toggleComplete(task)}
                    className="mt-1 h-5 w-5 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500 cursor-pointer"
                  />
                  <div>
                    <h3 className={`font-semibold text-base ${task.isCompleted ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {task.title}
                    </h3>
                    {task.description && <p className="text-slate-400 text-xs mt-1">{task.description}</p>}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button onClick={() => startEditing(task)} className="bg-blue-500/10 hover:bg-blue-500 border border-blue-500/30 text-blue-400 hover:text-white text-xs px-3 py-1.5 rounded-lg transition duration-150">
                    አስተካክል
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="bg-red-500/10 hover:bg-red-500 border border-red-500/30 text-red-400 hover:text-white text-xs px-3 py-1.5 rounded-lg transition duration-150">
                    አጥፋ
                  </button>
                </div>
              </div>
            )}
            
          </div>
        ))
      )}
    </div>
  );
}
