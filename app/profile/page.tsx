"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Search, 
  FileUser, 
  Settings, 
  LogOut, 
  Loader2,
  UserCircle,
  Phone,
  Save
} from 'lucide-react';
import { supabase } from '@/lib/utils';

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({ full_name: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function getProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      // ดึงข้อมูลโปรไฟล์จากตาราง profiles
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (data) {
        setProfile({ 
          full_name: data.full_name || '', 
          phone: data.phone || '' 
        });
      }
      setLoading(false);
    }
    getProfile();
  }, [router]);

  const handleUpdate = async () => {
    setIsSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
      })
      .eq('id', session?.user.id);

    if (error) {
      alert("เกิดข้อผิดพลาด: " + error.message);
    } else {
      alert("อัปเดตโปรไฟล์สำเร็จ!");
    }
    setIsSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - ต้องมีเพื่อให้กดกลับหน้าอื่นได้ */}
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
            <h1 className="text-2xl font-bold text-slate-800">จัดการข้อมูลโปรไฟล์</h1>
            <p className="text-slate-500">แก้ไขข้อมูลส่วนตัวของคุณเพื่อให้บริษัทรู้จักคุณมากขึ้น</p>
          </header>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 space-y-6">
              {/* ชื่อ-นามสกุล */}
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <UserCircle size={18} className="mr-2 text-slate-400" />
                  ชื่อ-นามสกุล
                </label>
                <input 
                  type="text" 
                  value={profile.full_name} 
                  onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                  placeholder="กรุณากรอกชื่อ-นามสกุล"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* เบอร์โทรศัพท์ */}
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <Phone size={18} className="mr-2 text-slate-400" />
                  เบอร์โทรศัพท์
                </label>
                <input 
                  type="text" 
                  value={profile.phone} 
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  placeholder="เช่น 081-234-5678"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* ปุ่มบันทึก */}
              <button 
                onClick={handleUpdate} 
                disabled={isSaving}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center shadow-lg shadow-blue-100 disabled:bg-blue-300"
              >
                {isSaving ? (
                  <Loader2 className="animate-spin mr-2" size={20} />
                ) : (
                  <Save className="mr-2" size={20} />
                )}
                บันทึกการเปลี่ยนแปลง
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// NavItem Component เหมือนกับในหน้า Dashboard เพื่อความต่อเนื่อง
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