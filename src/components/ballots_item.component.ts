import { VoteType } from '../enums/vote_type_enum';
import { Vote } from '../models/vote';
import { DoubleBallots } from '../models/double_ballots';
import { Input, Output, EventEmitter, Component } from "@angular/core";
import { VoteIndex } from '../enums/vote_index_enum';

@Component({
    selector: "ballots-item",
    template:  
    `
    <div>
      <ion-card (click)="onVote()">
        <ion-card-content>
          <div class="{{getVoteItemClass()}}">
            <div *ngIf="isPictureVote()">
              <img src="{{getVoteData()}}"/>
            </div>
            <div 
              *ngIf="isTextVote()"
              class="text_vote_container">
              <span 
                class="text_vote">
                {{getVoteData()}}
              </span>  
            </div>
            <h2 text-center>{{getVoteTitle()}}</h2>
            <div 
              *ngIf="wasVoted()"
              class="{{getVoteClass()}}">
              {{getVotePercentage()}}%
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </div>
    `
})
export class BallotsItemComponent {
    @Input() currentBallots: DoubleBallots;
    @Input() index: VoteIndex;
    @Input() votedIndex: VoteIndex;
    @Output() didVote = new EventEmitter<number>();

    private getVote(): Vote {
      if(0 == this.index) {
        return this.currentBallots.getFirstVote(); 
      }
      else if(1 == this.index) {
              return this.currentBallots.getSecondVote();
            }
      return null;
    }

    getVotePercentage(): number {    
        let vote: Vote = this.getVote();  
        if(null != vote) {
          return vote.getPercentage();
        }
        return -1;
    }
      
    isWinVote(): boolean {
      return this.getVotePercentage() >= 50;
    }
  
    isLooseVote(): boolean {
      let percentage: number = this.getVotePercentage();
      return percentage >= 0 && percentage < 50;
    }
  
    getVoteData(): string {
      let vote: Vote = this.getVote();
      if(null != vote) {
        return vote.getData();
      }
      return null;
    }
  
    getBallotQuestion(): string {
      return this.currentBallots.getQuestion();
    }
    
    getVoteTitle(): string {
      return (this.index == VoteIndex.FirstVote) ? this.currentBallots.getFirstVote().getTitle() : 
                      this.currentBallots.getSecondVote().getTitle();    
    }
  
    getCurrentBallots(): DoubleBallots {
      return this.currentBallots;
    }    

    onVote() {
      this.didVote.emit(this.index);
    }

    getVoteItemClass(): string {
      return this.votedIndex == this.index ? "vote_item_selected" : "vote_item";
    }

    getVoteClass(): string {
      if(this.isWinVote()) {
        return "winning_vote_value";
      }
      else if(this.isLooseVote()) {
        return "loosing_vote_value";
      }

      return "no_class";
    }

    wasVoted(): boolean {
      return this.isWinVote() || this.isLooseVote();
    }

    isPictureVote(): boolean {
      let vote: Vote = this.getVote();
      if(null != vote) {
        return vote.getType() == VoteType.Picture;
      }
    }

    isTextVote(): boolean {
      let vote: Vote = this.getVote();
      if(null != vote) {
        return vote.getType() == VoteType.Text;
      }
    }
}