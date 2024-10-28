import httpReq from './axios'

export const getData = () => {
  return httpReq.request({
    url: '/home/getData',
    method: 'GET'
  })
}

export const getUser = (params) => {
  return httpReq.request({
    url: '/user/getUser',
    method: 'GET',
    params
  })
}