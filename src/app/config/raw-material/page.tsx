'use client';
import ConfigNavbarComponent from '@/src/components/common/configNavbar';
import Header from '@/src/components/common/header';
import { useState } from 'react';

// Componente de lista de matérias-primas
const RawMaterialItem = ({ name, quantity }: { name: string, quantity: number }) => (
  <div className="flex items-center justify-between border rounded-lg p-4 my-2 bg-white shadow">
    <img
      src={`/${name.toLowerCase()}.jpg`}
      alt={name}
      className="w-24 h-16 rounded-lg object-cover"
    />
    <span className="text-xl font-semibold">{name}</span>
    <span className="text-lg">{quantity} lotes</span>
    <div className="flex space-x-4">
      <button className="text-greenHortti font-bold">✏️</button>
      <button className="text-red-600 font-bold">🗑️</button>
    </div>
  </div>
);

export default function RawMaterialConfig() {
  const [searchTerm, setSearchTerm] = useState('');
  const [materials, setMaterials] = useState([
    { name: 'Batata Branca', quantity: 8 },
    { name: 'Cenoura', quantity: 5 },
    { name: 'Maçã Fuji', quantity: 7 },
  ]);

  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <Header />
      <ConfigNavbarComponent>
        <div className="px-16 pb-8">
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              className="border p-3 rounded-lg w-1/3"
              placeholder="Pesquise..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button className="bg-greenHortti text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700">
              ➕ Adicionar
            </button>
          </div>
          
          <div className="space-y-4">
            {filteredMaterials.map((material, index) => (
              <RawMaterialItem
                key={index}
                name={material.name}
                quantity={material.quantity}
              />
            ))}
          </div>
          
          <div className="mt-8">
            <button className="bg-gray-300 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400">
              ↩️ Retornar
            </button>
          </div>
        </div>
      </ConfigNavbarComponent>
    </main>
  );
}
