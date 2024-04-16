import { http } from '../http/http';

import { Category, CategoryQualifications } from '../../domain/models';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';
import { CategoriesWithQualificationDto, CategoryWithQualificationsDto, CateoriesResponseDto, CreateCategoryDto } from '../http/dto/categories';
import { errorAlert, succesAlert } from '../alert/alerts';
import { AddQualificationDto } from '../http/dto/categories/AddQualificationDto';

export const categoriesRepository = {

    getCategories: async (): Promise<Array<Category> | string> => {
        try {
            const { categories } = await http.get<CateoriesResponseDto>('/auth/categories');
            return categories.map(({ id, name, qualifications_count, created_at, updated_at }) =>
                new Category(id, name, created_at, updated_at, qualifications_count));
        } catch (error) {
            return error as string;
        }
    },

    createCategory: async (createCategoryDto: CreateCategoryDto): Promise<CommonResponseDto> => {
        try {
            const { message } = await http.post<CommonResponseDto>('/auth/categories/create', createCategoryDto);
            succesAlert(message)
            return { message, success: true }
        } catch (error) {
            errorAlert(error as string);
            return { message: error as string, success: false }
        }
    },

    getCategoriesWithQualification: async (): Promise<Array<CategoryQualifications> | string> => {
        try {
            const { categories } = await http.get<CategoriesWithQualificationDto>('/auth/categories/with/qualification');
            return categories.map(({ id, name, created_at, qualification, updated_at }) => new CategoryQualifications(id, name, { ...qualification, veryHigh: qualification.very_hight }, created_at, updated_at));
        } catch (error) {
            return error as string;
        }
    },

    getCategoryWithQualifications: async (categoryId: string): Promise<CategoryQualifications | string> => {
        try {
            const { category } = await http.get<CategoryWithQualificationsDto>(`/auth/categories/with/qualifications/${categoryId}`);
            return new CategoryQualifications(category.id, category.name,
                category.qualifications.map((category) => ({
                    ...category,
                    despicable: category.despicable,
                    low: category.low,
                    middle: category.middle,
                    high: category.high,
                    veryHigh: category.very_high,
                    qualificationableId: category.qualificationable_id
                })),
                category.created_at, category.updated_at);
        } catch (error) {
            return error as string;
        }
    },

    addQualificationCategory: async (categoryId: string, qualification: AddQualificationDto): Promise<CategoryQualifications | string> => {
        try {
            const { message, category } = await http.post<CommonResponseDto & CategoryWithQualificationsDto>(`/auth/categories/add/qualification/${categoryId}`, qualification);
            succesAlert(message)
            return new CategoryQualifications(category.id, category.name,
                category.qualifications.map((category) => ({
                    ...category,
                    despicable: category.despicable,
                    low: category.low,
                    middle: category.middle,
                    high: category.high,
                    veryHigh: category.very_high,
                    qualificationableId: category.qualificationable_id
                })),
                category.created_at, category.updated_at);
        } catch (error) {
            errorAlert(error as string);
            return error as string;
        }
    },

    removeQualificationCategory: async (categoryId: string, qualificationId: number): Promise<CommonResponseDto> => {
        try {
            const { message } = await http.destroy<CommonResponseDto>(`/auth/categories/${categoryId}/qualification/${qualificationId}`);
            succesAlert(message)
            return { message, success: true }
        } catch (error) {
            errorAlert(error as string);
            return { message: error as string, success: false }
        }
    },

}