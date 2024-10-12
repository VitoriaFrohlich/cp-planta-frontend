import ConfigNavbarComponent from '@/src/components/common/configNavbar';
import Header from '@/src/components/common/header';

export default function createPlace() {
  return (
    <main>
      <Header />
      <ConfigNavbarComponent>
        <div className="text-lg self-center font-semibold text-black">
          <p>Place component</p>
        </div>
      </ConfigNavbarComponent>
    </main> 
  );
}
