import React, { useState } from "react";
import { Card, Checkbox, Button } from "./common";

interface TodoItemProps {
  todo: { id: number; text: string; completed: boolean };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newText: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    onUpdate(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <Card className="w-full mb-3 flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border-none">
      <div className="flex items-center gap-4 flex-1">
        <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
        
        {isEditing ? (
          <input
            className="flex-1 border-b border-indigo-500 outline-none px-1"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
            autoFocus
          />
        ) : (
          <span className={`text-lg ${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        {isEditing ? (
          <Button variant="ghost" className="text-blue-500" onClick={handleUpdate}>확인</Button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <span className="text-gray-400">✏️</span>
          </button>
        )}
        <button onClick={() => onDelete(todo.id)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <span className="text-red-400">🗑️</span>
        </button>
      </div>
    </Card>
  );
};

export default TodoItem;