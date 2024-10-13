import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SimpleModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 text-center">
        <h2 className="text-xl font-bold mb-4">TESTE</h2>
        <button
          onClick={onClose}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default function ModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Abrir Modal
      </button>

      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
