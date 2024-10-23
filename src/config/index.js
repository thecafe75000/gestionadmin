const menuConfig = [
  {
    path: '/home',
    name: 'home',
    label: 'Page Accueil',
    icon: 'HomeOutlined',
    url: '/home/index'
  },
  {
    path: '/mall',
    name: 'mall',
    label: 'Marchandises',
    icon: 'ShopOutlined',
    url: '/mall/index'
  },
  {
    path: '/user',
    name: 'user',
    label: 'Utilisateurs',
    icon: 'UserOutlined',
    url: '/user/index'
  },
  {
    path: '/other',
    label: 'Divers',
    icon: 'SettingOutlined',
    children: [
      {
        path: '/other/pageOne',
        name: 'page1',
        label: 'Page 1',
        icon: 'SettingOutlined'
      },
      {
        path: '/other/pageTwo',
        name: 'page2',
        label: 'Page 2',
        icon: 'SettingOutlined'
      }
    ]
  }
]

export default menuConfig