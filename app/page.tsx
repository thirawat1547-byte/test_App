"use client"; // เพิ่มบรรทัดนี้เพื่อให้รองรับฟังก์ชันฝั่ง Client ใน Next.js

import React from 'react';
import Link from 'next/link'; // นำเข้า Link สำหรับการนำทาง
import { Search, Briefcase, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export default function JobLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- Navbar --- */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-600 cursor-pointer">
          <Link href="/">NextJob</Link>
        </div>
        
        <div className="hidden md:flex space-x-8 font-medium text-slate-600">
          <a href="#search" className="hover:text-blue-600 transition">หางาน</a>
          <a href="#" className="hover:text-blue-600 transition">สำหรับบริษัท</a>
          <a href="#" className="hover:text-blue-600 transition">คำแนะนำ</a>
        </div>

        {/* ปุ่มเข้าสู่ระบบ - เชื่อมไปที่หน้า /login */}
        <Link href="/login">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition active:scale-95">
            เข้าสู่ระบบ
          </button>
        </Link>
      </nav>

      {/* --- Hero Section --- */}
      <section className="px-8 py-20 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          ก้าวสู่เส้นทางอาชีพ <br />
          <span className="text-blue-600">ที่คุณคู่ควร</span>
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          เราเชื่อมโยงผู้มีความสามารถเข้ากับบริษัทชั้นนำทั่วประเทศ ค้นหางานที่ตรงใจและเริ่มสมัครได้ทันทีวันนี้
        </p>

        {/* Search Bar */}
        <div id="search" className="bg-white p-4 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 max-w-4xl mx-auto border border-slate-100">
          <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-lg border border-transparent focus-within:border-blue-400">
            <Search className="text-slate-400 mr-2" size={20} />
            <input type="text" placeholder="ตำแหน่งงาน, ทักษะ..." className="bg-transparent w-full py-3 outline-none" />
          </div>
          <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-lg">
            <Briefcase className="text-slate-400 mr-2" size={20} />
            <select className="bg-transparent w-full py-3 outline-none text-slate-500">
              <option>ทุกประเภทงาน</option>
              <option>Full-time</option>
              <option>Remote</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white px-10 py-3 rounded-lg font-bold hover:bg-blue-700 transition active:scale-95">
            ค้นหา
          </button>
        </div>
      </section>

      {/* --- Feature Section --- */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">เครือข่ายที่กว้างขวาง</h3>
            <p className="text-slate-500">บริษัทชั้นนำกว่า 5,000 แห่งไว้วางใจเลือกพนักงานผ่านเรา</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">ข้อมูลส่วนตัวปลอดภัย</h3>
            <p className="text-slate-500">ระบบเก็บข้อมูลความปลอดภัยสูง ได้มาตรฐานระดับสากล</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <ArrowRight size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">สมัครงานง่ายในคลิกเดียว</h3>
            <p className="text-slate-500">กรอกประวัติครั้งเดียว พร้อมยื่นสมัครได้ทุกที่ทุกเวลา</p>
          </div>
        </div>
      </section>

      {/* --- Registration Form (Lead Generation) --- */}
      <section className="py-20 px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-slate-900 text-left">
          <div className="p-10 md:w-1/2 bg-slate-900 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">ลงทะเบียนล่วงหน้า</h2>
            <p className="text-slate-400 mb-6">
              ฝากประวัติไว้กับเรา เพื่อให้บริษัทเป็นฝ่ายเข้าหาคุณ พร้อมรับคำแนะนำการเขียน Resume แบบมืออาชีพฟรี!
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">✅ อัปเดตงานใหม่ก่อนใคร</li>
              <li className="flex items-center">✅ ระบบแนะนำงานตามทักษะ</li>
              <li className="flex items-center">✅ เครื่องมือสร้าง Resume อัตโนมัติ</li>
            </ul>
          </div>
          
          <div className="p-10 md:w-1/2">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold mb-1">ชื่อ-นามสกุล</label>
                <input type="text" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="สมชาย ใจดี" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">อีเมล</label>
                <input type="email" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="somchai@example.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">สายงานที่สนใจ</label>
                <input type="text" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="เช่น Developer, Designer" />
              </div>
              
              {/* ปุ่มลงทะเบียน - สมมติว่ากดแล้วจะไปหน้า register */}
              <Link href="/register">
                <button type="button" className="w-full mt-2 bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-95 text-center">
                  ฝากประวัติเลยตอนนี้
                </button>
              </Link>
              
              <p className="text-xs text-center text-slate-400 mt-4">
                การคลิกปุ่ม แสดงว่าคุณยอมรับเงื่อนไขการใช้บริการ
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-10 text-center text-slate-400 text-sm">
        © 2026 NextJob Thailand. All rights reserved.
      </footer>
    </div>
  );
}