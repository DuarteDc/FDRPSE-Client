import { useContext, useState } from 'react';
import { CategoryContext } from '../../infraestructure/context/category';
import { categoriesRepository } from '../../infraestructure/repositories/categories.respository';
import { SetNameToCategory } from '../../infraestructure/http/dto/categories';
import { useNavigate } from 'react-router-dom';
import { CommonQualifictions } from '../../infraestructure/components/ui/FormQualification';
import { AddQualificationDto } from '../../infraestructure/http/dto/categories/AddQualificationDto';

export const categoriesService = () => {

    const [loading, setLoading] = useState(false);
    const { dispatch, categories, category, categoriesQualifications } = useContext(CategoryContext);
    const navigate = useNavigate();

    const startGetCategories = async (): Promise<void> => {
        setLoading(true);
        const categories = await categoriesRepository.getCategories();
        typeof categories !== 'string' && dispatch({ type: 'CATEGORY - Start load categories', payload: categories });
        setLoading(false);
    }

    const startCreateCategory = async (setNameToCategory: SetNameToCategory, qualifications: Array<CommonQualifictions>): Promise<void> => {
        setLoading(true);
        const { success } = await categoriesRepository.createCategory({ ...setNameToCategory, qualifications });
        success && navigate(-1);
        setLoading(false);
    }

    const startGetCategoriesWithQualifications = async (): Promise<void> => {
        setLoading(true);
        const categories = await categoriesRepository.getCategoriesWithQualification();
        typeof categories !== 'string' && dispatch({ type: 'CATEGORY - Start load categories with qualifications', payload: categories });
        setLoading(false);
    }

    const startGetCategoryWithQualifications = async (categoryId: string): Promise<void> => {
        if (categoryId === category?.id) return;
        const response = await categoriesRepository.getCategoryWithQualifications(categoryId);
        typeof response !== 'string' && dispatch({ type: 'CATEGORY - Start load category with qualifications', payload: response });
        setLoading(false);
    }

    const startAddQualification = async (categoryId: string, qualification: AddQualificationDto) => {
        setLoading(true);
        const category = await categoriesRepository.addQualificationCategory(categoryId, qualification);
        typeof category !== 'string' && dispatch({ type: 'CATEGORY - Start add qualification', payload: category });
        setLoading(false);
    }

    const clearCacheCategorySelected = () => dispatch({ type: 'CATEGORY - Start clear cache category' });

    const startRemoveQualification = async (categoryId: string, qualificationId: number) => {
        setLoading(true);
        const { success } = await categoriesRepository.removeQualificationCategory(categoryId, qualificationId);
        success && dispatch({ type: 'CATEGORY - Start remove qualification', payload: Number(qualificationId) });
        setLoading(false);
    }


    return {
        loading,
        category,
        categories,
        categoriesQualifications,
        startGetCategories,
        startCreateCategory,
        startAddQualification,
        startRemoveQualification,
        startGetCategoryWithQualifications,
        startGetCategoriesWithQualifications,
        clearCacheCategorySelected,
    }
}
