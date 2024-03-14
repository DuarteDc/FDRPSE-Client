import { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Params {
    [key: string]: string;
}
export const useParams = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState<Params>({});

    const setQueryParams = useCallback((newParams: Params) => {
        const [param] = Object.keys(newParams);

        if (params.hasOwnProperty(param) && params[param] === newParams[param]) return;

        setParams(prev => ({ ...prev, ...newParams }));
        setSearchParams(newParams);
    }, [params]);

    const getQueryParams = (key: string) => ({ key: params[key] });

    const getValueOfQueryParams = (key: string) => params[key];

    const parseToString = useCallback(() => {
        return Object.entries(params).reduce((quey: string, [key, value]) => {
            quey += `${key}=${value}&`;
            return quey;
        }, '?');
    }, [params]);

    return {
        params,
        setQueryParams,
        getQueryParams,
        getValueOfQueryParams,
        parseToString,
    }

}
