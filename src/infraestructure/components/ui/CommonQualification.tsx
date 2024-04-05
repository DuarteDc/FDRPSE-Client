import { Badge } from '@nextui-org/react';
import { CategoryQualifications, DomainQualifications } from '../../../domain/models';
import { CheckIcon } from '../icons';
import { QualificationTypeFrom, SelectionType } from '../questions/FormQuestion';

interface Props {
    item: CategoryQualifications | DomainQualifications | null;
    selectQualification: (item: QualificationTypeFrom) => void;
    selectedItem: Array<QualificationTypeFrom>;
    type?: SelectionType,
}

export const CommonQualification = ({ item, selectQualification, selectedItem, type }: Props) => {

    const currentItem = (qualificationId: number) => {
        return selectedItem.find(selectedItem => selectedItem.qualificationId === qualificationId)
    }
    
    return (
        <div>
            <span className="mb-5 block col-span-7">
                {
                    type === 'categories' ? (
                        <p className="text-gray-500 font-bold text-xs">La categoría cuenta con dos calificaciones, escoge una para continuar</p>
                    ) : (
                        <p className="text-gray-500 font-bold text-xs">El dominio cuenta con dos calificaciones, escoge una para continuar</p>
                    )
                }
            </span>
            <span className="font-bold text-sm">{item?.name}</span>
            <div className="[&>div>div>span]:block [&>div]:w-full">
                {
                    item?.qualifications.map((qualification) => (
                        <Badge
                            isOneChar
                            content={currentItem(qualification.id) && <CheckIcon />}
                            key={qualification?.id}
                            className={currentItem(qualification.id) ? "bg-emerald-500 text-white border-emerald-500" : "bg-gray-50"}
                            placement="top-right"
                        >
                            <div
                                onClick={() => selectQualification({ type: type!, qualificationId: qualification.id })}
                                className={`w-full border-2 p-2 rounded-lg my-2 text-xs hover:border-emerald-600 transition-all duration-400 cursor-pointer [&>span>b]:mr-2 font-bold [&>span>b]:text-emerald-600
                                ${currentItem(qualification.id) ? 'border-emerald-500 scale-[1.02]' : 'hover:border-emerald-500/50 hover:scale-[1.01] hover:transition-all hover:duration-300'}`
                                }
                            >
                                <span><b>Nula o despreciable:</b>{qualification?.despicable}</span>
                                <span><b>Baja:</b>{qualification?.low}</span>
                                <span><b>Media:</b>{qualification?.middle}</span>
                                <span><b>Alta:</b>{qualification?.high}</span>
                                <span><b>Muy alta:</b>{qualification?.veryHigh}</span>
                            </div>
                        </Badge>
                    ))
                }
            </div>
        </div>
    )
}
