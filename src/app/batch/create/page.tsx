'use client';
import Header from '@/src/components/common/header';
import SelectInput from '@/src/components/common/inputs/SelectInput';
import CancelButton from '@/src/components/buttons/order/CancelButton';
import NumericInput from '@/src/components/common/inputs/NumericInput';
import DateInput from '@/src/components/common/inputs/DateInput';
import DynamicBox from '@/src/components/common/DynamicBox';
import DefaultInput from '@/src/components/common/inputs/DefaultInput';
import OnClickButton from '@/src/components/buttons/OnClickButton/DefaultOnClick';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DefaultListItems from '@/src/components/common/lists/DefaultListItems';
import Image from 'next/image';
import ReturnIcon from '@/src/components/icons/return-icon.svg';


export default function CreateBatch() {
  // Mock data
  const router = useRouter();
  // const isFormValidBatchCreate = [];
  const typesMaterials = ['Batata', 'Cenoura', 'Tomate'];
  const metrics = ['kg', 'g', 'mg', 'l', 'ml', 'un'];
  const storageLocations = ['Freezer 1', 'Freezer 2'];
  const batchId = 'L01/2310';
  const [items, _] = useState([
    { batch: 'L01/2301', rawMaterial: 'Batata Branca Grande', quantity: 80 },
    { batch: 'L01/2304', rawMaterial: 'Cenoura', quantity: 50 },
    { batch: 'L01/2309', rawMaterial: 'Maçã Fuji', quantity: 7 }
  ]);

  return (
    <main className="">
      <Header />
      <div className="w-full flex gap-14 py-7 px-14 justify-center">
        <div className="flex flex-col w-full max-w-[603px] gap-y-11 start">
            <button
            className=" text-greenHortti return-button "
            onClick={() => router.push('/home')}
          >
                  <Image src={ReturnIcon} alt="Retornar" width={14} height={14} />
          </button>
          <DynamicBox title="Cadastro de Lote">
            <SelectInput
              label="Matéria Prima"
              placeholder="Selecione o tipo"
              options={typesMaterials}
            />
            <DefaultInput
              label="Fornecedor"
              placeholder="Digite o nome do fornecedor"
            />
            <NumericInput label="Preço custo" placeholder="R$ 0,00" />
          </DynamicBox>
          <DynamicBox title="Lista de Lotes Cadastrados" collapsible>
            <DefaultListItems
              items={items}
              columns={[
                { key: 'batch', type: 'text'},
                { key: 'rawMaterial', type: 'text'},
                { key: 'quantity', type: 'text'},
               ]}
            />
          </DynamicBox>
        </div>
        <div className="w-[1px] h-auto border border-greenHortti " />
        <div className="flex flex-col gap-y-16 w-full max-w-[603px]">
          <DynamicBox title=" ">
            <SelectInput
              label="Unidade de medida"
              placeholder="Selecione a medida"
              options={metrics}
            />
            <NumericInput
              label="Quantidade"
              placeholder="Digite a quantidade"
            />
            <DateInput label="Data de entrada" placeholder="Selecione a data" />
            <SelectInput
              label="Local de armazenamento"
              placeholder="Selecione o local"
              options={storageLocations}
            />
          </DynamicBox>
          <DynamicBox extraStyle="text-center flex flex-col gap-y-6">
            <p className="text-graySubtitleHortti text-sm">
              Identificador gerado automaticamente
            </p>
            <h3 className="text-black text-2xl font-bold">{batchId}</h3>
          </DynamicBox>
          <div className="flex w-auto justify-between gap-4">
            <div className="w-full h-auto flex space-x-2">
              <OnClickButton
                className={
                  'w-full h-auto py-2 px-4 rounded-lg flex items-center justify-items-center bg-greenHortti text-white  hover:bg-green-700'
                }
                title="Finalizar"
                image="/check-icon.svg"
                onClick={() => alert('Lote cadastrado com sucesso!')}
              />
              <CancelButton
                title="Cancelar"
                image="/trash-icon.svg"
                href="/home"
              />
            </div>
            {/* <button
              className="bg-greenHortti text-white px-20 py-2 rounded-lg hover:bg-green-700 flex items-center w-full justify-center"
              onClick={() => alert('Lote cadastrado com sucesso!')}
            >
              <Image src={checkIcon} alt="Adicionar" width={14} height={14} />
              <span className="ml-2 text-sm">Finalizar</span>
            </button>
            <button
              className="bg-black text-white px-20 py-2 rounded-lg hover:bg-green-700 flex items-center w-full justify-center"
              onClick={() => (window.location.href = '/home')}
            >
              <Image src={returnIcon} alt="Adicionar" width={14} height={14} />
              <span className="ml-2 text-sm">Retornar</span>
            </button>*/}
          </div>
        </div>
      </div>
    </main>
  );
}
