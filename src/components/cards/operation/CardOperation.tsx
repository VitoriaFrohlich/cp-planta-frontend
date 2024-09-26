import TrendingIcon from '../../icons/trending-icon.svg';
import FinishedIcon from '../../icons/finished-icon.svg';

type Props = {
  title: string;
  type: 'inProgress' | 'finished';
};

export default function CardOperationInProgress({ title, type }: Props) {
  const typeConfig = {
    inProgress: {
      description: 'Em andamento',
      iconSrc: TrendingIcon.src,
      style:
        'border-[#c25327] border-2 rounded-lg flex w-auto h-auto items-start p-6 gap-x-4 bg-[#fcf3ea]'
    },
    finished: {
      description: 'Finalizado',
      iconSrc: FinishedIcon.src,
      style:
        'border-[#58a587] border-2 rounded-lg flex w-auto h-auto items-start p-6 gap-x-4 bg-[#ebffee]'
    }
  };

  const { description, iconSrc, style } = typeConfig[type];

  return (
    <div className={style}>
      <img className="w-6" src={iconSrc} alt="Icon" />
      <div className="flex flex-col text-start gap-y-1">
        <h3 className="text-xl font-bold text-[#1c4060]">{title}</h3>
        <p className="text-[#757575] text-sm uppercase">{description}</p>
      </div>
    </div>
  );
}
