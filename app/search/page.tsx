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
  MapPin, 
  Loader2, 
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { supabase } from '@/lib/utils';

export default function SearchJobsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [applyingId, setApplyingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }

      // 1. ดึงข้อมูลงานจาก Database
      const { data: jobsData } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (jobsData) setJobs(jobsData);

      // 2. ดึงประวัติการสมัครเพื่อเช็คปุ่ม "สมัครแล้ว"
      const { data: apps } = await supabase
        .from('job_applications')
        .select('job_id')
        .eq('user_id', session.user.id);
      
      if (apps) setAppliedJobIds(apps.map(a => a.job_id));
      
      setLoading(false);
    }
    fetchData();
  }, [router]);

  const handleApply = async (job: any) => {
    setApplyingId(job.id);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) return router.push('/login');

    const { error } = await supabase
      .from('job_applications')
      .insert([{ 
        user_id: session.user.id, 
        job_id: job.id,
        job_title: job.title, 
        company_name: job.company 
      }]);

    if (!error) {
      setAppliedJobIds(prev => [...prev, job.id]);
      alert(`สมัครงานตำแหน่ง ${job.title} เรียบร้อยแล้ว!`);
    } else {
      alert("เกิดข้อผิดพลาด: " + error.message);
    }
    setApplyingId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - ใช้ตัวเดียวกับหน้าอื่นๆ */}
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
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900">ค้นหางานใหม่</h1>
            <p className="text-slate-500">โอกาสร่วมงานกับบริษัทชั้นนำรอคุณอยู่</p>
          </header>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="ตำแหน่งงาน, บริษัท, หรือทักษะ..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Job Cards */}
          <div className="grid gap-4">
            {filteredJobs.length > 0 ? filteredJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex justify-between items-center hover:border-blue-400 hover:shadow-md transition-all">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                  <div className="flex items-center gap-4 text-slate-500 text-sm mt-1">
                    <span className="font-medium text-slate-700">{job.company}</span>
                    <span className="flex items-center"><MapPin size={14} className="mr-1"/> {job.location}</span>
                  </div>
                  <div className="mt-3 inline-flex items-center bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                    <Briefcase size={12} className="mr-1" /> {job.salary}
                  </div>
                </div>

                {appliedJobIds.includes(job.id) ? (
                  <div className="flex items-center text-green-600 font-bold bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                    <CheckCircle size={18} className="mr-2" /> สมัครแล้ว
                  </div>
                ) : (
                  <button 
                    onClick={() => handleApply(job)}
                    disabled={applyingId === job.id}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md shadow-blue-100 disabled:bg-blue-300"
                  >
                    {applyingId === job.id ? "กำลังส่ง..." : "สมัครงาน"}
                  </button>
                )}
              </div>
            )) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 text-slate-400">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p>ไม่พบงานที่ตรงกับการค้นหาของคุณในขณะนี้</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

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