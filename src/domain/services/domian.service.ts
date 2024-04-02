import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DomainContext } from '../../infraestructure/context/domain';

import { domainRepository } from '../../infraestructure/repositories/domain.repository';
import { CommonQualifictions } from '../../infraestructure/components/ui/FormQualification';

import { SetNameToDomain } from '../../infraestructure/http/dto/domains/CreateDomainDto';

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

    return {
        loading,
        domain,
        domains,
        domainsQualifications,
        startGetDomains,
        startCreateDomain,
        startDomainsWithQualifications,
        startGetDomainWithQualifications,
    }

}
