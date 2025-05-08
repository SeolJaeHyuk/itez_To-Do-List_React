import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  newTodo: string;
  setNewTodo: (value: string) => void;
  title?: string;
  buttonText?: string;
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, newTodo, setNewTodo }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 999
      }}
    >
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
        position: 'relative',
        color: 'black'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: 'none',
            background: 'transparent',
            fontSize: '18px',
            cursor: 'pointer',
            color: 'black'
          }}
        >
          ✕
        </button>
        <h3 style={{ marginBottom: '15px' }}>추가하실 일이 있으신가요?</h3>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-[95%] p-2 mb-2.5 rounded border border-gray-300 text-black"
          // w-95%는 너비(width)를 전체의 95%로 설정한다. (화면 너비의 95% 크기)
          // p-2는 모든 방향(padding)에 0.5rem (8px)의 안쪽 여백을 지정한다. (안쪽 여백 8px)
          // mb-2.5는 아래쪽(margin-bottom)에 0.625rem (10px)의 바깥 여백을 지정한다. (아래쪽 여백 10px)
          // rounded는 테두리를 살짝 둥글게 만든다 (기본값은 약 4px). (테두리 둥글게 만들기)
          // border는 기본 테두리를 추가합니다. 기본 색은 회색 300 수준. (테두리 연한 회색)
          // border-gray-300는 테두리 색상을 연한 회색 (#D1D5DB)으로 설정합니다. (테두리 연한 회색)
          // text-black는 글자 색을 검정색으로 설정합니다. (텍스트는 검정색)
        /><p />
        <button
          onClick={onSubmit}
          disabled={!newTodo.trim()}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: newTodo.trim() ? '#007bff' : '#cccccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          추가
        </button>
      </div>
    </div>
  );
};

export default Modal;
