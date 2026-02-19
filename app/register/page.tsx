"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase'; 
import { Mail, Lock, User, Briefcase, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    jobInterest: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. สร้างบัญชีในระบบ Authentication ของ Supabase
      // ขั้นตอนนี้จะสร้าง User ในตาราง auth.users
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        throw authError;
      }

      // 2. ถ้าสร้างบัญชีสำเร็จ ให้บันทึกข้อมูลส่วนตัวลงตาราง public.profiles
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: authData.user.id, // ใช้ ID เดียวกับที่ Auth สร้างให้
              full_name: formData.fullName, 
              email: formData.email, 
              job_interest: formData.jobInterest 
            }
          ]);

        if (profileError) {
          throw profileError;
        }

        alert("ลงทะเบียนสำเร็จ! คุณสามารถเข้าสู่ระบบได้ทันที");
        router.push('/login'); // ส่งไปหน้า Login
      }
    } catch (error: any) {
      alert("เกิดข้อผิดพลาด: " + (error.message || "ไม่สามารถลงทะเบียนได้"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
        <Link href="/login" className="flex items-center text-sm text-slate-500 hover:text-blue-600 transition">
          <ArrowLeft size={16} className="mr-2" /> กลับไปหน้าเข้าสู่ระบบ
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-10 shadow-xl rounded-2xl border border-slate-100">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">สมัครสมาชิก</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ชื่อ-นามสกุล</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <User size={18} />
              </div>
              <input 
                type="text" 
                placeholder="สมชาย ใจดี"
                className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">อีเมล</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                placeholder="example@email.com" 
                className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">สายงานที่สนใจ</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Briefcase size={18} />
              </div>
              <input 
                type="text" 
                placeholder="เช่น Web Developer, Designer" 
                className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
                onChange={(e) => setFormData({...formData, jobInterest: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">รหัสผ่าน</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
                minLength={6}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition active:scale-95 flex justify-center items-center disabled:bg-slate-400"
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : "ลงทะเบียนบัญชี"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          มีบัญชีอยู่แล้ว? <Link href="/login" className="text-blue-600 font-semibold underline">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
}