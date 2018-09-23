import { DoubleBallots } from './../models/double_ballots';
import { ServerBallotsDefinition } from './../models/server_ballots_definition';
import { ServerBallots } from './../models/server_ballots';
import { ServerToClientMapper } from './server_to_client_mapper';

describe('ServerToClientMapper is not working as expected', () => {
    let mapper: ServerToClientMapper;
    let serverBallots: ServerBallots;
    let doubleBallot: DoubleBallots;

    beforeAll(() => {
        mapper = new ServerToClientMapper();
        serverBallots = mapper.getDummyServerBallots();
        doubleBallot = mapper.toClientBallots(serverBallots);
    })

    it('- getDummyServerBallots()', () => {
        expect(serverBallots).toBeTruthy();
        expect(serverBallots.id).toBe(1);
        expect(serverBallots.vote_count).toBe(10);
        expect(serverBallots.opt1_count).toBe(4);
        expect(serverBallots.opt2_count).toBe(6);
        expect(serverBallots.definition.question.question).toEqual('first question');
        expect(serverBallots.definition.option1.answer).toEqual('first answer');
        expect(serverBallots.definition.option1.contents[0].document).toEqual('http');
        expect(serverBallots.definition.option1.description).toEqual('first description');
        expect(serverBallots.definition.option2.answer).toEqual('second answer');
        expect(serverBallots.definition.option2.contents[0].document).toEqual('http');
        expect(serverBallots.definition.option2.description).toEqual('second description');
    });

    it('- toClientBallots()', () => {
        expect(doubleBallot.getId()).toEqual(1);
        expect(doubleBallot.getQuestion()).toEqual('first question');
        expect(doubleBallot.getFirstVote().getType()).toEqual(1);
        expect(doubleBallot.getFirstVote().getTitle()).toEqual('first description');
        expect(doubleBallot.getFirstVote().getPercentage()).toEqual(40);
        expect(doubleBallot.getFirstVote().getData()).toEqual('http');
        expect(doubleBallot.getSecondVote().getType()).toEqual(1);
        expect(doubleBallot.getSecondVote().getTitle()).toEqual('second description');
        expect(doubleBallot.getSecondVote().getPercentage()).toEqual(60);
        expect(doubleBallot.getSecondVote().getData()).toEqual('http');
    });
})