import { http } from '../http/http';
import { CreateDomainDto, DomainsWithQualificationDto, DomainsResponseDto, DomainWithQualificationsDto } from '../http/dto/domains';
import { Domain, DomainQualifications } from '../../domain/models';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';
import { errorAlert, succesAlert } from '../alert/alerts';
import { AddQualificationDto } from '../http/dto/categories/AddQualificationDto';

export const domainRepository = {

    getDomains: async (): Promise<Array<Domain> | string> => {
        try {
            const { domains } = await http.get<DomainsResponseDto>('/auth/domains');
            return domains.map(({ id, name, qualifications_count, created_at, updated_at }) => new Domain(id, name, created_at, updated_at, qualifications_count));
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
            const { domains } = await http.get<DomainsWithQualificationDto>('/auth/domains/with/qualification');
            return domains.map(({ id, name, created_at, qualification, updated_at }) => new DomainQualifications(id, name, { ...qualification, veryHigh: qualification.very_hight }, created_at, updated_at));
        } catch (error) {
            return error as string;
        }
    },

    getDomainWithQualifications: async (categoryId: string): Promise<DomainQualifications | string> => {
        try {
            const { domain } = await http.get<DomainWithQualificationsDto>(`/auth/domains/with/qualifications/${categoryId}`);
            return new DomainQualifications(domain.id, domain.name,
                domain.qualifications.map((domain) => ({
                    ...domain,
                    despicable: domain.despicable,
                    low: domain.low,
                    middle: domain.middle,
                    high: domain.high,
                    veryHigh: domain.very_high,
                    qualificationableId: domain.qualificationable_id
                })),
                domain.created_at, domain.updated_at);
        } catch (error) {
            return error as string;
        }
    },


    addQualificationDomain: async (domainId: string, qualification: AddQualificationDto): Promise<DomainQualifications | string> => {
        try {
            const { message, domain } = await http.post<CommonResponseDto & DomainWithQualificationsDto>(`/auth/domains/add/qualification/${domainId}`, qualification);
            succesAlert(message)
            return new DomainQualifications(domain.id, domain.name,
                domain.qualifications.map((domain) => ({
                    ...domain,
                    despicable: domain.despicable,
                    low: domain.low,
                    middle: domain.middle,
                    high: domain.high,
                    veryHigh: domain.very_high,
                    qualificationableId: domain.qualificationable_id
                })),
                domain.created_at, domain.updated_at);
        } catch (error) {
            errorAlert(error as string);
            return error as string;
        }
    },



    removeQualificationDomain: async (domainId: string, qualificationId: number): Promise<CommonResponseDto> => {
        try {
            const { message } = await http.destroy<CommonResponseDto>(`/auth/domains/${domainId}/qualification/${qualificationId}`);
            succesAlert(message)
            return { message, success: true }
        } catch (error) {
            errorAlert(error as string);
            return { message: error as string, success: false }
        }
    },

}