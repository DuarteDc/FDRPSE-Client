import { useState, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { parseStringToObjQueryParams } from '../helpers/parseStringToObjQueryParams';

interface Params {
    [key: string]: string;
}
export const useParams = () => {
    const { search } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const [params, setParams] = useState<Params>(parseStringToObjQueryParams(search));

    const parseToString = () => {
        return search;
    };

    const setQueryParams = useCallback((newParams: Params) => {

        const [param] = Object.keys(newParams);

        if (params.hasOwnProperty(param) && params[param] === newParams[param]) return;

        if (!newParams[param] && params.hasOwnProperty(param)) {
            const { [param]: value, ...rest } = params;

            setParams(rest);
            return setSearchParams(rest);
        };

        setParams(prev => ({ ...prev, ...newParams }));
        setSearchParams({ ...params, ...newParams });
    }, [Object.values(params)]);

    const getQueryParams = (key: string) => ({ key: params[key] });

    const getValueOfQueryParams = (key: string) => searchParams.get(key);

    return {
        params,
        setQueryParams,
        getQueryParams,
        getValueOfQueryParams,
        parseToString,
    }

}
