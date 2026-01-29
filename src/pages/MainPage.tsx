import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Layout, 
  Button, 
  Card, 
} from "../components/common";

const MainPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'전체' | '진행중' | '완료'>('전체');
  const baseTabStyle =
    "px-10 py-3.5 rounded-2xl text-base transition-all";
  const activeTabStyle =
    "bg-black text-white font-bold shadow-xl transform hover:scale-105";
  const inactiveTabStyle =
    "bg-white text-gray-500 font-semibold hover:bg-gray-50 border border-gray-100";
  return (
    <Layout maxWidth="70%">
      <div className="flex flex-col items-center mt-6 mb-10">
        <div className="w-14 h-14 bg-[#6366F1] rounded-full flex items-center justify-center mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">할 일 목록</h1>
        <p className="text-gray-500 mb-5 text-lg">오늘 할 일을 관리하세요</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs border-gray-300 py-1 h-9 bg-white px-4 rounded-xl shadow-sm"
          onClick={() => navigate("/")}>
          <span className="mr-1">↪</span> 로그아웃
        </Button>
      </div>
      <Card className="w-full p-8 mb-10 shadow-sm border-none bg-white rounded-4xl">
        <div className="flex gap-4 mb-6">
          <input 
            type="text" 
            placeholder="할 일을 입력하세요..." 
            className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg"/>
          <Button className="bg-black hover:bg-gray-800 px-10 rounded-2xl font-bold text-lg shadow-lg">
            + 추가
          </Button>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-2xl text-sm text-gray-500 cursor-pointer hover:bg-gray-100 transition-all border border-gray-100">
            <span className="text-lg">📅</span> 
            <span className="font-medium">날짜 선택</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-2xl text-sm text-gray-500 cursor-pointer hover:bg-gray-100 transition-all border border-gray-100">
             <span className="font-medium">-- : --</span>
             <span className="text-lg">🕒</span>
          </div>
        </div>
      </Card>
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setActiveTab('전체')}
          className={`${baseTabStyle} ${
            activeTab === '전체' ? activeTabStyle : inactiveTabStyle
          }`}>
          전체 (0)
        </button>
        <button
          onClick={() => setActiveTab('진행중')}
          className={`${baseTabStyle} ${
            activeTab === '진행중' ? activeTabStyle : inactiveTabStyle
          }`}>
          진행 중 (0)
        </button>
        <button
          onClick={() => setActiveTab('완료')}
          className={`${baseTabStyle} ${
            activeTab === '완료' ? activeTabStyle : inactiveTabStyle
          }`}>
          완료됨 (0)
        </button>
      </div>
      <div className="w-full flex bg-gray-200/50 p-2 rounded-3xl mb-10">
        <button className="flex-1 flex items-center justify-center gap-3 py-4 bg-white rounded-[1.2rem] shadow-md font-bold text-gray-900">
          <span className="text-2xl font-light">≡</span> 
          <span className="text-lg">목록</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-3 py-4 text-gray-500 font-semibold text-lg hover:text-gray-700 transition-all">
          <span className="text-xl">📅</span> 
          <span>달력</span>
        </button>
      </div>
      <Card className="w-full py-36 flex flex-col items-center justify-center bg-white/40 border-2 border-dashed border-gray-200 shadow-none rounded-[2.5rem]">
        <div className="bg-gray-100/50 p-4 rounded-full mb-4">
          <span className="text-4xl">📝</span>
        </div>
        <p className="text-gray-400 font-bold text-2xl">할 일을 추가해보세요!</p>
        <p className="text-gray-400 mt-2">새로운 계획이 당신을 기다리고 있어요.</p>
      </Card>
    </Layout>
  );
};

export default MainPage;
