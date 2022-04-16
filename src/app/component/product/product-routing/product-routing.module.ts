import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from '../product.component';
import { CreateComponent } from '../create/create.component';
import { ListComponent } from '../list/list.component';
import { UpdateComponent } from '../update/update.component';
import { DetailComponent } from '../detail/detail.component';

const routes: Routes = [
      {path:'', component: ProductComponent},
      {path:'create', component: CreateComponent},
      {path: 'list', component: ListComponent},
      {path: 'update', component:UpdateComponent},
      {path: 'detail', component:DetailComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
