import { ChangeEvent, ReactNode } from 'react'
import { Radio, RadioGroup, cn } from '@nextui-org/react'

type OrientationType = 'horizontal' | 'vertical'

interface Props {
    label ?: string;
    children: Array<ReactNode> | ReactNode;
    isInvalid: boolean;
    name: string;
    defautlValue ?: string;
    onValueChange?: (value: string) => void
    value: string;
    errorMessage: string | false | undefined;
    className?: string;
    orientation?: OrientationType;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroupStyled = ({ children, ...props }: Props) => {
    return (
        <RadioGroup
            {...props}
        >
            {children}
        </RadioGroup>
    )
}

interface RadioItemProps {
    title: string;
    value: string;
    icon?: ReactNode;
    description?: string;
}
export const RadioItem = ({ title, icon, ...props }: RadioItemProps) => {
    return (
        <Radio {...props}
            classNames={{
                label: cn(
                    "[&>svg]:text-emerald-600"
                ),
                base: cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between font-bold",
                    "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-2",
                    "data-[selected=true]:border-emerald-500"
                ),
                description: cn(
                    "text-xs"
                )
            }}
        >
            {icon && icon}
            {title}
        </Radio>
    )
}


RadioGroupStyled.RadioItem = RadioItem;

export default RadioGroupStyled;