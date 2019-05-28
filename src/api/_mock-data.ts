import Request from '@/utils/request';

const request = new Request();

/**
 * @param  {any} param?
 */
export const getLawWorks = (param?: any) => {
    return request.get('law-works.json', param);
};

/**
 * @param  {any} param?
 */
export const addCloudQuery = (param?: any) => {
    return request.get('add-cloud-query.json', param);
};

/**
 * @param  {any} param?
 */
export const getCloudQueryResult = (param?: any) => {
    return request.get('cloud-query-result.json', param);
};

/**
 * @param  {any} param?
 */
export const getXzqTag = (param?: any) => {
    return request.get('xzq-tag.json', param);
};
