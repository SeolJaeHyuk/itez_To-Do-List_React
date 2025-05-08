import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from './component/Modal';
import Time from './component/Time'; 
import Correction from './component/Correction'; 


interface TodoList {
  title: string;
  todos: string[];
  isEditMode?: boolean; // 수정 모드 여부
}


function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [lists, setLists] = useState<TodoList[]>(() => {
    const stored = localStorage.getItem('todo-lists');
    return stored ? JSON.parse(stored) : [{ title: '기본 리스트', todos: [] }];
  });

  const [newTodo, setNewTodo] = useState('');
  const [newListTitle, setNewListTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTodoIndex, setEditTodoIndex] = useState<number | null>(null);


   // 날짜와 시간을 관리하는 상태 추가
   const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedLists = localStorage.getItem('todo-lists');
    if (storedLists) {
      setLists(JSON.parse(storedLists));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todo-lists', JSON.stringify(lists));
  }, [lists]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setNewTodo('');
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditTodoIndex(null);
  };

  const addTodoToList = () => {
    if (newTodo.trim()) {
      const updatedLists = [...lists];
  
      if (isEditMode && editTodoIndex !== null) {
        updatedLists[selectedListIndex].todos[editTodoIndex] = newTodo.trim();
      } else {
        updatedLists[selectedListIndex].todos.push(newTodo.trim());
      }
  
      setLists(updatedLists);
      setNewTodo('');
      setIsEditMode(false);
      setEditTodoIndex(null);
      closeModal();
    }
  };

  const addList = () => {
    if (newListTitle.trim()) {
      setLists([...lists, { title: newListTitle.trim(), todos: [] }]);
      setNewListTitle('');
      setSelectedListIndex(lists.length);
    }
  };

    // 완료 관련 코드
  const completeTodo = (todoIndex: number) => {
    window.alert('고생하셨습니다!'); // 단순 알림으로 변경
    const updatedLists = [...lists];
    updatedLists[selectedListIndex].todos.splice(todoIndex, 1);
    setLists(updatedLists);
  };

  // 삭제 관련 코드
  const deletetodo = (todoIndex: number) => {
    const confirmDelete = window.confirm("삭제 하시겠습니까?");
    if (confirmDelete) {
      const updatedLists = [...lists];
      updatedLists[selectedListIndex].todos.splice(todoIndex, 1);
      setLists(updatedLists);
      window.alert("삭제되었습니다.");
    } else {
      window.alert("취소되었습니다.");
    }
  };
  
  
  // 수정 관련 코드
  const correctiontodo = (todoIndex: number) => {
    setIsEditMode(true);
    setEditTodoIndex(todoIndex);
    setNewTodo(lists[selectedListIndex].todos[todoIndex]); // 기존 내용 불러오기
    setIsModalOpen(true);
  };
  

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>To Do List</h1>
      {/* 날짜와 시간이 한 줄로 출력되도록 수정 */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Time 컴포넌트를 여기에서 사용, today prop으로 currentDate 전달 */}
        <Time today={currentDate} />   
        <h4>&nbsp;현재 시간은 {time} 입니다.</h4>
      </div>
      <hr />
      <br />
      <button onClick={openModal} style={{ padding: '10px 15px', cursor: 'pointer' }}>
        할 일 추가하기
      </button>
      {/* 리스트 목록 */}
<div style={{ marginTop: '20px' }}>
  {lists[selectedListIndex]?.todos.map((todo, index) => (
    <div
      key={index}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '6px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        color: 'black'
      }}
    >
      {/* 왼쪽 텍스트 */}
      <span style={{ flexGrow: 1 }}>{todo}</span>

      {/* 오른쪽 버튼 그룹 */}
      <div style={{ display: 'flex', gap: '6px', marginLeft: '10px' }}>
        <button
          onClick={() => completeTodo(index)}
          style={{
            padding: '8px 6px',
            backgroundColor: '#54fc2a',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            fontSize: '10pt',
            cursor: 'pointer'
          }}
        >
          완료
        </button>
        <button
          onClick={() => correctiontodo(index)}
          style={{
            padding: '8px 6px',
            backgroundColor: '#fce373',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            fontSize: '10pt',
            cursor: 'pointer'
          }}
        >
          수정
        </button>
        <button
          onClick={() => deletetodo(index)}
          style={{
            padding: '8px 6px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '10pt',
            cursor: 'pointer'
          }}
        >
          삭제
        </button>
      </div>
    </div>
  ))}
</div>


{isModalOpen && (
  isEditMode ? (
    <Correction
      isOpen={isModalOpen}
      onClose={closeModal}
      onSubmit={addTodoToList}
      newTodo={newTodo}
      setNewTodo={setNewTodo}
    />
  ) : (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      onSubmit={addTodoToList}
      newTodo={newTodo}
      setNewTodo={setNewTodo}
    />
  )
)}
    </div>
  );
}

export default App;
