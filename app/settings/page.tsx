"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Search, 
  FileUser, 
  Settings, 
  LogOut, 
  Lock, 
  ShieldCheck, 
  KeyRound,
  Loader2 
} from 'lucide-react';
import { supabase } from '@/lib/utils';

export default function SettingsPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      return alert("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
    }

    setIsUpdating(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    
    if (error) {
      alert("เกิดข้อผิดพลาด: " + error.message);
    } else {
      alert("เปลี่ยนรหัสผ่านสำเร็จ!");
      setNewPassword(''); // เคลียร์ช่อง Input
    }
    setIsUpdating(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - รักษาความต่อเนื่องของ UI */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">NextJob</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="หน้าแรก" href="/dashboard" />
          <NavItem icon={<Search size={20}/>} label="หางานใหม่" href="/search" />
          <NavItem icon={<FileUser size={20}/>} label="โปรไฟล์" href="/profile" />
          <NavItem icon={<Settings size={20}/>} label="ตั้งค่า" href="/settings" />
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-slate-600 hover:text-red-600 transition">
            <LogOut size={20} className="mr-3" /> ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">การตั้งค่า</h1>
            <p className="text-slate-500">จัดการความเป็นส่วนตัวและความปลอดภัยของบัญชีคุณ</p>
          </header>

          <div className="space-y-6">
            {/* ส่วนเปลี่ยนรหัสผ่าน */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 flex items-center bg-slate-50/50">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">ความปลอดภัยของบัญชี</h3>
                  <p className="text-sm text-slate-500">เปลี่ยนรหัสผ่านเพื่อความปลอดภัย</p>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password" 
                    value={newPassword}
                    placeholder="ป้อนรหัสผ่านใหม่" 
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleChangePassword} 
                  disabled={isUpdating || !newPassword}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition flex items-center justify-center disabled:bg-slate-300 shadow-lg shadow-slate-200"
                >
                  {isUpdating ? (
                    <Loader2 className="animate-spin mr-2" size={18} />
                  ) : (
                    <ShieldCheck className="mr-2" size={18} />
                  )}
                  อัปเดตรหัสผ่าน
                </button>
              </div>
            </div>

            {/* ส่วนข้อมูลแอปเพิ่มเติม (Optional) */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start">
              <ShieldCheck className="text-blue-600 mr-4 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-blue-900 text-sm">การเข้ารหัสแบบ End-to-End</h4>
                <p className="text-blue-700 text-xs mt-1 leading-relaxed">
                  ข้อมูลส่วนตัวและรหัสผ่านของคุณจะถูกเข้ารหัสและเก็บไว้อย่างปลอดภัยในระบบของ Supabase 
                  พนักงานของเราไม่สามารถเข้าถึงรหัสผ่านที่แท้จริงของคุณได้
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// NavItem สำหรับ Sidebar
function NavItem({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href}>
      <div className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition ${
        active ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-100'
      }`}>
        <span className="mr-3">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
}