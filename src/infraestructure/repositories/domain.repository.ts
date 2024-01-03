import { http } from '../http/http';
import { DomainsResponseDto } from '../http/dto/domains';
import { Domain } from '../../domain/models';

export const categoriesRepositories = {

    getCategories: async (): Promise<Array<Domain> | string> => {
        try {
            const { domains } = await http.get<DomainsResponseDto>('/domains');
            return domains.map(({ id, name, created_at, updated_at }) => new Domain(id, name, created_at, updated_at));
        } catch (error) {
            return error as string;
        }
    },

}