import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CategoryComponent } from './shared/Categories/category/category.component';
import { NotFoundComponent } from './404/not-found/not-found.component';
import { SearchProductsComponent } from './shared/search/search-products/search-products.component';
import { AdminComponent } from './auth/admin/admin.component';
import { UserComponent } from './auth/user/user.component';
import { UsersComponent } from './auth/admin/adminChild/users/users.component';
import { ProductsComponent } from './auth/admin/adminChild/products/products.component';
import { ToAdminComponent } from './auth/admin/toBeAdmin/to-admin/to-admin.component';
import { ResetPasswordComponent } from './auth/user/userChild/reset-password/reset-password.component';

export const routes: Routes = [
    {path: '',component:HomeComponent},
    {path: 'register',component:RegisterComponent},
    {path: 'login',component:LoginComponent},
    {path: 'categories/:id',component: CategoryComponent},
    {path: 'search/:filter',component: SearchProductsComponent},
    {path: 'userProfile/:email',component: UserComponent,children: [{path: 'resetPassword/:id',component: ResetPasswordComponent}]},
    {path: 'adminHUB/:email',component: AdminComponent,children: [
      {path: 'users',component: UsersComponent},
      {path: 'products',component: ProductsComponent},

    ]},
    {path: 'toBeAdmin/:email',component: ToAdminComponent},




    {path:"404NotFound",component:NotFoundComponent},
    {path:"search",redirectTo:""},
    {path:"**",redirectTo:"/404NotFound"}
];
