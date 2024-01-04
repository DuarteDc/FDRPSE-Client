import { useContext, useState } from 'react';
import { CategoryContext } from '../../infraestructure/context/category';
import { categoriesRepository } from '../../infraestructure/repositories/categories.respository';
import { CreateCategoryDto } from '../../infraestructure/http/dto/categories';

export const categoriesService = () => {

    const [loading, setLoading] = useState(false);
    const { dispatch, categories } = useContext(CategoryContext);

    const startGetCategories = async (): Promise<void> => {
        setLoading(true);
        const categories = await categoriesRepository.getCategories();
        typeof categories !== 'string' && dispatch({ type: 'CATEGORY - Start load categories', payload: categories });
        setLoading(false);
    }

    const startCreateCategory = async (createCategoryDto: CreateCategoryDto): Promise<void> => {
        setLoading(true);
        await categoriesRepository.createCategory(createCategoryDto);
        setLoading(false);
    }

    return {
        loading,
        categories,
        startGetCategories,
        startCreateCategory,
    }
}
