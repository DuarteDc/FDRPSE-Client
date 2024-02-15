import { NavigateFunction } from 'react-router-dom';

import { Category } from '../../../domain/models';

import { Card } from '../ui';
import { PlusIcon } from '../icons';
import { SkeletonCard } from '../ui/skeleton';

interface Props {
    categories  : Array<Category>;
    loading     : boolean;
    navigate    : NavigateFunction
}
export const CategoriesList = ({ categories, loading, navigate }: Props) => {
    
    return (
        <>
            {
                loading ? <SkeletonCard /> :
                    (
                        <>
                            <Card 
                                title="Crear categoría"  
                                onPress={() => navigate('/auth/auth/categories/create')} 
                                image={<PlusIcon width={50} height={50} />} 
                            />
                            {
                                categories?.map(({ id, name }) => (
                                    <Card title={name} key={id} />
                                ))
                            }
                        </>
                    )
            }
        </>
    )
}
