import { ServerBallots } from "../models/server_ballots";
import { DoubleBallots } from "../models/double_ballots";
import { Vote } from "../models/vote";
import { VoteType } from "../enums/vote_type_enum";
import { ServerBallotsDefinition } from "../models/server_ballots_definition";
import { ServerBallotsQuestion } from "../models/server_ballots_question";
import { ServerBallotsOption } from "../models/server_ballots_option";
import { ServerBallotsOptionContent } from "../models/server_ballots_option_content";

export class ServerToClientMapper {
    
    toClientBallots(serverOptionsGroup): DoubleBallots {
        console.log('In toClientBallots', serverOptionsGroup);
        const id: number = serverOptionsGroup._id;
        const question: string = serverOptionsGroup.title;
        const totalSelectedCount = 
                        serverOptionsGroup.options[0].selectedCount + 
                        serverOptionsGroup.options[1].selectedCount;
        
        let voteType: number = serverOptionsGroup.options[0].type == 'text' ?
                               VoteType.Text : VoteType.Picture;
        let title: string = serverOptionsGroup.options[0].title;
        let data: string = serverOptionsGroup.options[0].data;
        let percentage: number = 
            Math.floor(100 * (serverOptionsGroup.options[0].selectedCount / totalSelectedCount));
        let firstVote: Vote = new Vote(voteType, title, data, percentage);
        
        voteType = serverOptionsGroup.options[1].type == 'text' ?
                   VoteType.Text : VoteType.Picture;
        title = serverOptionsGroup.options[1].title;
        data = serverOptionsGroup.options[1].data;
        percentage = 
            Math.floor(100 * (serverOptionsGroup.options[1].selectedCount / totalSelectedCount));
        let secondVote: Vote = new Vote(voteType, title, data, percentage);

        const ballots: DoubleBallots = new DoubleBallots(id, 
                                                         question, 
                                                         firstVote, 
                                                         secondVote, 
                                                         true);
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