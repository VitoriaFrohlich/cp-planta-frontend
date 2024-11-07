'use client';
import Header from '@/src/components/common/header';
import SelectInput from '@/src/components/common/inputs/SelectInput';
import CancelButton from '@/src/components/buttons/order/CancelButton';
import NumericInput from '@/src/components/common/inputs/NumericInput';
import DateInput from '@/src/components/common/inputs/DateInput';
import DynamicBox from '@/src/components/common/DynamicBox';
import DefaultInput from '@/src/components/common/inputs/DefaultInput';
import OnClickButton from '@/src/components/buttons/OnClickButton/DefaultOnClick';
import BatchListComponent from '@/src/components/order/BatchListComponent';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import orderServiceInstance from '@/src/services/order.service';
import { useForm } from 'react-hook-form';

export default function CreateBatch() {
  // Mock data
  const router = useRouter();
  // const isFormValidBatchCreate = [];
  const [typesMaterials, setTypesMaterials] = useState<string[]>([]);
  const metrics = ['kg', 'g', 'mg', 'l', 'ml', 'un'];
  const [storageLocations, setStorageLocations] = useState<string[]>([]);
  const [batchId, _] = useState('L01/2310');
  const [items, setItems] = useState<
    { batch: string; rawMaterial: string; quantity: number }[]
  >([]);

  interface FormData {
    raw_material: string;
    dealer: string;
    measure_unit: string;
    current_quantity: number;
    cost_price: number;
    in_date: string;
    stock_id: string;
  }

  const { register, handleSubmit } = useForm<FormData>();

  const fetchStorageLocations = async () => {
    try {
      // Consuming the API
      const response = await orderServiceInstance.api.get('/stock');

      // Iterating over the response data
      response.data.forEach(location => {
        setStorageLocations(oldLocations => [
          ...oldLocations,
          location.description
        ]);
      });
    } catch (error) {
      return null;
    }
  };

  const fetchTypesMaterials = async () => {
    try {
      // Consuming the API
      const response = await orderServiceInstance.api.get('/raw_product');

      // Iterating over the response data
      response.data.forEach(material => {
        setTypesMaterials(oldTypes => [...oldTypes, material.description]);
      });
    } catch (error) {
      return null;
    }
  };

  const fetchBatchMaterials = async () => {
    try {
      // Consuming the API
      const response = await orderServiceInstance.api.get('/batch_material');

      // Iterating over the response data
      response.data.forEach(async batch => {
        setItems(oldItems => [
          ...oldItems,
          {
            batch: batch.sku,
            rawMaterial: batch.raw_material,
            quantity: batch.current_quantity
          }
        ]);
      });
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    fetchStorageLocations();
    fetchTypesMaterials();
    fetchBatchMaterials();
  }, []);

  async function handleFormBatch(data) {
    try {
      // Mock data to be sent to the API
      data.id = '999';
      data.raw_material_id = '999';
      data.initial_quantity = Number(data.current_quantity);
      data.sku = batchId;

      await orderServiceInstance.api.post('/batch_material', data);
      setItems(oldItems => [
        ...oldItems,
        {
          batch: data.sku,
          rawMaterial: data.raw_material,
          quantity: data.current_quantity
        }
      ]);
    } catch (error) {
      return null;
    }
  }

  return (
    <main className="">
      <Header />
      <button
        className=" text-greenHortti pt-10 pl-10"
        onClick={() => router.back()}
      >
        Voltar
      </button>
      <form
        className="w-full flex gap-14 py-7 px-14 justify-center"
        onSubmit={handleSubmit(handleFormBatch)}
      >
        <div className="flex flex-col w-full max-w-[603px] gap-y-11 start">
          <DynamicBox title="Cadastro de Lote">
            <SelectInput
              label="Matéria Prima"
              placeholder="Selecione o tipo"
              options={typesMaterials}
              register={register('raw_material')}
            />
            <DefaultInput
              label="Fornecedor"
              placeholder="Digite o nome do fornecedor"
              register={register('dealer')}
            />
            <NumericInput
              label="Preço custo"
              placeholder="R$ 0,00"
              register={register('cost_price')}
            />
          </DynamicBox>
          <DynamicBox title="Lista de Lotes Cadastrados" collapsible>
            <BatchListComponent itens={items} scrollable />
          </DynamicBox>
        </div>
        <div className="w-[1px] h-auto border border-greenHortti " />
        <div className="flex flex-col gap-y-16 w-full max-w-[603px]">
          <DynamicBox title=" ">
            <SelectInput
              label="Unidade de medida"
              placeholder="Selecione a medida"
              options={metrics}
              register={register('measure_unit')}
            />
            <NumericInput
              label="Quantidade"
              placeholder="Digite a quantidade"
              register={register('current_quantity')}
            />
            <DateInput
              label="Data de entrada"
              placeholder="Selecione a data"
              register={register('in_date')}
            />
            <SelectInput
              label="Local de armazenamento"
              placeholder="Selecione o local"
              options={storageLocations}
              register={register('stock_id')}
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
                type="submit"
                onClick={() => alert('Lote cadastrado com sucesso!')}
              />
              <CancelButton
                title="Cancelar"
                image="/trash-icon.svg"
                href="/home"
              />
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
