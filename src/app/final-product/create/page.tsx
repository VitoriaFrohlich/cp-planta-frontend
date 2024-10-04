import NavbarButtonComponent from '@/src/components/buttons/config/navbarButton';

export default function FinalProductCreate() {
  return (
    <main>
      <div className="flex">
        <h1 className="text-black w-full self-start text-2xl font-semibold my-3 ml-3">
          Cadastros
        </h1>
      </div>
      <div className="flex flex-row">
        <NavbarButtonComponent
          href="/raw-material/create"
          title="Matéria-Prima"
        />
        <NavbarButtonComponent
          href="/final-product/create"
          title="Produto Final"
        />
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p>final-product</p>
      </div>
    </main>
  );
}
