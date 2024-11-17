'use client';
import ConfigNavbarComponent from '@/src/components/common/configNavbar';
import GenericListWithId from '@/src/components/common/GenericListWithId';
import Header from '@/src/components/common/header';
import CategoryModal from '@/src/components/common/modals/CategoryModal';
import IdDeleteModal from '@/src/components/common/modals/IdDeleteModal';
import { categoryService } from '@/src/services/categoryService';
import { useEffect, useState } from 'react';

const service = new categoryService();

export default function CreateCategory() {
  const [itens, setItens] = useState<CategoryDTO[]>([]);

  const getCategory = async (): Promise<CategoryDTO[]> => {
    const response = await service.getAllCategories();
    if (response.data.data) {
      setItens(response.data.data);
      return response.data.data;
    }
    return [];
  };

  const deleteCategory = async (id: number) => {
    await service.deleteCategory(id);
    setItens((prevItens) => prevItens.filter((item) => item.id !== id)); // Atualiza a lista local
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <main>
      <Header />
      <ConfigNavbarComponent>
        <GenericListWithId
          columns={[{ label: 'Descrição', key: 'description', width: 'w-1/3' }]}
          getItems={itens} // Passa a função para obter as categorias
          deleteItem={deleteCategory} // Função de exclusão
          AddModal={CategoryModal} // Modal de adicionar
          EditModal={CategoryModal} // Modal de editar
          DeleteModal={IdDeleteModal} // Modal de deletar
        />
      </ConfigNavbarComponent>
    </main>
  );
}
