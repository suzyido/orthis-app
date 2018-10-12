import { HttpResponse } from '@angular/common/http';
import { ServerToClientMapper } from '../../server/server_to_client_mapper';
import { DoubleBallots } from '../../models/double_ballots';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { VoteIndex } from '../../enums/vote_index_enum';
import { NewBallotsPage } from '../new-ballots/new-ballots';
import { BallotsService } from '../../services/ballots_service';
import { ServerBallots } from '../../models/server_ballots';
import { LoginService } from '../../services/login_service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  private currentBallots: DoubleBallots;
  public isNextAllowed: boolean = true;
  private votedIndex: number = undefined;
  private orientation: string = null;
  selectOptions = ['All', 'Cars', 'People', 'Food', 'Colors', 'Masks', 'Children with toys', 'Java', 'C++', 'JS', 'Python'];
  subject: string = this.selectOptions[0];
  
  constructor(public navCtrl: NavController,
              public screenOrientation: ScreenOrientation,
              public ballotsService: BallotsService,
              public loginService: LoginService) {}

  ngOnInit() { // Unit Tested
    this.orientation = this.getCurrentScreenOrientation();
    console.log(this.orientation);
    this.currentBallots = this.ballotsService.getDefaultBallots();
    this.login();
  }

  setCurrentBallots(ballots: DoubleBallots) {
    this.currentBallots = ballots;
  }

  login() {
    this.loginService.login('suzyido@yahoo.com', 'password')
    .subscribe((user: HttpResponse<Object>) => {
      console.log('User successfuly logged in with token:', user.headers.get('x-auth'));
      this.onNext();
    });
  }

  onNext() { // Unit Tested
    this.votedIndex = undefined;
    this.ballotsService.getNextBallots()
    .subscribe(
      (serverOptionsGroup: Object) => {
        if(Object.keys(serverOptionsGroup).length > 0) {
          this.currentBallots = new ServerToClientMapper().toClientBallots(serverOptionsGroup);
        }
        else {
          this.currentBallots = null;
        }
      },
      (error) => {
        console.log(error.message);
        return null;
      }
    )
  }

  onPrev() { // Unit Tested
    this.votedIndex = undefined;
    this.ballotsService.getPreviousBallots()
    .subscribe(
      (list: ServerBallots[]) => {
        console.log('In onPrev');
        console.log(list);
        if(list) {
          this.currentBallots = new ServerToClientMapper().toClientBallots(list[0]);
        }
        else {
          return null;
        }
      },
      (error) => {
        console.log(error.message);
        return null;
      }
    )
  }

  onVote(index: number) { // Unit Tested
    console.log('In onVote');
    if(this.isNextAllowed) {
      this.isNextAllowed = false;
      if(this.votedIndex == undefined) {
        this.ballotsService.registerBallots(this.currentBallots.getId(), index)
        .subscribe((list: ServerBallots[]) => {
          if(list) {
            this.currentBallots = new ServerToClientMapper().toClientBallots(list[0]);
            this.votedIndex = index;
            var that = this;
            setTimeout(function () {
              that.isNextAllowed = true;
            }, 1200);
          }
          else {
            return null;
          }
        });
      }
      else {
        this.onNext();
        this.isNextAllowed = true;
      }
    }
  }

  getVotePercentage(index: VoteIndex): number { // Unit Tested    
    if(VoteIndex.FirstVote == index) {
      return this.currentBallots.getFirstVote().getPercentage();
    }
    else if(VoteIndex.SecondVote == index) {
      return this.currentBallots.getSecondVote().getPercentage();
    }
    else {
      return -1;
    }
  }

  isWinVote(index: number): boolean { // Unit Tested
    return this.getVotePercentage(index) >= 50;
  }

  isLooseVote(index: number): boolean { // Unit Tested
    let percentage: number = this.getVotePercentage(index);
    return percentage >= 0 && percentage < 50;
  }

  getImageVoteData(index: VoteIndex): string { // Unit Tested
    return (index == VoteIndex.FirstVote) ? this.currentBallots.getFirstVote().getData() : 
                   this.currentBallots.getSecondVote().getData();
  }

  getBallotsQuestion(): string { // Unit Tested
    if(this.currentBallots) {
      return this.currentBallots.getQuestion();
    }
  }
  
  getVoteTitle(index: VoteIndex): string { // Unit Tested
    return (index == VoteIndex.FirstVote) ? this.currentBallots.getFirstVote().getTitle() : 
                   this.currentBallots.getSecondVote().getTitle();    
  }

  getCurrentBallots(): DoubleBallots { // Unit Tested
    return this.currentBallots;
  }
 
  getVotedIndex(): VoteIndex { // Unit Tested
    return this.votedIndex;
  }

  getCurrentScreenOrientation(): string { // No Unit Test
    console.log('In getCurrentScreenOrientation')
    return this.screenOrientation.type;
  }

  isLandscape(): boolean { // No Unit Test
    return !this.isPortrait();
  }
  isPortrait(): boolean {
    return (this.screenOrientation.type == this.screenOrientation.ORIENTATIONS.PORTRAIT ||
            this.screenOrientation.type == this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
  }

  onClickToContinue() { // No Unit Test
    console.log('In onClickToContinue');
  }

  onMoreOptions() { // No Unit Test
    console.log('In onMoreOptions');
    this.navCtrl.push(NewBallotsPage);
  }

  subjectChanged() {
    console.log(this.subject);
  }
}
