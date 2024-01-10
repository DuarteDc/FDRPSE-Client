import { Fragment, ReactNode } from 'react'

interface Props {
    children: () => JSX.Element;
}

export const ComponentWapper = ({ children }: Props) => {
    return (
        <Fragment>
            {children()}
        </Fragment>
    )
}
