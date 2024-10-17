interface ModalProps {
  onClose?: () => void; // Função chamada para fechar o modal
  onConfirm?: () => void; // Função chamada ao confirmar a ação
  item?: { name: string }; // Item opcional para exibição ou manipulação
  actionType?: number; // Tipo de ação: adicionar, editar ou deletar
}

export default function SimpleModal({
  onClose,
   onConfirm,
  item,
  actionType
}: ModalProps) { // Não exibe o modal de edição/remoção se o item não for passado

  const getTitle = () => {
    const titles: Record<number, string> = {
      0: 'Adicionar Novo Item',
      1: `Editando: ${item?.name}`,
      2: `Deletar: ${item?.name}`
    };

    return titles[actionType ?? 0];
  };

  const getMessage = () => {
    const messages: Record<number, string> = {
      0: 'Preencha os detalhes do novo item.',
      1: `Detalhes do item: ${item?.name}`,
      2: `Tem certeza de que deseja deletar o item: ${item?.name}? Esta ação não pode ser desfeita.`
    };

    return messages[actionType ?? 0];
  };

  const getConfirmButtonText = () => {
    const buttonTexts: Record<number, string> = {
      0: 'Adicionar',
      1: 'Salvar',
      2: 'Deletar'
    };

    return buttonTexts[actionType ?? 0];
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 text-black text-center">
        <h2 className="text-xl font-bold mb-4">{getTitle()}</h2>
        <p>{getMessage()}</p>
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg hover:bg-opacity-90 ${
              actionType === 2
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {getConfirmButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
}
