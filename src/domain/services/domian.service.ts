import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DomainContext } from '../../infraestructure/context/domain';

import { domainRepository } from '../../infraestructure/repositories/domain.repository';
import { CreateDomainDto } from '../../infraestructure/http/dto/domains';

export const domianService = () => {
    const [loading, setLoading] = useState(false);
    const { dispatch, domains, domainsQualifications } = useContext(DomainContext);
    const navigate = useNavigate();

    const startGetDomains = async (): Promise<void> => {
        setLoading(true);
        const domains = await domainRepository.getDomains();
        typeof domains !== 'string' && dispatch({ type: 'DOMAIN - Load Domains', payload: domains });
        setLoading(false);
    }

    const startCreateDomain = async (createDomainDto: CreateDomainDto): Promise<void> => {
        setLoading(true);
        const { success } = await domainRepository.createDomain(createDomainDto);
        success && navigate(-1)
        setLoading(false);
    }

    const startDomainsWithQualifications = async (): Promise<void> => {
        setLoading(true);
        const domains = await domainRepository.getDomainsWithQualification();
        typeof domains !== 'string' && dispatch({ type: 'DOMAIN - Start load domains with qualifications', payload: domains });
        setLoading(false);
    }


    return {
        domains,
        loading,
        startGetDomains,
        domainsQualifications,
        startCreateDomain,
        startDomainsWithQualifications,
    }

}
