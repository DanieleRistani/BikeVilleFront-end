import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CategoryComponent } from './shared/Categories/category/category.component';
import { NotFoundComponent } from './404/not-found/not-found.component';
import { SearchProductsComponent } from './shared/search/search-products/search-products.component';
import { AdminComponent } from './auth/admin/admin.component';
import { UserComponent } from './auth/user/user.component';

export const routes: Routes = [
    {path: '',component:HomeComponent},
    {path: 'register',component:RegisterComponent},
    {path: 'login',component:LoginComponent},
    {path: 'categories/:id',component: CategoryComponent},
    {path: 'search/:filter',component: SearchProductsComponent},
    {path: 'userProfile/:email',component: UserComponent},
    {path: 'adminHUB/:email',component: AdminComponent},




    {path:"404NotFound",component:NotFoundComponent},
    {path:"search",redirectTo:""},
    {path:"**",redirectTo:"/404NotFound"}
];
