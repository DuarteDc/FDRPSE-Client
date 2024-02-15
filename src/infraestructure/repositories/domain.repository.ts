import { http } from '../http/http';
import { CreateDomainDto, DomainWithQualificationDto, DomainsResponseDto } from '../http/dto/domains';
import { Domain, DomainQualifications } from '../../domain/models';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';
import { errorAlert, succesAlert } from '../alert/alerts';

export const domainRepository = {

    getDomains: async (): Promise<Array<Domain> | string> => {
        try {
            const { domains } = await http.get<DomainsResponseDto>('/auth/domains');
            return domains.map(({ id, name, created_at, updated_at }) => new Domain(id, name, created_at, updated_at));
        } catch (error) {
            return error as string;
        }
    },

    createDomain: async (createDomainDto: CreateDomainDto): Promise<CommonResponseDto> => {
        try {
            const { message } = await http.post<CommonResponseDto>('/auth/domains/create', createDomainDto);
            succesAlert(message);
            return { message, success: true }
        } catch (error) {
            errorAlert(error as string)
            return { message: error as string, success: false }
        }
    },

    getDomainsWithQualification: async (): Promise<Array<DomainQualifications> | string> => {
        try {
            const { domains } = await http.get<DomainWithQualificationDto>('/auth/domains/with/qualification');
            return domains.map(({ id, name, created_at, qualification, updated_at }) => new DomainQualifications(id, name, { ...qualification, veryHigh: qualification.very_hight }, created_at, updated_at));
        } catch (error) {
            return error as string;
        }
    }

}