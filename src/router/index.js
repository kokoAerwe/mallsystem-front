import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Regist from '@/components/Regist'
import AdminIndex from '@/components/admin/AdminIndex'
import GoodsManage from '@/components/admin/GoodsManage'
import UserManage from '@/components/admin/UserManage'
import TagManage from '@/components/admin/TagManage'
import VipManage from '@/components/admin/VipManage'
import AddressManage from '@/components/admin/AddressManage'
import MainIndex from '@/components/front/MainIndex'
import Center from '@/components/front/Center'
import Court from '@/components/front/Court'
import Personal from '@/components/front/Personal'
import Balance from '@/components/front/Balance'
import VIP from '@/components/front/VIP'
import Receipt from '@/components/front/Receipt'
import GoodsDetail from '@/components/front/GoodsDetail'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: "/regist",
      name: "Regist",
      component: Regist
    },
    {
      path: "/admin/index",
      name: "AdminIndex",
      component: AdminIndex,
      children: [{
          path: 'goods',
          component: GoodsManage
        },
        {
          path: 'user',
          component: UserManage
        },
        {
          path: 'tag',
          component: TagManage
        }, {
          path: 'address',
          component: AddressManage
        }, {
          path: 'vip',
          component: VipManage
        }
      ]
    },
    {
      path: "/",
      name: "MainIndex",
      component: MainIndex,
      children: [{
        path: 'cneter',
        component: Center
      },{
        path: 'receipt',
        component: Receipt
      },{
        path: 'vip',
        component: VIP
      },{
        path: 'goods/detail',
        name:"GoodsDetail",
        component: GoodsDetail
      },{
        path:'court',
        component:Court
      },{
        path:'personal',
        component:Personal
      },{
        path:'balance',
        component:Balance
      }]
    }
  ]
})
