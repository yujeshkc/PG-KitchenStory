import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { DetailComponent } from './detail/detail.component';
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
    ReactiveFormsModule //import here
  ]
})





export class UsersModule { }
