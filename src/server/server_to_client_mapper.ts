import { ServerBallots } from "../models/server_ballots";
import { DoubleBallots } from "../models/double_ballots";
import { Vote } from "../models/vote";
import { VoteType } from "../enums/vote_type_enum";
import { ServerBallotsDefinition } from "../models/server_ballots_definition";
import { ServerBallotsQuestion } from "../models/server_ballots_question";
import { ServerBallotsOption } from "../models/server_ballots_option";
import { ServerBallotsOptionContent } from "../models/server_ballots_option_content";

export class ServerToClientMapper {
    
    toClientBallots(serverBallots: ServerBallots): DoubleBallots {
        const id: number = serverBallots.id;
        const question: string = serverBallots.definition.question.question;
        const isNewBallots: boolean = serverBallots.status == 1 ; // TBD Ask Ethan
        
        let voteType: number = // TBD Ask Ethan
                serverBallots.definition.option1.contents.length > 0 ?
                    VoteType.Picture : VoteType.Text;

        let title: string = serverBallots.definition.option1.description;
        
        let data: string = 
            serverBallots.definition.option1.contents.length > 0 ?
                serverBallots.definition.option1.contents[0].document : 
                serverBallots.definition.option1.answer;

        let percentage: number = 
            Math.floor(100 * (serverBallots.opt1_count / serverBallots.vote_count));

        let firstVote: Vote = new Vote(voteType, title, data, percentage);

        voteType = // TBD Ask Ethan
            serverBallots.definition.option2.contents.length > 0 ?
                VoteType.Picture : VoteType.Text;

        title = serverBallots.definition.option2.description;
        
        data = 
            serverBallots.definition.option2.contents.length > 0 ?
                serverBallots.definition.option2.contents[0].document : 
                serverBallots.definition.option2.answer;

        percentage = 100 - percentage;
        
        let secondVote: Vote = new Vote(voteType, title, data, percentage);

        const ballots: DoubleBallots = new DoubleBallots(id, 
                                                         question, 
                                                         firstVote, 
                                                         secondVote, 
                                                         isNewBallots);
        return ballots;
    }

    toServerBallots(ballots: DoubleBallots): ServerBallots {
        return new ServerBallots(1,
            new ServerBallotsDefinition(
                new ServerBallotsQuestion(1, 
                                        ballots.getQuestion(),
                                        'first description'),
                new ServerBallotsOption(1,
                                        ballots.getFirstVote().getData(),
                                        ballots.getFirstVote().getTitle(),
                                        [new ServerBallotsOptionContent(1,
                                            ballots.getFirstVote().getData(), 
                                            1, 
                                            'desc', 
                                            'time')]),
                new ServerBallotsOption(2,
                                        ballots.getSecondVote().getData(),
                                        ballots.getSecondVote().getTitle(),
                                        [new ServerBallotsOptionContent(1,
                                            ballots.getSecondVote().getData(), 
                                            1, 
                                            'desc', 
                                            'time')])),
                                            1,1,'date', 
                                            100, 
                                            ballots.getFirstVote().getPercentage(), 
                                            ballots.getSecondVote().getPercentage());           
    }

    getDummyServerBallots() { // Unit Tested
        return new ServerBallots(1,
                new ServerBallotsDefinition(
                    new ServerBallotsQuestion(1, 
                                            'first question',
                                            'first description'),
                    new ServerBallotsOption(1,
                                            'first answer',
                                            'first description',
                                            [new ServerBallotsOptionContent(1,
                                                'http', 
                                                1, 
                                                'desc', 
                                                'time')]),
                    new ServerBallotsOption(2,
                                            'second answer',
                                            'second description',
                                            [new ServerBallotsOptionContent(1,
                                                'http', 
                                                1, 
                                                'desc', 
                                                'time')])),
                                                1,1,'date', 10, 4, 6);           
    }
}