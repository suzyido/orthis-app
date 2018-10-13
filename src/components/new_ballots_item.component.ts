import { NewBallotsItemViewMode } from './../enums/new_ballots_item_view_mode';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { PopoverController } from 'ionic-angular';
import { NewBallotsTextItemPage } from '../pages/new-ballots-text-item/new-ballots-text-item';

@Component({
    selector: "new-ballots-item",
    template:
    `
    <ion-card>
      <ion-card-content *ngIf="isNoDocument()">
        <ion-row>
          <ion-col col-4>
              <ion-item class="vote_item">
                <ion-icon 
                  center  
                  name="list"
                  class="add_ballots_item"
                  (click)=getTextInput()>
                </ion-icon>  
              </ion-item>          
          </ion-col>
          <ion-col col-4>
              <ion-item class="vote_item">
                  <ion-icon 
                    center  
                    name="image"
                    class="add_ballots_item"
                    (click)=getImage()>
                  </ion-icon>  
              </ion-item>          
          </ion-col>
          <ion-col col-4>
              <ion-item class="vote_item">
                <ion-icon 
                  center  
                  name="camera"
                  class="add_ballots_item"
                  (click)=takePhoto()>
                </ion-icon>  
              </ion-item>          
          </ion-col>
        </ion-row>
    </ion-card-content>
    <ion-card-content *ngIf="isImageDocument()">
      <img src="{{document}}"/>
      <button 
        ion-button 
        icon-only
        class="remove_ballots_item"
        (click)="onRemoveItem()">
          <ion-icon name="close-circle"></ion-icon></button>    
    </ion-card-content>
    <ion-card-content *ngIf="isTextDocument()">
      <div class="text_vote_container">
        <span 
          class="text_vote">
          {{document.data}}
        </span>  
      </div>
      <button 
        ion-button 
        icon-only
        class="remove_ballots_item"
        (click)="onRemoveItem()">
          <ion-icon name="close-circle"></ion-icon></button>    
    </ion-card-content>
  </ion-card>
  `
})
export class NewBallotsItemComponent {
    @Input() document: string;
    @Output() onCreated = new EventEmitter<any>();
    documentType = NewBallotsItemViewMode.Empty; 

    constructor(private camera: Camera,
                private popoverCtrl: PopoverController) {}

    isNoDocument() {
      return this.documentType == NewBallotsItemViewMode.Empty;
    }            
    
    isImageDocument() {
      return this.documentType == NewBallotsItemViewMode.Image;
    }            
    
    isTextDocument() {
      return this.documentType == NewBallotsItemViewMode.Text;
    }            

    onRemoveItem() {
      this.documentType = NewBallotsItemViewMode.Empty;
      this.onCreated.emit(null);
    }

    takePhoto() {
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
          targetHeight: 1000,
          targetWidth: 1000
    
        }
        
        this.camera.getPicture(options)
        .then((imageData) => {
          this.documentType = NewBallotsItemViewMode.Image;
          const data = 'data:image/jpeg;base64,' + imageData;
          this.onCreated.emit({
                                'type': 'text', 
                                'title': 'temp title', 
                                'data': data
                              });
        }, 
        (err) => {
          console.log('Error taking picture for');
        });
      } 

    getImage() {
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          saveToPhotoAlbum: false,
          correctOrientation: true
        }
        
        this.camera.getPicture(options)
        .then((imageData) => {
          this.documentType = NewBallotsItemViewMode.Image;
          const data = 'data:image/jpeg;base64,' + imageData;
          this.onCreated.emit({
                                'type': 'text',
                                'title': 'temp title', 
                                'data': data
                              });
        }, 
        (err) => {
            console.log('Error loading picture from galery');
        });
    }
    
    getTextInput() {
        const popover = this.popoverCtrl.create(NewBallotsTextItemPage, 
                                                {}, 
                                                {cssClass: 'custom-popover'});
        popover.present({
          ev: event
        });

        popover.onDidDismiss(data => {
          console.log(data.text);
          if(data.action == 'ok') {
            this.documentType = NewBallotsItemViewMode.Text;
            this.onCreated.emit({
                'type': 'text', 
                'data': data.text});
          }
        });
    }
}