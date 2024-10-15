// src/app/config/final-product/page.tsx
'use client';
import { useState } from 'react';
import ConfigNavbarComponent from '@/src/components/common/ConfigNavbar';
import FinalProductModal from '@/src/components/common/modals/FinalProductModal'; // Importando o modal

export default function CreateFinalProduct() {
  const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar o modal

  // Função para abrir o modal
  const openModal = () => {
    setModalOpen(true); // Apenas alterando o estado para true
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <main>
      <ConfigNavbarComponent openModal={openModal}>
        {null}
      </ConfigNavbarComponent>
      <FinalProductModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}
