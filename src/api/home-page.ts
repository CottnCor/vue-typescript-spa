import Request from '@/utils/request';

import { CLOUD_QUERY_API } from '@/config';

const request = new Request();

/**
 * @param  {any} param?
 */
export const addCloudQuery = (param?: any) => {
    return request.post(CLOUD_QUERY_API.add, param, param);
};

/**
 * @param  {any} param?
 */
export const getCloudQueryResult = (param?: any) => {
    return request.post(CLOUD_QUERY_API.get, param, param);
};

/**
 * @param  {any} param?
 */
export const getXzqTag = (param?: any) => {
  return request.post(CLOUD_QUERY_API.xzqTag, param, param);
};
