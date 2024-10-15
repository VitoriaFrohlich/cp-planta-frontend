import { useState } from 'react';
import DynamicBox from '@/src/components/common/DynamicBox';
import Header from '../header';

interface FinalProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FinalProductModal: React.FC<FinalProductModalProps> = ({ isOpen, onClose }) => {
  const [descricao, setDescricao] = useState('');
  const [categoriaMateriaPrima, setCategoriaMateriaPrima] = useState('');
  const [categoriaEtapa, setCategoriaEtapa] = useState('');
  const [itensMateriaPrima, setItensMateriaPrima] = useState<string[]>([]);
  const [itensEtapa, setItensEtapa] = useState<string[]>([]);
  const [imagem, setImagem] = useState<string>('/fruits.svg');

  if (!isOpen) return null;

  const adicionarItemMateriaPrima = () => {
    if (categoriaMateriaPrima) {
      setItensMateriaPrima((prevItens) => [...prevItens, categoriaMateriaPrima]);
      setCategoriaMateriaPrima('');
    }
  };

  const adicionarItemEtapa = () => {
    if (categoriaEtapa) {
      setItensEtapa((prevItens) => [...prevItens, categoriaEtapa]);
      setCategoriaEtapa('');
    }
  };

  const removerItemMateriaPrima = (index: number) => {
    setItensMateriaPrima((prevItens) => prevItens.filter((_, i) => i !== index));
  };

  const removerItemEtapa = (index: number) => {
    setItensEtapa((prevItens) => prevItens.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-5 w-full h-full flex flex-col">
        <Header />
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">X</button>
        <div className="flex flex-row justify-between h-full">
          {/* Coluna da esquerda */}
          <div className="flex-1 mr-2">
            <DynamicBox title="Cadastro de Produto Final">
              <form className="flex flex-col gap-4">
                <label className="font-medium text-lg text-black" htmlFor="descricao">
                  Descrição
                </label>
                <input
                  type="text"
                  id="descricao"
                  placeholder="Descrição"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 text-black"
                />
              </form>
            </DynamicBox>

            <DynamicBox>
              <form className="flex flex-col gap-4">
                <label className="font-medium text-lg text-black" htmlFor="Materia Prima">
                  Materia Prima
                </label>
                <select
                  id="Materia Prima"
                  value={categoriaMateriaPrima}
                  onChange={(e) => setCategoriaMateriaPrima(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 text-black"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="batata Inglesa">Batata Inglesa Media</option>
                  <option value="outra">Outra</option>
                </select>

                <button
                  type="button"
                  onClick={adicionarItemMateriaPrima}
                  className="mt-4 bg-green-500 text-white rounded-lg p-2 hover:bg-green-600"
                >
                  Adicionar
                </button>

                {/* Lista de Itens Adicionados com rolagem */}
                <div className="mt-4 max-h-20 overflow-y-auto">
                  <h2 className="font-medium text-lg text-black">Itens Adicionados:</h2>
                  <ul className="list-disc ml-5">
                    {itensMateriaPrima.map((item, index) => (
                      <li key={index} className="text-black flex justify-between items-center">
                        {item}
                        <button
                          type="button"
                          onClick={() => removerItemMateriaPrima(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </form>
            </DynamicBox>
          </div>

          {/* Coluna da direita */}
          <div className="flex-1 ml-2">
            <DynamicBox title="Etapas Do Produto Final">
              <form className="flex flex-col gap-4">
                <label className="font-medium text-lg text-black" htmlFor="Etapa">
                  Etapa
                </label>
                <select
                  id="Etapa"
                  value={categoriaEtapa}
                  onChange={(e) => setCategoriaEtapa(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 text-black"
                >
                  <option value="">Selecione a Etapa</option>
                  <option value="descartar">Descascar</option>
                  <option value="lavar">Lavar</option>
                </select>

                <button
                  type="button"
                  onClick={adicionarItemEtapa}
                  className="mt-4 bg-green-500 text-white rounded-lg p-2 hover:bg-green-600"
                >
                  Adicionar
                </button>

                {/* Lista de Itens Adicionados com rolagem */}
                <div className="mt-4 max-h-20 overflow-y-auto">
                  <h2 className="font-medium text-lg text-black">Itens Adicionados:</h2>
                  <ul className="list-disc ml-5">
                    {itensEtapa.map((item, index) => (
                      <li key={index} className="text-black flex justify-between items-center">
                        {item}
                        <button
                          type="button"
                          onClick={() => removerItemEtapa(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </form>
            </DynamicBox>

            <DynamicBox>
              <p className="text-black">Adicionar Imagem</p>
              <p className="text-black">Selecione uma Imagem de no maximo 20mb</p>
              <img 
              src={imagem} 
              alt="Imagem do Produto" 
              className="mt-2 w-full h-60" 
              />
            </DynamicBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalProductModal;
