import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XdPageRoutingModule } from './xd-routing.module';

import { XdPage } from './xd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XdPageRoutingModule
  ],
  declarations: [XdPage]
})
export class XdPageModule {}
