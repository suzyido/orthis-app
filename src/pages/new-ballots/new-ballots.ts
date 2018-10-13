import { BallotsService } from './../../services/ballots_service';
import { BallotsServiceMock } from './../../mock/ballots_service_mock';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-new-ballots',
  templateUrl: 'new-ballots.html',
})
export class NewBallotsPage {
  documents: string[] = new Array(2);

  constructor(private navCtrl: NavController,
              private ballotsService: BallotsService) {
    this.documents[0] = null;
    this.documents[1] = null;
  }
  
  onCreated(document: any, index: number) {
    this.documents[index] = document;
  }

  isReady() {
    return this.documents[0] != null && 
           this.documents[1] != null;
  }

  onSave() {
    var title: string = "Temp Title";

    this.ballotsService.postNewBallots(title, this.documents)
    .subscribe(
      (optionsGroup: Object) => {
        console.log('Response from postNewBallots: ', optionsGroup);
      },
      (error) => {
        console.log(error.message);
        return null;
      }
    )

    this.navCtrl.setRoot(NewBallotsPage);
  }
}
