import axios, { Method, ResponseType } from 'axios';
const BASE_URL = 'http://localhost:3000/';

interface RequestPayload {
  method: Method;
  path: string;
  data?: Record<string, any>;
  baseUrl?: string;
  contentType?: string;
  responseType?: ResponseType;
  withCredentials?: boolean;
}

export const request = axios.create({
  baseURL: BASE_URL,
});

const baseRequest = async ({
  method,
  path,
  data,
  baseUrl,
  contentType,
  responseType = 'json',
  withCredentials,
}: RequestPayload) => {
  return request({
    method,
    baseURL: baseUrl || BASE_URL,
    url: path,
    headers: {
      Accept: '*/*',
      'Content-Type': contentType || 'application/json',
    },
    responseType,
    withCredentials: withCredentials || false,
    ...(data && { data }),
  });
};

export default baseRequest;
