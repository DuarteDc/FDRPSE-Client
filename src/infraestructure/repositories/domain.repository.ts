import { http } from '../http/http';
import { CreateDomainDto, DomainsResponseDto } from '../http/dto/domains';
import { Domain } from '../../domain/models';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';
import { errorAlert, succesAlert } from '../alert/alerts';

export const domainRepository = {

    getDomains: async (): Promise<Array<Domain> | string> => {
        try {
            const { domains } = await http.get<DomainsResponseDto>('/domains');
            return domains.map(({ id, name, created_at, updated_at }) => new Domain(id, name, created_at, updated_at));
        } catch (error) {
            return error as string;
        }
    },

    createDomain: async (createDomainDto: CreateDomainDto): Promise<CommonResponseDto> => {
        try {
            const { message } = await http.post<CommonResponseDto>('/domains/create', createDomainDto);
            succesAlert(message);
            return { message, success: true }
        } catch (error) {
            errorAlert(error as string)
            return { message: error as string, success: false }
        }
    }

}