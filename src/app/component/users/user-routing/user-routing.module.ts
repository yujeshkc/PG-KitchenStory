import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '../users.component';
import { CreateComponent } from '../create/create.component';
import { ListComponent } from '../list/list.component';
import { UpdateComponent } from '../update/update.component';
import { DetailComponent } from '../detail/detail.component';
import { AuthGuard } from 'src/app/guard/auth.guard';



const routes: Routes = [
  {path:'', component: UsersComponent},
  {path: 'create', component: CreateComponent , canActivate:[AuthGuard], data:{roles: ['admin']}},
  {path: 'list', component: ListComponent , canActivate:[AuthGuard], data:{roles: ['admin']}},
  {path: 'update/:id', component: UpdateComponent, canActivate:[AuthGuard], data:{roles: ['admin']}},
  {path: 'detail', component: DetailComponent, canActivate:[AuthGuard], data:{roles: ['admin']}},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
