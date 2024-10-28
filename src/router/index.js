import { useRoutes, Navigate } from 'react-router-dom'
import Main from '@/pages/main'
import Home from '@/pages/home'
import Mall from '@/pages/mall'
import User from '@/pages/user/user'
import PageOne from '@/pages/souspages/pageone'
import PageTwo from '@/pages/souspages/pagetwo'

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Main />,
      children: [
        // 重定向
        {
          path: '/',
          element: <Navigate to='home' replace={true} />
        },
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'mall',
          element: <Mall />
        },
        {
          path: 'user',
          element: <User />
        },
        {
          path: 'other',
          children: [
            {
              path: 'pageone',
              element: <PageOne />
            },
            {
              path: 'pagetwo',
              element: <PageTwo />
            }
          ]
        }
      ]
    }
  ]) 
  return routes
}

export default Router
