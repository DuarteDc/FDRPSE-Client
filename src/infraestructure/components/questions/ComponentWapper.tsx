import { Fragment } from 'react';
interface Props {
    children: any;
}

export const ComponentWapper = ({ children }: Props) => {
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}
