import Header from '@/src/components/common/header';
import SelectInput from '@/src/components/common/inputs/SelectInput';
import NumericInput from '@/src/components/common/inputs/NumericInput';
import DateInput from '@/src/components/common/inputs/DateInput';
import DynamicBox from '@/src/components/common/DynamicBox';
import DefaultInput from '@/src/components/common/inputs/DefaultInput';

export default function CreateBatch() {
  // Mock data
  const typesMaterials = ["Batata", "Cenoura", "Tomate"];
  const metrics = ['kg', 'g', 'mg', 'l', 'ml', 'un'];
  const storageLocations = ['Freezer 1', 'Freezer 2'];
  const batchId = 'L01/2310';

  return (
    <main className="">
      <Header />
      <div className="w-full flex mt-10 gap-14 px-14">
        <div className=" flex flex-col w-full max-w-[603px]">
          <DynamicBox title="Cadastro de Lote">
            <SelectInput 
              label="Matéria Prima"
              placeholder="Selecione o tipo"
              options={typesMaterials}
            />
            <DefaultInput 
              label = "Fornecedor"
              placeholder = "Digite o nome do fornecedor"
            />
            <NumericInput 
              label = "Preço custo"
              placeholder = "R$ 0,00"
            />
          </DynamicBox>
        </div>
        <div className="w-[1px] h-auto border border-greenHortti " />
        <div className="flex flex-col gap-y-16 w-full max-w-[603px]">
          <DynamicBox title=' '>
            <SelectInput
              label="Unidade de medida"
              placeholder="Selecione a medida"
              options={metrics}
            />
            <NumericInput label="Quantidade" placeholder="Digite a quantidade" />
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
        </div>
      </div>
    </main>
  );
}
