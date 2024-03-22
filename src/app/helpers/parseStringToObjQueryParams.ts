//?type=gradable&name=

interface QueryParams {
    [key: string]: string
}
export const parseStringToObjQueryParams = (query: string) => {
    if(!query.length) return {};
    const arrQuery = query.split('');
    arrQuery.shift();
    return arrQuery.join('').split('&').reduce((prev: QueryParams, curr) => {
        const querySplited = curr.split('=');

        const key = querySplited.shift() as string;

        prev[key] = querySplited.pop() || '';

        return prev;

    }, {});
}