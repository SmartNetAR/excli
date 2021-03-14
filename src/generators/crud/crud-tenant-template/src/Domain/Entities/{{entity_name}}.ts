import I{{entity_name}}Domain from '../../InterfaceAdapters/IDomain/I{{entity_name}}Domain';
import {v4 as uuidv4} from 'uuid';
import ITenantDomain from '../../InterfaceAdapters/IDomain/ITenantDomain';

class {{entity_name}} implements I{{entity_name}}Domain
{
    _id: string;
    name: string;
    type: number;
    // ... edit me
    tenant: ITenantDomain;
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

    getTenant(): ITenantDomain
    {
        return this.tenant;
    }
}

export default {{entity_name}};
