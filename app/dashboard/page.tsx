"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // เพิ่ม usePathname สำหรับเช็คหน้าปัจจุบัน
import Link from 'next/link'; // เพิ่ม Link สำหรับการเปลี่ยนหน้าโดยไม่ Refresh
import { 
  LayoutDashboard, 
  Search, 
  FileUser, 
  Settings, 
  LogOut, 
  Briefcase,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [applyingId, setApplyingId] = useState<number | null>(null);
  const [appliedJobTitles, setAppliedJobTitles] = useState<string[]>([]);

  useEffect(() => {
    const checkUserAndData = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }

      // 1. ดึงชื่อโปรไฟล์จาก Supabase
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', session.user.id)
        .single();

      if (profile) setUserName(profile.full_name);

      // 2. ดึงประวัติการสมัครงาน
      const { data: applications } = await supabase
        .from('job_applications')
        .select('job_title')
        .eq('user_id', session.user.id);

      if (applications) {
        const titles = applications.map(app => app.job_title);
        setAppliedJobTitles(titles);
      }

      setLoading(false);
    };

    checkUserAndData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleApply = async (job: any) => {
    setApplyingId(job.id);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return router.push('/login');

      const { error } = await supabase
        .from('job_applications')
        .insert([
          { 
            user_id: session.user.id,
            job_title: job.title,
            company_name: job.company 
          }
        ]);

      if (error) throw error;

      setAppliedJobTitles(prev => [...prev, job.title]);
      alert(`ส่งใบสมัครตำแหน่ง ${job.title} เรียบร้อยแล้ว!`);
    } catch (error: any) {
      alert("เกิดข้อผิดพลาด: " + error.message);
    } finally {
      setApplyingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  const recommendedJobs = [
    { id: 1, title: 'Frontend Developer', company: 'Tech Innovate', location: 'Bangkok', salary: '฿45,000 - ฿60,000' },
    { id: 2, title: 'UX/UI Designer', company: 'Creative Studio', location: 'Sukhumvit', salary: '฿35,000 - ฿50,000' },
    { id: 3, title: 'Fullstack Engineer', company: 'Global Solutions', location: 'Silom', salary: '฿70,000+' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - ปรับปรุงให้คลิกได้และมีสี Active */}
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
      <main className="flex-1">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-200 uppercase">
            {userName.charAt(0) || 'U'}
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 text-white mb-8 shadow-lg shadow-blue-200">
            <h3 className="text-2xl font-bold mb-2">ยินดีต้อนรับกลับมา, คุณ{userName || 'ผู้ใช้งาน'}! 👋</h3>
            <p className="text-blue-100">ตรวจสอบและจัดการการสมัครงานของคุณได้ที่นี่</p>
          </div>

          <h3 className="text-lg font-bold mb-4 text-slate-800">งานแนะนำสำหรับคุณ</h3>
          <div className="space-y-4">
            {recommendedJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-400 transition shadow-sm flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900">{job.title}</h4>
                  <div className="flex items-center text-sm text-slate-500 mt-1">
                    <span className="mr-4 font-medium text-slate-700">{job.company}</span>
                    <span className="flex items-center"><Briefcase size={14} className="mr-1"/> {job.location}</span>
                  </div>
                  <p className="text-sm text-blue-600 font-bold mt-2">{job.salary}</p>
                </div>
                
                {appliedJobTitles.includes(job.title) ? (
                  <span className="flex items-center text-green-600 font-bold px-4 py-2 bg-green-50 rounded-lg border border-green-100">
                    <CheckCircle size={20} className="mr-2" /> สมัครแล้ว
                  </span>
                ) : (
                  <button 
                    onClick={() => handleApply(job)}
                    disabled={applyingId === job.id}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
                  >
                    {applyingId === job.id ? "กำลังส่ง..." : "สมัครงาน"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// คอมโพเนนต์เมนูย่อยที่รองรับ Link และสี Active
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