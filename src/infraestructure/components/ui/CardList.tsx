import { ReactNode } from 'react';
import { Card } from './';
import { SkeletonCard } from './skeleton';

interface Props {
    data: Array<any>;
    loading: boolean;
    children?: ReactNode;
    onPress?: (item: any) => void;
}

const CardList = ({ data, loading, children, onPress }: Props) => {
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
                                data?.map(({ id, name, ...rest }) => (
                                    <Card title={name} key={id} onPress={onPress} item={{ id, name, ...rest }} />
                                ))
                            }
                        </>
                    )
            }
        </>
    )
}

export interface CreateItemCardProps {
    title: string;
    subtitle?: string;
    image?: string | JSX.Element;
    onPress?: (item: any) => void;
    item?: any;
}
const CreateItem = ({ ...props }: CreateItemCardProps) => <Card {...props} />


CardList.CreateItem = CreateItem;

export default CardList;