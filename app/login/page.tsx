"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowLeft, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ปรับมาเรียก API Route แทนการเรียก Supabase โดยตรงที่หน้าบ้าน
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // ล็อกอินสำเร็จ -> ไปหน้า Dashboard
        router.push('/dashboard');
        router.refresh(); // เพื่อให้อัปเดตสถานะ Auth ทั่วทั้งแอป
      } else {
        // แสดงข้อความผิดพลาดจาก Server
        alert(result.error || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
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
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition active:scale-95 flex justify-center items-center disabled:bg-blue-300"
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