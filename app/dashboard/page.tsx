"use client";

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Search, 
  FileUser, 
  Settings, 
  LogOut, 
  Bell,
  Briefcase
} from 'lucide-react';

export default function DashboardPage() {
  // สมมติข้อมูลงานแนะนำ
  const recommendedJobs = [
    { id: 1, title: 'Frontend Developer', company: 'Tech Innovate', location: 'Bangkok (Remote)', salary: '฿45,000 - ฿60,000' },
    { id: 2, title: 'UX/UI Designer', company: 'Creative Studio', location: 'Sukhumvit', salary: '฿35,000 - ฿50,000' },
    { id: 3, title: 'Fullstack Engineer', company: 'Global Solutions', location: 'Silom', salary: '฿70,000+' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">NextJob</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="หน้าแรก" active />
          <NavItem icon={<Search size={20}/>} label="หางานใหม่" />
          <NavItem icon={<FileUser size={20}/>} label="โปรไฟล์/เรซูเม่" />
          <NavItem icon={<Settings size={20}/>} label="ตั้งค่า" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link href="/">
            <button className="flex items-center w-full px-4 py-2 text-slate-600 hover:text-red-600 transition">
              <LogOut size={20} className="mr-3" />
              ออกจากระบบ
            </button>
          </Link>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">แดชบอร์ดของคุณ</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-blue-600 relative">
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-200">
              S
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-5xl mx-auto">
          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 text-white mb-8 shadow-lg shadow-blue-200">
            <h3 className="text-2xl font-bold mb-2">ยินดีต้อนรับกลับมา, คุณสมชาย! 👋</h3>
            <p className="text-blue-100">วันนี้มีงานใหม่ที่ตรงกับทักษะของคุณ 12 ตำแหน่ง ลองเลือกดูสิครับ</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard label="งานที่สมัครแล้ว" value="4" color="text-blue-600" />
            <StatCard label="บริษัทที่ดูโปรไฟล์" value="28" color="text-green-600" />
            <StatCard label="ข้อความใหม่" value="2" color="text-purple-600" />
          </div>

          {/* Recommended Jobs */}
          <h3 className="text-lg font-bold mb-4 text-slate-800">งานแนะนำสำหรับคุณ</h3>
          <div className="space-y-4">
            {recommendedJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-400 transition shadow-sm flex justify-between items-center group">
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition">{job.title}</h4>
                  <div className="flex items-center text-sm text-slate-500 mt-1">
                    <span className="mr-4 font-medium text-slate-700">{job.company}</span>
                    <span className="flex items-center"><Briefcase size={14} className="mr-1"/> {job.location}</span>
                  </div>
                  <p className="text-sm text-blue-600 font-bold mt-2">{job.salary}</p>
                </div>
                <button className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition">
                  ดูรายละเอียด
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// Component ย่อยสำหรับ Sidebar Item
function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition ${active ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}>
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
}

// Component ย่อยสำหรับ Card สถิติ
function StatCard({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <p className="text-sm text-slate-500 font-medium mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}