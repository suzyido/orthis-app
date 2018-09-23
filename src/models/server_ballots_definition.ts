import { ServerBallotsQuestion } from './server_ballots_question';
import { ServerBallotsOption } from './server_ballots_option';

export class ServerBallotsDefinition {
    constructor(public question: ServerBallotsQuestion,
                public option1: ServerBallotsOption,
                public option2: ServerBallotsOption) {}
}
