import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectComponent } from './UI/add-project/add-project.component';
import { AddUserComponent } from 'src/app/UI/add-user/add-user.component';
import { AddTaskComponent } from 'src/app/UI/add-task/add-task.component';
import { ViewTaskComponent } from 'src/app/UI/view-task/view-task.component';

const routes: Routes = [

  { path:  '', redirectTo:  'add-project', pathMatch:  'full' },
{
    path:  'add-project',
    component:  AddProjectComponent
},
{
    path:  'add-task',
    component:  AddTaskComponent
},
{
  path:  'add-user',
  component:  AddUserComponent
},
{
    path:  'view-task',
    component:  ViewTaskComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AddProjectComponent, AddUserComponent, AddTaskComponent, ViewTaskComponent]
