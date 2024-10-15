'use client';
import ConfigNavbarComponent from '@/src/components/common/configNavbar';
import GenericList from '@/src/components/common/GenericList';
import Header from '@/src/components/common/header';
import SimpleModal from '@/src/components/common/SimpleModal';

export default function createCategory() {
  // Função que retorna os itens da lista
  const getCategory = async () => [
    { id: 1, name: 'Verduras', quantity: 2 },
    { id: 2, name: 'Frutas', quantity: 1 }
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
          AddModal={SimpleModal} // Abre modal de adicionar
          EditModal={SimpleModal} // Abre modal de editar
          DeleteModal={SimpleModal} // Abre modal de deletar
        />
      </ConfigNavbarComponent>
    </main>
  );
}
