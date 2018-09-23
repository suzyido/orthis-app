import { ServerBallotsOptionContent } from './server_ballots_option_content';

export class ServerBallotsOption {
    constructor(public id: number,
                public answer: string,
                public description: string,
                public contents: ServerBallotsOptionContent[]) {}
}
