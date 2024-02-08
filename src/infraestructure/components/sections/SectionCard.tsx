import { SectionIcon } from '../icons';
import { Section } from '../../../domain/models';

interface Props {
  section: Section
}

export const SectionCard = ({ section }: Props) => {
  return (
    <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105">
      <div>
        
        <span className="lg:w-[4rem] lg:h-[4rem] w-[3rem] h-[3rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
          <SectionIcon width={30} height={30} />
        </span>
      </div>
      <div className="relative w-full">
        {/* <span className="text-xs right-0 top-0 absolute">{section.questionCount}</span> */}
        <h2 className="font-bold text-sm">{section.name}</h2>
        {
          section.binary && (
            <p className="text-xs text-gray-500 font-bold">{section.question}</p>
          )
        }
      </div>
    </div>
  )
}
