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

const Correction: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  newTodo,
  setNewTodo,
  title = '수정하실 내용을 입력해주세요.',
  buttonText = '수정',
}) => {
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
        <h3 style={{ marginBottom: '15px' }}>{title}</h3>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-[95%] p-2 mb-2.5 rounded border border-gray-300 text-black"
        />
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
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Correction;
