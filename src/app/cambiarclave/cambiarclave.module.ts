import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarclavePageRoutingModule } from './cambiarclave-routing.module';

import { CambiarClavePage } from './cambiarclave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarclavePageRoutingModule
  ],
  declarations: [CambiarClavePage]
})
export class CambiarclavePageModule {}
