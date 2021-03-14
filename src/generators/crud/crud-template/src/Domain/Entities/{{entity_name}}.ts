import I{{entity_name}}Domain from '../../InterfaceAdapters/IDomain/I{{entity_name}}Domain';
import {v4 as uuidv4} from 'uuid';

class {{entity_name}} implements I{{entity_name}}Domain
{
    _id: string;
    name: string;
    type: number;
    // ... edit me
    createdAt: Date;
    updatedAt: Date;

    constructor()
    {
        this._id = uuidv4();
    }

    getId(): string
    {
        return this._id;
    }
}

export default {{entity_name}};
