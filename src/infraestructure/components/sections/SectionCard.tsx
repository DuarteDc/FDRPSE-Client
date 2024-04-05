import { DragEvent, ReactNode, memo } from 'react';
import { DotsVertical, EyeIcon, SectionIcon } from '../icons';
import { Section } from '../../../domain/models';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, cn } from '@nextui-org/react';

interface Props {
  section: Section
  draggable: boolean
  onDragStart?: (event: DragEvent<HTMLDivElement>, section: Section) => void;
  onDragEnd?: () => void;
  classList?: string;
  showControlls?: boolean;
  handleSelectSection?: (section: Section) => void;
  renderContent?: () => ReactNode
  onClick?: () => void;
}

const className = 'shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-[1.02]  hover:lg:scale-[1.01] w-full'

export const SectionCard = memo(({ section, draggable = false, onDragStart, onDragEnd, classList = className, showControlls = false, handleSelectSection, renderContent, ...props }: Props) => {

  return (
    <div
      className={classList}
      draggable={draggable}
      onDragStart={(event) => { onDragStart && onDragStart(event, section) }}
      onDragEnd={() => { onDragEnd && onDragEnd() }}
      {...props}
    >
      {
        renderContent && renderContent()
      }
      <div>
        <span className="lg:w-[4rem] lg:h-[4rem] w-[3rem] h-[3rem] text-emerald-600 border-2 mx-4 flex items-center justify-center rounded-full">
          <SectionIcon width={30} height={30} strokeWidth={1.5} />
        </span>
      </div>
      <div className="relative w-full">
        <h2 className="font-bold text-[10px] break-normal">{section.name}</h2>
        {
          section.binary && (
            <p className="text-[9px] text-gray-500 font-bold">{section.question}</p>
          )
        }
      </div>
      {
        showControlls && (
          <span className="flex items-center [&>svg]:hover:text-emerald-600">
            <Dropdown
              showArrow
            >
              <DropdownTrigger>
                <Button className="bg-transparent max-w-1 px-0 border-2" isIconOnly>
                  <DotsVertical />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="flat" aria-label="Dropdown menu with description">
                <DropdownItem
                  key="new"
                  onClick={() => handleSelectSection && handleSelectSection(section)}
                  classNames={{
                    base: cn(
                      "font-bold text-red-600",
                      "font-bold"
                    )
                  }}
                  startContent={
                    <span className="bg-emerald-600/80 rounded-lg p-2 text-white">
                      <EyeIcon />
                    </span>
                  }
                  title="Detalles"
                  description="Ver las preguntas dentro de la sección"
                />
              </DropdownMenu>
            </Dropdown>
          </span>
        )
      }
    </div>
  )
});
