import { NewBallotsTextItemPage } from './../pages/new-ballots-text-item/new-ballots-text-item';
import { NewBallotsItemComponent } from './../components/new_ballots_item.component';
import { BallotsItemComponent } from './../components/ballots_item.component';
import { NewBallotsPage } from '../pages/new-ballots/new-ballots';
import { BallotsService } from '../services/ballots_service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BallotsServiceForUnitTest } from '../mock/ballots_service_for_unit_test';
import { BallotsServiceMock } from '../mock/ballots_service_mock';
import { ScreenOrientationMock } from '../mock/screen-orientation-mock';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BallotsServiceInterceptor } from '../services/ballots_service_interceptor';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { LoginService } from '../services/login_service';

export const fireBaseConfig = {
  apiKey: "AIzaSyDERYE5dI09774KrigbB2uMxIixNHtY9Mo",
  authDomain: "ordis-d17ce.firebaseapp.com",
  databaseURL: "https://ordis-d17ce.firebaseio.com",
  projectId: "ordis-d17ce",
  storageBucket: "ordis-d17ce.appspot.com",
  messagingSenderId: "190011662798"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BallotsItemComponent,
    NewBallotsItemComponent,
    NewBallotsPage,
    NewBallotsTextItemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(fireBaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewBallotsPage,
    NewBallotsTextItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginService,
    BallotsService,
    BallotsServiceMock,
    BallotsServiceForUnitTest,
    ScreenOrientation,
    ScreenOrientationMock,
    {provide: HTTP_INTERCEPTORS, useClass: BallotsServiceInterceptor, multi: true},
    Camera,
    Crop  ]
})
export class AppModule {}