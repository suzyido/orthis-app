export abstract class Ballots {
    constructor(protected id: number,
                protected question: string, 
                protected isNewBallots: boolean) {}

    getId(): number { // Unit Tested
        return this.id;
    }

    getQuestion(): string { // Unit Tested
        return this.question;
    }

    isNew(): boolean { // Unit Tested
        console.log('In isNew with: ' +  this.isNewBallots)
        return this.isNewBallots;
    }

    markAsNotNew() { // Unit Tested
        this.isNewBallots = false;
    }

    equales(ballots: Ballots) { // Unit Tested
        return this.id == ballots.id &&
               this.question == ballots.question &&
               this.isNewBallots == ballots.isNewBallots;
    }

} 