import Mock from 'mockjs'
import homeApi from '@/api/mockServeData/home'
import userApi from '@/api/mockServeData/user'

// 拦截接口
Mock.mock(/home\/getData/, homeApi.getStatisticalData)

// user list interface
Mock.mock(/user\/getUser/, userApi.getUserList)

// createUser
Mock.mock(/user\/addUser/, 'post', userApi.createUser)

// modifier
Mock.mock(/user\/editUser/, 'post', userApi.updateUser)

// delete
Mock.mock(/user\/delUser/, 'post', userApi.deleteUser)