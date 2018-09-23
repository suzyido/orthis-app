import { ServerBallotsDefinition } from './server_ballots_definition';

export class ServerBallots {
    constructor(public id: number, 
                public definition: ServerBallotsDefinition,
                public user: number,
                public status: number,
                public post_date: string,
                public vote_count: number,
                public opt1_count: number,
                public opt2_count: number) {}
}
