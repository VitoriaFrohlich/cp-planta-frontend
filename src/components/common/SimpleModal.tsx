import { useEffect } from 'react';

interface ModalExampleProps {
  onClose: () => void;  // Função chamada para fechar o modal
  item?: any;  // Item opcional para exibição ou manipulação
}

export default function SimpleModal({ onClose, item }: ModalExampleProps) {

  if (!item && item !== undefined) return null; // Exibe o modal mesmo sem item, se não for passado

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 text-black text-center">
        <h2 className="text-xl font-bold mb-4">{item ? `Editando: ${item.name}` : 'Adicionar Novo Item'}</h2>
        <p>{item ? `Detalhes do item: ${item.name}` : 'Preencha os detalhes do novo item.'}</p>
        <button
          onClick={onClose}  
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 mt-4"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
