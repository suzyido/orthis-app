import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewBallotsPage } from './new-ballots';

@NgModule({
  declarations: [
    NewBallotsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewBallotsPage),
  ],
})
export class NewBallotsPageModule {}
