import { ReactNode } from 'react';
import { Card } from './';
import { SkeletonCard } from './skeleton';

interface Props {
    data        : Array<any>;
    loading     : boolean;
    children    ?: ReactNode;
}

const CardList = ({ data,loading, children }: Props) => {
    return (
        <>
            {
                loading ? <SkeletonCard /> :
                    (
                        <>
                            {
                                children
                            }
                            {
                                data?.map(({ id, name }) => (
                                    <Card title={name} key={id} />
                                ))
                            }
                        </>
                    )
            }
        </>
    )
}

export interface CreateItemCardProps {
    title        : string;
    subtitle    ?: string;
    image       ?: string | JSX.Element;
    onPress     ?: () => void;
}
const CreateItem = ({ ...props }: CreateItemCardProps) => <Card {...props} />


CardList.CreateItem = CreateItem;

export default CardList;