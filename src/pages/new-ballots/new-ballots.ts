import { BallotsServiceMock } from './../../mock/ballots_service_mock';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-new-ballots',
  templateUrl: 'new-ballots.html',
})
export class NewBallotsPage {
  documents: string[] = new Array(2);

  constructor(private navCtrl: NavController,
              private ballotsServiceMock: BallotsServiceMock) {
    this.documents[0] = null;
    this.documents[1] = null;
  }
  
  onCreated(document: string, index: number) {
    this.documents[index] = document;
  }

  isReady() {
    return this.documents[0] != null && 
           this.documents[1] != null;
  }

  onSave() {
    this.ballotsServiceMock
    this.navCtrl.setRoot(NewBallotsPage);
  }
}
