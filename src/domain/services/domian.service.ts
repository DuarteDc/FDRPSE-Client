import { useContext, useState } from 'react';
import { DomainContext } from '../../infraestructure/context/domain';

import { domainRepository } from '../../infraestructure/repositories/domain.repository';
import { CreateDomainDto } from '../../infraestructure/http/dto/domains';

export const domianService = () => {
    const { dispatch, domains } = useContext(DomainContext);
    const [loading, setLoading] = useState(false);

    const startGetDomains = async (): Promise<void> => {
        setLoading(true);
        const domains = await domainRepository.getDomains();
        typeof domains !== 'string' && dispatch({ type: 'DOMAIN - Load Domains', payload: domains });
        setLoading(false);
    }

    const startCreateDomain = async (createDomainDto: CreateDomainDto): Promise<void> => {
        setLoading(true);
        await domainRepository.createDomain(createDomainDto);
        setLoading(false);
    }

    return {
        domains,
        loading,
        startGetDomains,
        startCreateDomain,
    }

}
