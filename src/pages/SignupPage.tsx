import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout, Input, Button } from "../components/common";
import { supabase } from "../lib/supabaseClient";
import { authSchema, AuthInput } from "../schema";

const SignupPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch, 
  } = useForm<AuthInput & { confirmPassword: string }>({
    resolver: zodResolver(authSchema),
  });

  const password = watch("password"); 

  const onSignupSubmit = async (data: AuthInput & { confirmPassword: string }) => {
    if (data.password !== data.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.email.split("@")[0] },
        emailRedirectTo: window.location.origin, 
      },
    });

    if (error) {
      alert("회원가입 에러: " + error.message);
      return;
    }

    alert("회원가입이 완료되었습니다! 로그인을 진행해주세요.");
    navigate("/");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center mt-8 mb-12">
        <div className="w-16 h-16 bg-[#6366F1] rounded-full flex items-center justify-center mb-6 shadow-lg">
          <span className="text-white text-3xl">✓</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">할 일 목록</h1>
        <p className="text-gray-500 text-lg">회원가입하고 시작하세요</p>
      </div>

      <div className="w-full flex flex-col gap-5">
        <form onSubmit={handleSubmit(onSignupSubmit)} className="flex flex-col gap-5">
          <Input
            label="이메일"
            placeholder="example@email.com"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            error={errors.password?.message}
          />
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            error={password && watch("confirmPassword") !== password ? "비밀번호가 일치하지 않습니다." : ""}
          />
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-14 text-lg mt-2 bg-black hover:bg-gray-800"
          >
            <span className="mr-2">✉️</span>
            {isSubmitting ? "가입 요청 중..." : "회원가입 하기"}
          </Button>
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-[#6366F1] font-medium hover:underline"
          >
            이미 계정이 있으신가요? 로그인
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;