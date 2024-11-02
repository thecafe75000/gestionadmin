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

export const addUser = (data) => {
  return httpReq.request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}

export const editUser = (data) => {
  return httpReq.request({
    url: '/user/editUser',
    method: 'post',
    data
  })
}

export const deleteUser = (data) => {
  return httpReq.request({
    url: '/user/delUser',
    method: 'post',
    data
  })
}

export const getConnexion = (data) => {
  return httpReq.request({
    url: '/permission/getConnexion',
    method: 'post',
    data
  })
}
