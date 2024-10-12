import ConfigNavbarComponent from '@/src/components/common/configNavbar';
import Header from '@/src/components/common/header';

export default function createCategory() {
  return (
    <main>
      <Header />
      <ConfigNavbarComponent>
        <div className="text-lg self-center font-semibold">
          <p>Category Component</p>
        </div>
      </ConfigNavbarComponent>
    </main>
  );
}
