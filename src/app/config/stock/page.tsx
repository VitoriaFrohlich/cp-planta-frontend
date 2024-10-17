'use client';
import ConfigNavbarComponent from '@/src/components/common/ConfigNavbar';
import GenericList from '@/src/components/common/GenericList';
import Header from '@/src/components/common/header';
import StockModal from '@/src/components/common/modals/PlaceModal';
import SimpleModal from '@/src/components/common/SimpleModal';

export default function createStock() {
  // Função que retorna os itens da lista
  const getPlaces = async () => [
    { id: 1, name: 'Frezzer', quantity: 8 },
    { id: 2, name: 'Geladeira', quantity: 5 },
    { id: 3, name: 'Armário 1', quantity: 7 },
    { id: 4, name: 'Armário 2', quantity: 7 }
  ];

  return (
    <main>
      <Header />
      <ConfigNavbarComponent>
        <GenericList
          columns={[
            { label: 'Descrição', key: 'name', type: 'text', width: 'w-1/3' },
            {
              label: 'Qnt. lotes',
              key: 'quantity',
              type: 'text',
              width: 'w-1/3'
            }
          ]}
          getItems={getPlaces} // Função que busca os itens
          AddModal={StockModal} // Abre modal de adicionar
          EditModal={StockModal} // Abre modal de editar
          DeleteModal={SimpleModal} // Abre modal de deletar
        />
      </ConfigNavbarComponent>
    </main>
  );
}
