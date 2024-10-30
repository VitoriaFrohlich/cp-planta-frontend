'use client';
import ConfigNavbarComponent from '@/src/components/common/configNavbar';
import GenericList from '@/src/components/common/GenericList';
import Header from '@/src/components/common/header';
import CategoryModal from '@/src/components/common/modals/CategoryModal';
import DeleteModal from '@/src/components/common/modals/DeleteModal';

export default function createCategory() {
  // Função que retorna os itens da lista
  const getCategory = async () => [
    { id: 1, name: 'Verduras', quantity: 2 },
    { id: 2, name: 'Frutas', quantity: 1 }
  ];
  const deleteCategory = async (_id: string) => [
    //Deletar categoria
  ];

  return (
    <main>
      <Header />
      <ConfigNavbarComponent>
        <GenericList
          columns={[
            { label: 'Descrição', key: 'name', type: 'text', width: 'w-1/3' },
            {
              label: 'Qnt. itens',
              key: 'quantity',
              type: 'text',
              width: 'w-1/3'
            }
          ]}
          getItems={getCategory} // Função que busca os itens
          deleteItem={deleteCategory} // Função que deleta o item
          AddModal={CategoryModal} // Abre modal de adicionar
          EditModal={CategoryModal} // Abre modal de editar
          DeleteModal={DeleteModal} // Abre modal de deletar
        />
      </ConfigNavbarComponent>
    </main>
  );
}
