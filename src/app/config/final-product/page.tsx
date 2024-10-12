import ConfigNavbarComponent from '@/src/components/common/configNavbar';
import Header from '@/src/components/common/header';

export default function createFinalProduct() {
  return (
    <main>
      <Header />
      <ConfigNavbarComponent>
        <div className="text-lg self-center font-semibold">
          <p>Final product component</p>
        </div>
      </ConfigNavbarComponent>
    </main>
  );
}
