import Header from '@/src/components/common/header';
import SelectInput from '@/src/components/common/inputs/SelectInput';
import NumericInput from '@/src/components/common/inputs/NumericInput';
import DateInput from '@/src/components/common/inputs/DateInput';
import DynamicBox from '@/src/components/common/DynamicBox';

export default function CreateBatch() {
  // Mock data
  const metrics = ['kg', 'g', 'mg', 'l', 'ml', 'un'];
  const storageLocations = ['Freezer 1', 'Freezer 2'];

  return (
    <main className="">
      <Header />
      <DynamicBox>
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
    </main>
  );
}
