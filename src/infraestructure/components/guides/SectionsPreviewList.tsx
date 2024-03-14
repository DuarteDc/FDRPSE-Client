import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { SectionQuesions } from "../../../domain/models"
import { DotsVertical, EyeIcon, SectionIcon } from "../icons";
import { Fragment } from "react/jsx-runtime";
import { SkeletonPreviewSectionList } from "../ui/skeleton";

interface Props {
    sections: Array<SectionQuesions>;
    loading: boolean;
    onOpen: () => void;
    findSection: (section: SectionQuesions) => void;
}

export const SectionsPreviewList = ({ sections, onOpen, findSection, loading }: Props) => {
    return (
        <Fragment>
            {
                loading ? (
                    <SkeletonPreviewSectionList skeletonItems={sections.length} />
                ) : (
                    sections.map((section) => (

                        <div key={section.id} className="border-2 mb-2 rounded-lg flex justify-between pr-5 items-center pb-2 hover:border-emerald-600 cursor-pointer transition-all duration-400">
                            <div>
                                <p className="font-bold text-xs pl-5 mt-2 flex items-center [&>svg]:text-emerald-600 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-2 [&>svg]:mr-2">
                                    <SectionIcon width={40} height={40} strokeWidth={2.5} />
                                    {section.name}
                                </p>
                                {
                                    section.binary && (
                                        <p className="text-gray-500 font-bold text-xs pl-20 mb-4">{section.question}</p>
                                    )
                                }
                                {
                                    section.questions?.map((question) => (
                                        <p className="text-gray-500 font-bold pl-24 text-xs" key={question.id}>{question.name}</p>
                                    ))
                                }
                            </div>
                            <span className="flex items-center [&>svg]:hover:text-emerald-600">
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button className="bg-transparent max-w-1 px-0 border-2" isIconOnly>
                                            <DotsVertical />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                        <DropdownItem
                                            key="new"
                                            onClick={() => { onOpen(); findSection(section) }}
                                            className="font-bold"
                                            title="Vista previa"
                                            description="Vista previa de lo que el usuario verá"
                                            startContent={
                                                <span className="bg-emerald-600/80 rounded-lg p-2 text-white">
                                                    <EyeIcon />
                                                </span>
                                            }
                                        >
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </span>
                        </div>
                    ))
                )
            }
        </Fragment>

    )
}
