'use client';
import ConfigNavbarComponent from '@/src/components/common/configNavbar';
import GenericList from '@/src/components/common/GenericList';
import Header from '@/src/components/common/header';
import SimpleModal from '@/src/components/common/SimpleModal';

export default function createStep() {
  // Função que retorna os itens da lista
  // Mock-data
  const getSteps = async () => [
    { id: 1, name: 'Lavar' },
    { id: 2, name: 'Descascar' },
    { id: 3, name: 'Fatiar' },
    { id: 4, name: 'Embalar' },
    { id: 5, name: 'Rotular' }
  ];

  return (
    <main>
      <Header />
      <ConfigNavbarComponent>
        <GenericList
          columns={[
            { label: 'Descrição', key: 'name', type: 'text', width: 'w-1/2' }
          ]}
          getItems={getSteps} // Função que busca os itens
          AddModal={SimpleModal} // Abre modal de adicionar
          EditModal={SimpleModal} // Abre modal de editar
          DeleteModal={SimpleModal} // Abre modal de deletar
        />
      </ConfigNavbarComponent>
    </main>
  );
}
