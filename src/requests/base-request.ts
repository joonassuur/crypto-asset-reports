import axios, { Method, ResponseType } from 'axios';
import { development } from '../utils/helpers';
const BASE_URL = development
  ? 'http://localhost:3000/'
  : 'https://sweet-druid-55fefd.netlify.app/.netlify/functions/api/';

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
