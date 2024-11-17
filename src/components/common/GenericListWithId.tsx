/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import AddIcon from '@/src/components/icons/white-add-icon.svg';
import SearchIcon from '@/src/components/icons/search-icon.svg';
import EditIcon from '@/src/components/icons/edit-icon.svg';
import DeleteIcon from '@/src/components/icons/delete-icon.svg';
import ReturnIcon from '@/src/components/icons/return-icon.svg';
import Toast from './Toast';

interface TableColumn {
  label: string;
  key: string;
  width: string; // Classe de width tailwind, como w-1/4 ou w-1/3
}

interface Props<T> {
  columns: TableColumn[];
  getItems: T[];
  deleteItem: (id: number) => Promise<void>;
  refreshList: () => void;
  AddModal: React.FC<{
    onClose: () => void;
    onConfirm: () => void;
    item?: T;
    actionType?: number;
  }>;
  EditModal: React.FC<{
    onClose: () => void;
    onConfirm: () => void;
    item?: T;
    actionType?: number;
  }>;
  DeleteModal: React.FC<{
    onClose: () => void;
    onConfirm: () => void;
    item?: T;
    displayField?: keyof T;
    actionType?: number;
  }>;
}

export default function GenericListwithId<T extends { id: number; [key: string]: any }>({
  columns,
  getItems,
  deleteItem,
  AddModal,
  EditModal,
  DeleteModal,
  refreshList
}: Props<T>) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [originalList, setOriginalList] = useState<T[]>([]);
  const [filteredList, setFilteredList] = useState<T[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<T | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<T | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Função para carregar os itens

  useEffect(() => {
      setOriginalList(getItems);
      setFilteredList(getItems);
}, [getItems]);

  // Função de debouncing
const debounce = (func: () => void, delay: number) => {
    let timer: NodeJS.Timeout;  // Tipo correto para o timer
    return () => {
      clearTimeout(timer);  // Limpa o temporizador anterior
      timer = setTimeout(func, delay);  // Cria um novo temporizador
    };
  };
  
  // Função de pesquisa com debouncing
  useEffect(() => {
    const handleSearch = () => {
      if (searchTerm.length !== 0) {
        setIsSearching(true);
        const lowerSearchTerm = searchTerm.toLowerCase();
        const newList = originalList.filter(item =>
          columns.some(col =>
            String(item[col.key]).toLowerCase().includes(lowerSearchTerm)
          )
        );
        setFilteredList(newList);
        setIsSearching(false);
      } else {
        setFilteredList(originalList);
      }
    };
  
    const debouncedSearch = debounce(handleSearch, 500);  // Agora debouncedSearch é a função retornada pela debounce
    debouncedSearch();  // Chama a função imediatamente
  
    // Limpeza do debounce ao desmontar o componente
    return () => clearTimeout(debouncedSearch as unknown as number);
  }, [searchTerm, originalList, columns]);
  
  const handleAddClose = () => {
    setShowAddModal(false);
  };

  const handleEditClose = () => {
    setShowEditModal(null);
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(null);
  };

  const handleAddConfirm = () => {
    setShowAddModal(false);
    setShowToast('Adicionado com sucesso!');
    refreshList();
  };

  const handleEditConfirm = () => {
    setShowEditModal(null);
    setShowToast('Editado com sucesso!');
    refreshList();
  };

  const handleDeleteConfirm = () => {
    if (showDeleteModal) {
      deleteItem(showDeleteModal.id);
      setShowDeleteModal(null);
      setShowToast('Deletado com sucesso!');
      refreshList();
    }
  };

  return (
    <main>
      <div className="px-16 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-1/3">
            <input
              type="text"
              className="pl-10 w-full text-[#1e1e1e] mt-1 border border-greenHortti rounded-lg p-2"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Image src={SearchIcon} alt="Pesquisar" width={14} height={14} />
            </div>
          </div>
          <button
            className="bg-greenHortti text-white px-20 py-2 rounded-lg hover:bg-green-700 flex items-center"
            onClick={() => setShowAddModal(true)}
          >
            <Image src={AddIcon} alt="Adicionar" width={14} height={14} />
            <span className="ml-2 text-sm">Adicionar</span>
          </button>
        </div>

        <div className="space-y-4 max max-h-[400px] overflow-y-auto"> 
          <div className="flex items-center justify-between px-4 pt-3 my-2 text-gray-400 bg-white">
            {columns.map((col, index) => (
              <div key={index} className={`${col.width} text-center`}>
                {col.label}
              </div>
            ))}
            <div className="text-center w-28">Ações</div>
          </div>

          {!isSearching && filteredList.length > 0 ? (
            filteredList.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-lg p-4 my-2 text-black bg-white shadow border-greenHortti"
              >
                {columns.map((col, index) => (
                  <div key={index} className={`${col.width} text-center`}>
                    <span className="text-lg">{String(item[col.key])}</span>
                  </div>
                ))}
                <div className="flex space-x-4 w-28">
                  <button
                    className="text-greenHortti px-4 font-bold"
                    onClick={() => setShowEditModal(item)}
                  >
                    <Image src={EditIcon} alt="Editar" width={18} height={18} />
                  </button>
                  <button
                    className="text-red-600 px-4 font-bold"
                    onClick={() => setShowDeleteModal(item)}
                  >
                    <Image src={DeleteIcon} alt="Deletar" width={14} height={14} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhum item encontrado.</p>
          )}
        </div>

        <div className="my-8 float-right">
          <button
            className="bg-gray-800 text-white px-20 py-2 rounded-lg hover:bg-green-700 flex items-center"
            onClick={() => router.push('/home')}
          >
            <Image src={ReturnIcon} alt="Retornar" width={14} height={14} />
            <span className="ml-2 text-sm">Retornar</span>
          </button>
        </div>
      </div>

      {showAddModal && (
        <AddModal
          actionType={0}
          onClose={handleAddClose}
          onConfirm={handleAddConfirm}
        />
      )}
      {showEditModal && (
        <EditModal
          item={showEditModal}
          actionType={1}
          onClose={handleEditClose}
          onConfirm={handleEditConfirm}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          item={showDeleteModal}
          onClose={handleDeleteClose}
          onConfirm={handleDeleteConfirm}
          displayField={columns[0].key}
        />
      )}
      {showToast && (
        <Toast
          message={showToast}
          onClose={() => setShowToast(null)}
        />
      )}
    </main>
  );
}
