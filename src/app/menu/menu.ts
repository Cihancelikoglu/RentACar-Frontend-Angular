import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Anasayfa',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  {
    id: 'tables',
    title: 'Tablolar',
    type: 'collapsible',
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: 'menu',
    children: [
      {
        id: 'brands',
        title: 'Brands',
        type: 'item',
        icon: 'file',
        url: 'brands'
      },
      {
        id: 'colors',
        title: 'Colors',
        type: 'item',
        icon: 'file',
        url: 'colors'
      },
      {
        id: 'cars',
        title: 'Cars',
        type: 'item',
        icon: 'file',
        url: 'cars'
      },
      {
        id: 'customers',
        title: 'Customers',
        type: 'item',
        icon: 'file',
        url: 'customers'
      },
      {
        id: 'rentals',
        title: 'Rentals',
        type: 'item',
        icon: 'file',
        url: 'rentals'
      },
      {
        id: 'rental',
        title: 'Rent A Car',
        type: 'item',
        icon: 'file',
        url: 'rental'
      },
    ]
  },
]
