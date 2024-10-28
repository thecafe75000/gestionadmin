import httpReq from './axios'

export const getData = () => {
  return httpReq.request({
    url: '/home/getData',
    method: 'GET'
  })
}