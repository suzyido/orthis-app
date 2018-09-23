import { HomePage } from '../pages/home/home';
import { NewBallotsPage } from '../pages/new-ballots/new-ballots';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp{
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public menuCtrl: MenuController) {
                            
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home Page', component: 'HomePage' }
    ];
  }

  ionViewDidLoad() { // No Unit Test
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) { // No Unit Test
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }  

  onNewBallots() { // No Unit Test
    this.nav.setRoot(NewBallotsPage);
    this.menuCtrl.close();
  }

  onVote() { // No Unit Test
    this.nav.setRoot(HomePage);
    this.menuCtrl.close();
  }
}
