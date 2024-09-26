import ButtonStock from '../../buttons/stock/button-stock';

export default function InventorySection() {
  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-3xl">Estoques</h2>
      <div className="flex gap-x-8">
        <ButtonStock
          description="Estoque de Matéria Prima"
          image="/fruits.svg"
          href="/raw-material/stock"
        />
        <ButtonStock
          description="Estoque de Produtos Finais"
          image="/honeycomb.svg"
          href="/final-product/stock"
        />
      </div>
    </div>
  );
}
