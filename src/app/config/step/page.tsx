import ConfigNavbarComponent from '@/src/components/common/configNavbar';
import Header from '@/src/components/common/header';

export default function createStep() {
  return (
    <main>
      <Header />
      <ConfigNavbarComponent>
        <div className="text-lg self-center font-semibold">
          <p>Step component</p>
        </div>
      </ConfigNavbarComponent>
    </main>
  );
}
