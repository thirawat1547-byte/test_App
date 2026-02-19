// ...existing code...
"use client"; // สำคัญมาก: ต้องใส่บรรทัดนี้เพื่อใช้ useRouter และ useState

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// ...existing code...
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use Supabase auth to sign in with email + password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // show friendly error
        alert(error.message || 'ไม่สามารถเข้าสู่ระบบได้');
      } else if (data && data.session) {
        // Successful sign in -> redirect
        router.push('/dashboard');
      } else {
        alert('ไม่สามารถเข้าสู่ระบบได้ ลองอีกครั้ง');
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
        <Link href="/" className="flex items-center text-sm text-slate-500 hover:text-blue-600 transition cursor-pointer">
          <ArrowLeft size={16} className="mr-2" /> กลับสู่หน้าหลัก
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-10 shadow-xl rounded-2xl border border-slate-100">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8 text-nowrap">เข้าสู่ระบบ NextJob</h2>
        
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-slate-700">อีเมล</label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                placeholder="example@email.com" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">รหัสผ่าน</label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition active:scale-95 flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : "เข้าสู่ระบบ"}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-slate-600">
          ยังไม่มีบัญชี? <Link href="/register" className="text-blue-600 font-semibold underline">สมัครสมาชิก</Link>
        </p>
      </div>
    </div>
  );
}
// ...existing code...