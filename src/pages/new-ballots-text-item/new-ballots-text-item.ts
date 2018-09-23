import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-new-ballots-text-item',
  templateUrl: 'new-ballots-text-item.html',
})
export class NewBallotsTextItemPage {
  text: string;

  constructor(private viewCtrl: ViewController) {}

  onAction(action: string) {
    this.viewCtrl.dismiss({
      action: action,
      text: this.text
    })
  }
}
