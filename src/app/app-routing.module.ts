import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from './auth_guards.service'

// 路由模块初始化
// 1.配置路由表
//    请求什么路径的时候,导航到什么组件
// 2.配置路由出口及路由导航链接

import {SigninComponent} from './signin/signin.component'
import { SignupComponent } from './signup/signup.component'
import { LayoutComponent } from './layout/layout.component'
import {ContactListComponent} from './contact-list/contact-list.component'
import { ContactNewComponent } from './contact-new/contact-new.component'
import { ContactEditComponent } from './contact-edit/contact-edit.component'

import { TagListComponent} from './tag-list/tag-list.component'
import { TagNewComponent } from './tag-new/tag-new.component'
import { TagEditComponent } from './tag-edit/tag-edit.component'




const routes: Routes = [
  {
    // 路由重定向
    path: '',
    redirectTo:'/contacts',//当请求根路径的时候，跳转到contacts联系人组件
    pathMatch: 'full' //必须完全匹配到路径的时候才能重定向
  },
  {
    // 嵌套路由

    // 当我们访问contacts的时候，会先把LayoutComponent组件渲染出来
    // 然后把children中的path为空的路由渲染到LayoutComponent组件中的路由出口
    path: 'contacts',
    component: LayoutComponent,
    canActivate:[AuthGuard], // 在导航contacts 之前会先进入路由守卫
    children: [{
      path: '',
      component:ContactListComponent
    },
      {
        path: 'new',  // 这里的new的请求路径是 /contacts/new
        component:ContactNewComponent
      }, {
        path: 'edit',
        component:ContactEditComponent
    }]
  },
  {
    path: 'tags',
    component: LayoutComponent,
    canActivate:[AuthGuard],
    children: [{
      path: '',
      component:TagListComponent
    }, {
      path: 'new',  //这里的new的请求路径是 /tags/new
      component:TagNewComponent
      }, {
        path: 'edit',
      component:TagEditComponent
    }]
  },

  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard],
})
export class AppRoutingModule {

  // 写在路由导航钩子里面 统一 用的时候调用即可
 }
