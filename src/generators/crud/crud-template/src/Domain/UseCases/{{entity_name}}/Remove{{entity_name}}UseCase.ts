import ContainerFactory from '../../../Infrastructure/Factories/ContainerFactory';
import I{{entity_name}}Domain from '../../../InterfaceAdapters/IDomain/I{{entity_name}}Domain';
import I{{entity_name}}Repository from '../../../InterfaceAdapters/IRepositories/I{{entity_name}}Repository';
import IdPayload from '../../../InterfaceAdapters/Payloads/Defaults/IdPayload';
import {REPOSITORIES} from '../../../repositories';

class Remove{{entity_name}}UseCase
{
    private repository: I{{entity_name}}Repository;

    constructor()
    {
        this.repository = ContainerFactory.create<I{{entity_name}}Repository>(REPOSITORIES.I{{entity_name}}Repository);
    }

    async handle(payload: IdPayload): Promise<I{{entity_name}}Domain>
    {
        const id = payload.getId();
        return await this.repository.delete(id);
    }
}

export default Remove{{entity_name}}UseCase;
