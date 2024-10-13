'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import AddIcon from '@/src/components/icons/white-add-icon.svg';
import SearchIcon from '@/src/components/icons/search-icon.svg';
import EditIcon from '@/src/components/icons/edit-icon.svg';
import DeleteIcon from '@/src/components/icons/delete-icon.svg';
import ReturnIcon from '@/src/components/icons/return-icon.svg';

interface TableColumn {
  label: string;
  key: string;
  type: string;
  width: string; // Classe de width tailwind, como w-1/4 ou w-1/3
}

interface Props<T> {
  columns: TableColumn[];
  getItems: () => Promise<T[]>;
  AddModal: React.FC<{ onClose: () => void }>;
  EditModal: React.FC<{ item: T; onClose: () => void }>;
  DeleteModal: React.FC<{ item: T; onClose: () => void }>;
}

export default function GenericList<T extends { [key: string]: any }>({
  columns,
  getItems,
  AddModal,
  EditModal,
  DeleteModal
}: Props<T>) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [originalList, setOriginalList] = useState<T[]>([]);
  const [filteredList, setFilteredList] = useState<T[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<T | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<T | null>(null);

  // Função para carregar os itens
  const loadItems = async () => {
    const items = await getItems();
    setOriginalList(items);
    setFilteredList(items);
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Função para debouncing na pesquisa
  useEffect(() => {
    if (searchTerm.length != 0) {
      setIsSearching(true);
        const lowerSearchTerm = searchTerm.toLowerCase();
        const newList = originalList.filter(item =>
          columns.some(col => String(item[col.key]).toLowerCase().includes(lowerSearchTerm))
        );
        setFilteredList(newList);
        setIsSearching(false);

    } else {
      setFilteredList(originalList);
    }
  }, [searchTerm]);

  const handleAddClose = () => {
    setShowAddModal(false);
    loadItems();
  };

  const handleEditClose = () => {
    setShowEditModal(null);
    loadItems();
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(null);
    loadItems();
  };

  return (
    <main>
      <div className="px-16 pb-8">
        {/* Campo de Pesquisa */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-1/3">
            <input
              type="text"
              className="pl-10 w-full text-[#1e1e1e] mt-1 border border-greenHortti rounded-lg p-2"
              placeholder="Pesquise"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Image src={SearchIcon} alt="Pesquisar" width={14} height={14} />
            </div>
          </div>
          {/* Botão Adicionar */}
          <button className="bg-greenHortti text-white px-20 py-2 rounded-lg hover:bg-green-700 flex items-center" onClick={() => setShowAddModal(true)}>
            <Image src={AddIcon} alt="Adicionar" width={14} height={14} />
            <span className="ml-2 text-sm">Adicionar</span>
          </button>
        </div>

        {/* Tabela */}
        <div className="space-y-4">
          {/* Cabeçalhos da tabela */}
          <div className="flex items-center justify-between px-4 pt-3 my-2 text-gray-400 bg-white">
            {columns.map((col, index) => (
              <div key={index} className={`${col.width} text-center`}>
                {col.label}
              </div>
            ))}
            <div className="text-center w-28">Ações</div>
          </div>

          {/* Lista de itens */}
          {!isSearching && filteredList.length > 0 ? (
            filteredList.map(item => (
              <div key={item.id} className="flex items-center justify-between border rounded-lg p-4 my-2 text-black bg-white shadow border-greenHortti">
                {columns.map((col, index) => (
                  <div key={index} className={`${col.width} text-webkit-center`}>
                    {col.type === 'image' ? (
                      <Image src={item[col.key]} alt={String(item[col.key])} className="w-80 h-16 rounded-lg object-cover" />
                    ) : (
                      <span className="text-lg">{String(item[col.key])}</span>
                    )}
                  </div>
                ))}
                {/* Ações */}
                <div className="flex space-x-4 w-28">
                  <button className="text-greenHortti px-4 font-bold" onClick={() => setShowEditModal(item)}>
                    <Image src={EditIcon} alt="Editar" width={18} height={18} />
                  </button>
                  <button className="text-red-600 px-4 font-bold" onClick={() => setShowDeleteModal(item)}>
                    <Image src={DeleteIcon} alt="Deletar" width={14} height={14} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhum item encontrado.</p>
          )}
        </div>

        {/* Botão Retornar */}
        <div className="my-8 float-right">
          <button className="bg-gray-800 text-white px-20 py-2 rounded-lg hover:bg-green-700 flex items-center" onClick={() => router.push("/home")}>
            <Image src={ReturnIcon} alt="Retornar" width={14} height={14} />
            <span className="ml-2 text-sm">Retornar</span>
          </button>
        </div>
      </div>

      {/* Modais */}
      {showAddModal && <AddModal onClose={handleAddClose} />}
      {showEditModal && <EditModal item={showEditModal} onClose={handleEditClose} />}
      {showDeleteModal && <DeleteModal item={showDeleteModal} onClose={handleDeleteClose} />}
    </main>
  );
}
