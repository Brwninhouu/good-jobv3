import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewjobPageRoutingModule } from './newjob-routing.module';

import { NewjobPage } from './newjob.page';

// 1) Importa módulo de formulários reativos do Angular
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewjobPageRoutingModule,

    // 2) Importa módulo
    ReactiveFormsModule
  ],
  declarations: [NewjobPage]
})
export class NewjobPageModule {}
