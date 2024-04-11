import { ForwardedRef, forwardRef } from 'react';

import { ValidateStep } from '../../../app/utils/surveySteps';

export const ViewTimeLineAreas = forwardRef<ValidateStep>((__, _: ForwardedRef<ValidateStep>) => {



    return (
        <div className="w-full relative after:w-2 after:bg-emerald-600 after:rounded-full after:left-0 after:right-0 after:m-auto after:absolute
        after:min-h-fit after:h-full after:top-0 after:bottom-0 animate-[fadeIn_0.5s]">
            {/* {
                areasMemorized.map((area, index) => (
                    <div key={area.id} className={`border-2 p-4 rounded-lg mx-2 w-[calc(50%-40px)] ${index % 2 === 0 ? ' float-left clear-right before:-right-2 before:rotate-180 after:-right-11' : ' float-right clear-left before:-left-2 after:-left-11'}
                        shadow-xl shadow-emerald-600/10
                        hover:border-emerald-600 transition-all duration-500 cursor-pointer text-xs relative
                        before:w-0 before:h-0 before:border-y-8 before:border-y-solid before:border-y-transparent before:absolute before:z-20
                        before:border-r-8 before:border-r-solid before:hover:border-r-emerald-600 before:top-0 before:bottom-0 before:my-auto
                        before:transition-all before:duration-500
                        after:h-5 after:w-5 after:absolute after:bg-emerald-500 after:my-auto after:top-0 after:bottom-0 after:rounded-full
                        after:z-20 after:hover:bg-emerald-400 after:transition-all after:duration-500 [&>span>p>svg]:text-emerald-600
                    `}>
                        <h3 className="text-xs lg:text-lg bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 text-transparent bg-clip-text font-bold">{area.name}</h3>

                        <span className="text-[10px] hidden lg:inline-flex font-bold [&>svg]:text-emerald-600 lg:mr-2 lg:py-1 rounded-full border-2 px-2 [&>svg]:mr-2 border-emerald-600 mb-1">
                            <p className="lg:flex items-center hidden capitalize"><CalendarMonth height={20} width={20} /> {parseDate(area.startDate!)}</p>
                        </span>
                        <span className="text-[10px] hidden lg:inline-flex font-bold [&>svg]:text-emerald-600 lg:mr-2 lg:py-1 rounded-full border-2 px-2 [&>svg]:mr-2 border-emerald-600 mb-1">
                            <p className="lg:flex items-center hidden capitalize"><CalendarMonth height={20} width={20} /> {parseDate(area.endDate!)}</p>
                        </span>
                        <b className="flex items-center lg:hidden text-[8px]">{format(area.startDate!, 'P h:mm a', { locale: es })}</b>
                        <b className="flex items-center lg:hidden text-[8px]">{format(area.endDate!, 'P h:mm a', { locale: es })}</b>

                    </div>
                ))
            } */}
        </div>
    )
})
