import { useState } from 'react';
import DynamicBox from '@/src/components/common/DynamicBox';
import Header from '../header';
import AcceptButton from '@/src/components/buttons/operation/AcceptButton';
import CancelButton from '@/src/components/buttons/operation/CancelButton';
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
  const [categoria, setCategoria] = useState('');
  const [itensCategoria, setItensCategoria] = useState<string[]>([]);

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

  const adicionarItemCategoria = () => {
    if (categoria && descricao) {
      setItensCategoria((prevItens) => [
        ...prevItens,
        `Categoria: ${categoria}, Descrição: ${descricao}`,
      ]);
      setCategoria(''); 
      setDescricao('');
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
        <div className="flex flex-row h-full">
          <div className="grid md:grid-cols-7 gap-6 mx-auto w-full max-w-screen-lg relative">
          {/* Coluna da esquerda */}
          <div className="col-span-3">
            <label className="font-medium text-lg text-black" htmlFor="Cadastro de Produto Final">
              Cadastro de Produto Final
            </label>
            <div className="mb-4">
            <DynamicBox>
              <form className="flex flex-col gap-4">
                {/* Descrição */}
                <label className="font-medium text-lg text-black" htmlFor="descricao">
                  Descrição
                </label>
                <input
                  type="text"
                  id="descricao"
                  placeholder="Descrição"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full text-black mt-1 border border-greenHortti rounded-lg p-2"
                />

                {/* Categoria */}
                <label className="font-medium text-lg text-black" htmlFor="categoria">
                  Categoria
                </label>
                <select
                  id="categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full text-black mt-1 border border-greenHortti rounded-lg p-2"
                >
                  <option value="">Selecione a categoria</option>
                  <option value="batata">Batata</option>
                  <option value="Cenoura">Cenoura</option>
                </select>
              </form>
            </DynamicBox>
            </div>

            <DynamicBox>
              <form className="flex flex-col gap-4">
                <label className="font-medium text-lg text-black" htmlFor="Materia Prima">
                  Materia Prima
                </label>
                <select
                  id="Materia Prima"
                  value={categoriaMateriaPrima}
                  onChange={(e) => setCategoriaMateriaPrima(e.target.value)}
                  className="w-full text-black mt-1 border border-greenHortti rounded-lg p-2"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="batata Inglesa">Batata Inglesa Media</option>
                  <option value="outra">Outra</option>
                </select>

                <button
                  type="button"
                  onClick={adicionarItemMateriaPrima}
                  className="border rounded-lg w-full p-2 mt-2 mb-4 text-white bg-greenHortti"
                >
                  Adicionar
                </button>
                {/* Separador Horizontal */}
                <div className="flex items-center justify-center">
                  <div className="h-px w-full bg-greenHortti"></div>
                </div>
                {/* Lista de Itens Adicionados com rolagem */}
                <div className="mt-4 max-h-20 overflow-y-auto">
                  <ul className="list-disc ml-5">
                    {itensMateriaPrima.map((item, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span className="w-full text-black mt-1 border border-greenHortti rounded-lg p-2">
                          {item}
                        </span>
                        <button
                          type="button"
                          onClick={() => removerItemMateriaPrima(index)}
                          className="text-red-600 font-semibold border border-red-600 rounded-full py-1 px-2 ml-2"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </form>
            </DynamicBox>
          </div>
          <div className="flex items-center justify-center col-span-1">
            <div className="w-px bg-greenHortti h-full"></div>
          </div>
          {/* Coluna da direita */}
          <div className="col-span-3">
            <label className="font-medium text-lg text-black" htmlFor="Etapas Do Produto Final">
              Etapas Do Produto Final
            </label>
            <DynamicBox>
              <form className="flex flex-col gap-4">
                <label className="font-medium text-lg text-black" htmlFor="Etapa">
                  Etapa
                </label>
                <select
                  id="Etapa"
                  value={categoriaEtapa}
                  onChange={(e) => setCategoriaEtapa(e.target.value)}
                  className="w-full text-black mt-1 border border-greenHortti rounded-lg p-2"
                >
                  <option value="">Selecione a Etapa</option>
                  <option value="descartar">Descascar</option>
                  <option value="lavar">Lavar</option>
                </select>

                <button
                  type="button"
                  onClick={adicionarItemEtapa}
                  className="border rounded-lg w-full p-2 mt-2 mb-4 text-white bg-greenHortti"
                >
                  Adicionar
                </button>

                {/* Lista de Itens Adicionados com rolagem */}
                <div className="mt-4 max-h-20 overflow-y-auto">
                  <ul className="list-disc ml-5">
                    {itensEtapa.map((item, index) => (
                      <li key={index} className="text-black flex justify-between items-center">
                        <span className="w-full text-black mt-1 border border-greenHortti rounded-lg p-2">
                          {item}
                        </span>
                        <button
                          type="button"
                          onClick={() => removerItemEtapa(index)}
                          className="text-red-600 font-semibold border border-red-600 rounded-full py-1 px-2 ml-2"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </form>
            </DynamicBox>

            <DynamicBox>
              <p className="text-black">Adicionar Imagem</p>
              <p className="text-black">Selecione uma Imagem de no máximo 20mb</p>
              <div className="h-40 w-full">
              <img 
                src={imagem} 
                alt="Imagem do Produto" 
                className="mt-2 w-full h-full object-cover rounded-xl" 
              />
              </div>
            </DynamicBox>
            <div className=" flex justify-end space-x-4 mt-6">
                  <AcceptButton
                    title="Finalizar"
                    image="/check-icon.svg"
                    href="/config/raw-material"
                  />
                  <CancelButton
                    title="Cancelar"
                    image="/trash-icon.svg"
                    href="/config/raw-material"
                  />
              </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default FinalProductModal;
