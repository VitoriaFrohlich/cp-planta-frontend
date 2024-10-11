import ConfigNavbarComponent from '@/src/components/common/ConfigNavbar';

export default function createStep() {
  return (
    <main>
      <ConfigNavbarComponent>
        <div className="text-lg self-center font-semibold">
          <p>Step component</p>
        </div>
      </ConfigNavbarComponent>
    </main>
  );
}
