import ButtonStock from '../../buttons/stock/ButtonStock';

export default function InventorySection() {
  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-3xl text-[#757575]">Estoques</h2>
      <div className="flex gap-x-8">
        <ButtonStock
          description="Estoque de Matéria Prima"
          image="/fruits.svg"
          href="/raw-material/stock"
        />
        <ButtonStock
          description="Estoque de Produtos Finais"
          image="/honey-comb.svg"
          href="/final-product/stock"
        />
      </div>
    </div>
  );
}
