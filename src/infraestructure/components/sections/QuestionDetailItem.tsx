import { Fragment, ReactNode } from 'react';
import { Button, Card, CardHeader, Chip, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@nextui-org/react';
import { BoxIcon, CategoryIcon, DimensionsIcon, LinkIcon, QuestionIcon, StarsIcon } from '../icons';

import { QuestionInsideSection } from '../../../domain/models';

import { type NavigateFunction } from '../../../app/hooks/useNavigation';

interface Props {
    question: QuestionInsideSection
    navigate: NavigateFunction,
    onPress: (question?: QuestionInsideSection) => void;
    renderButtonOptions?: (question: QuestionInsideSection) => ReactNode;
}
export const QuestionDetailItem = ({ question, navigate, renderButtonOptions }: Props) => {
    return (
        <div key={question.id} className="my-4 border-2 p-4 rounded-lg cursor-pointer hover:border-emerald-600 transition-all duration-400 relative">
            <span className="font-bold flex items-center text-xs w-11/12">
                <span className="min-w-[3rem] min-h-[3rem] rounded-md flex items-center justify-center bg-emerald-500 text-white mr-2">
                    <QuestionIcon strokeWidth={3} width={28} height={28} />
                </span>
                {question.name}
            </span>
            {
                renderButtonOptions && renderButtonOptions(question)
            }
            <div className="flex flex-wrap my-4 gap-x-2 gap-y-3 overflow-hidden">
                {
                    question?.dimension && (
                        <Fragment>
                            <Tooltip content="Dimensión" radius="sm" color="foreground">
                                <Chip
                                    className="text-[10px]"
                                    variant="faded"
                                    size="sm"
                                    color="secondary"
                                    startContent={<DimensionsIcon width={18} height={18} />}>
                                    {question?.dimension?.name}
                                </Chip>
                            </Tooltip>
                        </Fragment>
                    )
                }
                {
                    question?.category && (
                        <Fragment>
                            <Tooltip content="Categoría" radius="sm" color="foreground">
                                <Chip
                                    className="text-[10px]"
                                    variant="faded"
                                    size="sm"
                                    color="primary"
                                    startContent={<CategoryIcon width={18} height={18} />}>
                                    {question?.category?.name}
                                </Chip>
                            </Tooltip>
                        </Fragment>
                    )
                }
                {
                    question?.domain && (
                        <Fragment>
                            <Tooltip content="Dominio" radius="sm" color="foreground">
                                <Chip
                                    className="text-[10px]"
                                    variant="faded"
                                    size="sm"
                                    color="default"
                                    startContent={<BoxIcon width={18} height={18} />}>
                                    {question?.domain?.name}
                                </Chip>runtime
                            </Tooltip>
                        </Fragment>
                    )
                }
            </div>
            {/* <span className="absolute right-2 top-3 h-full">
                <Button isIconOnly size="sm" className="border-2 bg-transparent" onClick={() => onPress(question)}>
                    <DotsVertical />
                </Button>
            </span> */}
            <div className="absolute right-1 bottom-1 flex gap-x-1">
                {
                    question.type === 'gradable' && (
                        <Popover showArrow backdrop="blur">
                            <PopoverTrigger>
                                <Button
                                    isIconOnly
                                    className="flex items-center text-xs text-emerald-600 hover:bg-emerald-600/20 py-1 px-2 transition-all duration-300 bg-transparent"
                                    size="sm"
                                >
                                    <StarsIcon width={18} height={18} strokeWidth={2} />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Card shadow="none" className="max-w-[22rem] font-bold">
                                    <CardHeader className="[&>svg]:text-emerald-600 [&>svg]:mr-2 font-bold [&>svg]:p-1 [&>svg]:border-2 [&>svg]:rounded-full [&>div>div>span]:font-bold">
                                        <StarsIcon strokeWidth={2} width={30} height={30} />
                                        La pregunta se califica de la siguiente manera
                                    </CardHeader>
                                    <div
                                        className="w-full font-bold gap-x-1 flex flex-wrap"
                                    >
                                        <Chip
                                            className="w-full font-bold cursor-pointer mb-1 hover:bg-emerald-600/10 hover:border-emerald-500 transition-all duration-400"
                                            radius="sm"
                                            variant="dot"
                                            size="sm"
                                            color="success"
                                        >
                                            Siempre : {question.qualification?.alwaysOp}
                                        </Chip>
                                        <Chip
                                            className="w-full font-bold cursor-pointer mb-1 hover:bg-emerald-600/10 hover:border-emerald-500 transition-all duration-400"
                                            radius="sm"
                                            variant="dot"
                                            size="sm"
                                            color="success"
                                        >
                                            Casi siempre: {question.qualification?.almostAlwyasOp}
                                        </Chip>
                                        <Chip
                                            className="w-full font-bold cursor-pointer mb-1 hover:bg-emerald-600/10 hover:border-emerald-500 transition-all duration-400"
                                            radius="sm"
                                            variant="dot"
                                            size="sm"
                                            color="success"
                                        >
                                            Algunas veces: {question.qualification?.sometimesOp}
                                        </Chip>
                                        <Chip
                                            className="w-full font-bold cursor-pointer mb-1 hover:bg-emerald-600/10 hover:border-emerald-500 transition-all duration-400"
                                            radius="sm"
                                            variant="dot"
                                            size="sm"
                                            color="success"
                                        >
                                            Casi nunca: {question.qualification?.almostNeverOp}
                                        </Chip>
                                        <Chip
                                            className="w-full font-bold cursor-pointer mb-1 hover:bg-emerald-600/10 hover:border-emerald-500 transition-all duration-400"
                                            radius="sm"
                                            variant="dot"
                                            size="sm"
                                            color="success"
                                        >
                                            Nunca: {question.qualification?.neverOp}
                                        </Chip>
                                    </div>
                                </Card>
                            </PopoverContent>
                        </Popover>
                    )
                }
                <Tooltip
                    content="Ver detalle de la pregunta"
                    color="foreground"
                >
                    <Button
                        isIconOnly
                        size="sm"
                        className="flex items-center text-xs text-primary hover:bg-primary-100 py-1 px-2 transition-all duration-300 bg-transparent"
                        onClick={() => navigate(`/auth/questions/show/${question.id}`)}
                    >

                        <LinkIcon width={25} height={25} strokeWidth={2} />
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}
