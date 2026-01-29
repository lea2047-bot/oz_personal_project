import React from "react";
import { useNavigate } from "react-router-dom"; 
import { Layout, Input, Button } from "../components/common";

const LoginPage = () => {
  const navigate = useNavigate(); 
  const handleLogin = () => {
    navigate("/main");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center mt-8 mb-12">
        <div className="w-16 h-16 bg-[#6366F1] rounded-full flex items-center justify-center mb-6 shadow-lg">
         <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          할 일 목록
        </h1>
        <p className="text-gray-500 text-lg">로그인하여 시작하세요</p>
      </div>

      <div className="w-full flex flex-col gap-5">
        <Button variant="outline" className="h-14 text-lg border-gray-200">
          <span className="mr-2 text-yellow-600">💬</span> 카카오톡으로 시작하기
        </Button>
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#F0F2FF] text-gray-400">또는</span>
          </div>
        </div>
        <Input label="이메일" placeholder="example@email.com" />
        <Input label="비밀번호" type="password" placeholder="••••••••" />
        <Button 
          className="h-14 text-lg mt-2 bg-black hover:bg-gray-800"
          onClick={handleLogin} 
        >
          <span className="mr-2">✉️</span> 로그인
        </Button>
        <div className="text-center mt-4">
          <button 
            type="button"
            onClick={() => navigate("/signup")} 
            className="text-[#6366F1] font-medium hover:underline"
          >
            계정이 없으신가요? 회원가입
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;