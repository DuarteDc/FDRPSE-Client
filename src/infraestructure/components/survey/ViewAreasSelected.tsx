import { ForwardedRef, forwardRef, useImperativeHandle } from "react"
import { ValidateStep } from "../../../app/utils/dateTimeSteps"
import { areaService } from "../../../domain/services/area.service";


export const ViewAreasSelected = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { areasWithDatetime } = areaService();

    useImperativeHandle(ref, () => ({
        canContinue: () => true
    }));

    return (
        <div>
            <code>
                {JSON.stringify(areasWithDatetime)}
            </code>
            {
                areasWithDatetime.map((area) => (
                    <span className="w-full inline-block py-2 rounded-lg border-[2px] border-emerald-600 px-4 my-2">{area.name}</span>
                ))
            }

        </div>
    )
})
