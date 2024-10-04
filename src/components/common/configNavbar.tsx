import NavbarButtonComponent from '../buttons/config/navbarButton';

/* eslint-disable prettier/prettier */
export default function configNavbarComponent() {
  return (
    <div>
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
        <NavbarButtonComponent href="/final-product/create" title="Ordem" />
      </div>
    </div>
  );
}
