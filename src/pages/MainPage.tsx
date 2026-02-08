import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Button, Card } from "../components/common";
import TodoItem from "../components/TodoItem";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  date: string; 
  time: string; 
}

const MainPage = () => {
  const navigate = useNavigate();
  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); 
  const [selectedTime, setSelectedTime] = useState("00:00");
  const [activeTab, setActiveTab] = useState<'전체' | '진행중' | '완료'>('전체');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      date: selectedDate,
      time: selectedTime,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const filteredTodos = todos.filter(t => {
    if (activeTab === '진행중') return !t.completed;
    if (activeTab === '완료') return t.completed;
    return true;
  });

  return (
    <Layout maxWidth="70%">
      <div className="flex flex-col items-center mt-6 mb-10">
        <div className="w-14 h-14 bg-[#6366F1] rounded-full flex items-center justify-center mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900">할 일 목록</h1>
        <Button variant="outline" size="sm" className="mt-4 bg-white" onClick={() => navigate("/")}>로그아웃</Button>
      </div>

      <Card className="w-full p-8 mb-10 shadow-sm bg-white rounded-4xl">
        <div className="flex gap-4 mb-6">
          <input 
            type="text" 
            placeholder="할 일을 입력하세요..." 
            className="flex-1 bg-gray-50 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
          />
          <Button className="bg-black px-10 rounded-2xl font-bold text-lg" onClick={handleAddTodo}>+ 추가</Button>
        </div>
        
        <div className="flex gap-4 items-center">
          <input 
            type="date" 
            className="bg-gray-50 px-4 py-2 rounded-xl text-gray-500 border-none outline-none cursor-pointer"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <input 
            type="time" 
            className="bg-gray-50 px-4 py-2 rounded-xl text-gray-500 border-none outline-none cursor-pointer"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>
      </Card>

      <div className="flex justify-center gap-4 mb-10">
        {(['전체', '진행중', '완료'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            className={`px-10 py-3 rounded-2xl font-bold transition-all ${activeTab === tab ? 'bg-black text-white shadow-lg scale-105' : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'}`}
          >
            {tab} ({tab === '전체' ? todos.length : tab === '진행중' ? todos.filter(t => !t.completed).length : todos.filter(t => t.completed).length})
          </button>
        ))}
      </div>

      <div className="w-full flex bg-gray-200/50 p-2 rounded-3xl mb-10 font-bold">
        <button 
          onClick={() => setViewMode('list')}
          className={`flex-1 py-4 rounded-[1.2rem] text-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-gray-900' : 'text-gray-500'}`}>   
          ≡ 목록
        </button>
        <button 
          onClick={() => setViewMode('calendar')}
          className={`flex-1 py-4 rounded-[1.2rem] text-lg transition-all ${viewMode === 'calendar' ? 'bg-white shadow-md text-gray-900' : 'text-gray-500'}`}>
          📅 달력
        </button>
      </div>

      {viewMode === 'list' ? (
        <div className="w-full space-y-3">
          {filteredTodos.length > 0 ? (
            filteredTodos.map(todo => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onToggle={(id) => setTodos(todos.map(t => t.id === id ? {...t, completed: !t.completed} : t))}
                onDelete={(id) => setTodos(todos.filter(t => t.id !== id))}
                onUpdate={(id, text) => setTodos(todos.map(t => t.id === id ? {...t, text} : t))}
              />
            ))
          ) : (
            <Card className="w-full py-36 flex flex-col items-center justify-center border-dashed border-2 border-gray-200 bg-transparent rounded-[2.5rem]">
               <p className="text-gray-400 font-bold text-2xl">할 일이 없습니다!</p>
            </Card>
          )}
        </div>
      ) : (
        <CalendarView todos={todos} />
      )}
    </Layout>
  );
};

const CalendarView = ({ todos }: { todos: Todo[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <Card className="w-full p-8 bg-white rounded-[2.5rem] shadow-sm">
      <div className="flex items-center justify-between mb-8 px-4">
        <h2 className="text-2xl font-bold text-gray-800">{year}년 {month + 1}월</h2>
        <div className="flex gap-2">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">〈</button>
          <button onClick={() => setCurrentDate(new Date())} className="px-4 py-1 bg-gray-50 text-gray-500 rounded-lg text-sm font-semibold hover:bg-gray-100">오늘</button>
          <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">〉</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
        {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
          <div key={d} className={`bg-white text-center font-bold py-3 text-sm ${i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-gray-400'}`}>
            {d}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-white min-h-30" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayTodos = todos.filter(t => t.date === dateStr);
          const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
          
          const dayOfWeek = new Date(year, month, day).getDay();
          const isSunday = dayOfWeek === 0;
          const isSaturday = dayOfWeek === 6;

          return (
            <div key={i} className="bg-white min-h-30 p-2 border-t border-l border-gray-50 hover:bg-indigo-50/20 transition-all group">
              <span className={`text-sm font-bold inline-flex items-center justify-center w-7 h-7 rounded-full 
                ${isToday ? 'bg-indigo-600 text-white shadow-md' : 
                  isSunday ? 'text-red-500' : 
                  isSaturday ? 'text-blue-500' : 'text-gray-600'}`}>
                {day}
              </span>
              <div className="mt-2 space-y-1">
                {dayTodos.map(todo => (
                  <div key={todo.id} className={`text-[10px] p-1.5 rounded-md truncate border ${todo.completed ? 'bg-gray-50 text-gray-300 line-through' : 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>
                    <span className="opacity-60 mr-1">{todo.time}</span> {todo.text}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default MainPage;