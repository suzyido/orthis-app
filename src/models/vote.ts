import { VoteType } from '../enums/vote_type_enum';

export class Vote {
    constructor(private type: VoteType,
                private title: string, 
                private data: any,
                private percentage: number) {}

    getTitle(): string { // Unit Tested
        return this.title;
    }   

    getData(): any { // Unit Tested
        return this.data;
    }
    
    getType(): VoteType { // Unit Tested
        return this.type;
    }

    getPercentage(): number { // Unit Tested
        return this.percentage;
    }

    equals(vote: Vote) { // Unit Tested
        return this.type == vote.type && 
               this.title == vote.title &&
               this.data == vote.data &&
               this.percentage == vote.percentage;
    }
} 