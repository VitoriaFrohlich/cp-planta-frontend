// src/components/common/ConfigNavbar.tsx
'use client';
import { usePathname } from 'next/navigation';
import NavbarButtonComponent from '../buttons/config/navbarButton';

interface navbarProps {
  openModal: () => void; 
  children: React.ReactNode;
}

const ConfigNavbar: React.FC<navbarProps> = ({ openModal, children }) => {
  const pathname = usePathname();
  
  const isSelected = (href: string) => pathname === href;

  return (
    <div>
      <nav className="my-8">
        <h1 className="text-black w-full self-start text-2xl font-semibold my-3 ml-3">
          Painel de Configuração
        </h1>
        <div className="flex flex-row w-full justify-between space-x-4 px-16 my-6">
          <NavbarButtonComponent
            href="/config/raw-material"
            title="Matéria-Prima"
            selected={isSelected('/config/raw-material')}
          />
          <NavbarButtonComponent
            href="/config/final-product" 
            title="Produto Final"
            selected={isSelected('/config/final-product')}
            onClick={openModal} 
          />
          <NavbarButtonComponent
            href="/config/category"
            title="Categoria"
            selected={isSelected('/config/category')}
          />
          <NavbarButtonComponent
            href="/config/step"
            title="Etapa"
            selected={isSelected('/config/step')}
          />
          <NavbarButtonComponent
            href="/config/place"
            title="Local"
            selected={isSelected('/config/place')}
          />
        </div>
        <div className="w-auto h-px bg-greenHortti mx-16"></div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default ConfigNavbar;
