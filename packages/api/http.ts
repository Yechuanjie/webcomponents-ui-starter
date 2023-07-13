import type { AxiosRequestConfig, AxiosStatic } from 'axios'

let axios: AxiosStatic
export const axiosInstance = {
  setAxios: (http: AxiosStatic) => {
    axios = http
  },
  getAxios: (): AxiosStatic => {
    return axios
  }
}

export interface FetchResult<T = any> {
  code: number
  current: number
  data: T
  extraData: T
  msg: string
  message?: string
}

export async function http<T = unknown>(
  url: string,
  method: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH',
  data?: object,
  config?: AxiosRequestConfig
): Promise<FetchResult<T>> {
  return axiosInstance.getAxios()[method.toLowerCase()](url, data, config)
}
