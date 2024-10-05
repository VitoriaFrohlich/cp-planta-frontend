import ConfigNavbarComponent from '@/src/components/common/ConfigNavbar';

export default function createCategory() {
  return (
    <main>
      <ConfigNavbarComponent>
        <div className="text-lg self-center font-semibold">
          <p>Category Component</p>
        </div>
      </ConfigNavbarComponent>
    </main>
  );
}
