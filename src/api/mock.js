import Mock from 'mockjs'
import homeApi from '@/api/mockServeData/home'
import userApi from '@/api/mockServeData/user'
import permissionApi from '@/api/mockServeData/permission'

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

// 权限登录
Mock.mock(/permission\/getConnexion/, 'post', permissionApi.getMenu)