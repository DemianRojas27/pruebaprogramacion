import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XdPage } from './xd.page';

const routes: Routes = [
  {
    path: '',
    component: XdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XdPageRoutingModule {}
