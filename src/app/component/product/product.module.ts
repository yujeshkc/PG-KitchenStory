import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    UpdateComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
