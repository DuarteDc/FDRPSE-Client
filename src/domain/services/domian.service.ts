import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DomainContext } from '../../infraestructure/context/domain';

import { domainRepository } from '../../infraestructure/repositories/domain.repository';
import { CommonQualifictions } from '../../infraestructure/components/ui/FormQualification';

import { SetNameToDomain } from '../../infraestructure/http/dto/domains/CreateDomainDto';
import { AddQualificationDto } from '../../infraestructure/http/dto/categories/AddQualificationDto';

export const domianService = () => {
    const [loading, setLoading] = useState(false);
    const { dispatch, domains, domainsQualifications, domain } = useContext(DomainContext);
    const navigate = useNavigate();

    const startGetDomains = async (): Promise<void> => {
        setLoading(true);
        const domains = await domainRepository.getDomains();
        typeof domains !== 'string' && dispatch({ type: 'DOMAIN - Load Domains', payload: domains });
        setLoading(false);
    }

    const startCreateDomain = async (setNameToCategory: SetNameToDomain, qualifications: Array<CommonQualifictions>): Promise<void> => {
        setLoading(true);
        const { success } = await domainRepository.createDomain({ ...setNameToCategory, qualifications });
        success && navigate(-1)
        setLoading(false);
    }

    const startDomainsWithQualifications = async (): Promise<void> => {
        setLoading(true);
        const domains = await domainRepository.getDomainsWithQualification();
        typeof domains !== 'string' && dispatch({ type: 'DOMAIN - Start load domains with qualifications', payload: domains });
        setLoading(false);
    }

    const startGetDomainWithQualifications = async (domainId: string): Promise<void> => {
        if(domainId === domain?.id) return;
        const response = await domainRepository.getDomainWithQualifications(domainId);
        typeof response !== 'string' && dispatch({ type: 'DOMAIN - Start load domain with qualifications', payload: response });
    }

    const startAddQualification = async (categoryId: string, qualification: AddQualificationDto) => {
        setLoading(true);
        const category = await domainRepository.addQualificationDomain(categoryId, qualification);
        typeof category !== 'string' && dispatch({ type: 'DOMAIN - Start add qualification', payload: category });
        setLoading(false);
    }


    const startRemoveQualification = async (categoryId: string, qualificationId: number) => {
        setLoading(true);
        const { success } = await domainRepository.removeQualificationDomain(categoryId, qualificationId);
        success && dispatch({ type: 'DOMAIN - Start remove qualification', payload: Number(qualificationId) });
        setLoading(false);
    }

    const clearCacheDomainSelected = () => dispatch({ type: 'DOMAIN - Start clear cache domain' });


    return {
        loading,
        domain,
        domains,
        domainsQualifications,
        startGetDomains,
        startCreateDomain,
        startAddQualification,
        clearCacheDomainSelected,
        startRemoveQualification,
        startDomainsWithQualifications,
        startGetDomainWithQualifications,
    }

}
