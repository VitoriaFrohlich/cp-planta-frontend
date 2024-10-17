import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-auto max-h-[90vh] overflow-y-auto p-12 relative">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-black">{title}</h2>
          <button
            onClick={onClose}
            className="text-red-600 font-semibold text-xl"
          >
            ✕
          </button>
        </div>
        {/* Conteúdo Dinâmico (Children) */}
        <div>{children}</div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="border rounded-lg px-4 py-2 text-white bg-greenHortti"
          >
            Adicionar
          </button>
          <button
            onClick={onClose}
            className="border rounded-lg px-4 py-2 text-white bg-gray-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>,
    document.body // Renderiza fora da árvore principal de componentes
  );
};

export default Modal;
