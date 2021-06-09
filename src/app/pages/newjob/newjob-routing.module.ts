import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewjobPage } from './newjob.page';

const routes: Routes = [
  {
    path: '',
    component: NewjobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewjobPageRoutingModule {}
