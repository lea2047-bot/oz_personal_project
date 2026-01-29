import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Button, Card } from "../components/common";
import TodoItem from "../components/TodoItem"; // 생성한 컴포넌트 임포트

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const MainPage = () => {
  const navigate = useNavigate();
  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState<'전체' | '진행중' | '완료'>('전체');

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = { id: Date.now(), text: inputValue, completed: false };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => 
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const deleteTodo = (id: number) => 
    setTodos(todos.filter(t => t.id !== id));

  const updateTodo = (id: number, text: string) => 
    setTodos(todos.map(t => t.id === id ? { ...t, text } : t));

  const filteredTodos = todos.filter(t => {
    if (activeTab === '진행중') return !t.completed;
    if (activeTab === '완료') return t.completed;
    return true;
  });

  const baseTabStyle = "px-10 py-3.5 rounded-2xl text-base transition-all";
  const activeTabStyle = "bg-black text-white font-bold shadow-xl transform hover:scale-105";
  const inactiveTabStyle = "bg-white text-gray-500 font-semibold hover:bg-gray-50 border border-gray-100";
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
        <Button variant="outline" size="sm" className="bg-white" onClick={() => navigate("/")}>
          <span className="mr-1">↪</span> 로그아웃
        </Button>
      </div>
      <Card className="w-full p-8 mb-10 shadow-sm border-none bg-white rounded-4xl">
        <div className="flex gap-4 mb-6">
          <input 
            type="text" 
            placeholder="할 일을 입력하세요..." 
            className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          />
          <Button className="bg-black px-10 rounded-2xl font-bold text-lg" onClick={handleAddTodo}>
            + 추가
          </Button>
        </div>
        <div className="flex gap-4 text-gray-500 text-sm">
          <div className="bg-gray-50 px-6 py-3 rounded-2xl">📅 날짜 선택</div>
          <div className="bg-gray-50 px-6 py-3 rounded-2xl">-- : -- 🕒</div>
        </div>
      </Card>
      <div className="flex justify-center gap-4 mb-10">
        <button onClick={() => setActiveTab('전체')} className={`${baseTabStyle} ${activeTab === '전체' ? activeTabStyle : inactiveTabStyle}`}>
          전체 ({todos.length})
        </button>
        <button onClick={() => setActiveTab('진행중')} className={`${baseTabStyle} ${activeTab === '진행중' ? activeTabStyle : inactiveTabStyle}`}>
          진행 중 ({todos.filter(t => !t.completed).length})
        </button>
        <button onClick={() => setActiveTab('완료')} className={`${baseTabStyle} ${activeTab === '완료' ? activeTabStyle : inactiveTabStyle}`}>
          완료됨 ({todos.filter(t => t.completed).length})
        </button>
      </div>
      <div className="w-full flex bg-gray-200/50 p-2 rounded-3xl mb-10">
        <button className="flex-1 py-4 bg-white rounded-[1.2rem] shadow-md font-bold text-lg">≡ 목록</button>
        <button className="flex-1 py-4 text-gray-500 font-semibold text-lg">📅 달력</button>
      </div>
      <div className="w-full">
        {filteredTodos.length > 0 ? (
          filteredTodos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggle={toggleTodo} 
              onDelete={deleteTodo} 
              onUpdate={updateTodo} />
          ))):
          (
          <Card className="w-full py-36 flex flex-col items-center justify-center bg-white/40 border-2 border-dashed border-gray-200 shadow-none rounded-[2.5rem]">
            <p className="text-gray-400 font-bold text-2xl">
              {activeTab === '완료' ? "완료된 할 일이 없습니다." : "할 일을 추가해보세요!"}
            </p>
          </Card>
        )}
      </div>
      {todos.length > 0 && (
        <div className="mt-8 text-center text-gray-400 font-medium">
          전체 {todos.length} | 완료 {todos.filter(t => t.completed).length} | 진행 중 {todos.filter(t => !t.completed).length}
        </div>
      )}
    </Layout>
  );
};

export default MainPage;