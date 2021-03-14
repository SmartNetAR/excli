import ContainerFactory from '../../../Infrastructure/Factories/ContainerFactory';
import I{{entity_name}}Domain from '../../../InterfaceAdapters/IDomain/I{{entity_name}}Domain';
import I{{entity_name}}Repository from '../../../InterfaceAdapters/IRepositories/I{{entity_name}}Repository';
import {{entity_name}}UpdatePayload from '../../../InterfaceAdapters/Payloads/{{entities_name}}/{{entity_name}}UpdatePayload';
import {REPOSITORIES} from '../../../repositories';

class Update{{entity_name}}UseCase
{
    private repository: I{{entity_name}}Repository;

    constructor()
    {
        this.repository = ContainerFactory.create<I{{entity_name}}Repository>(REPOSITORIES.I{{entity_name}}Repository);
    }

    async handle(payload: {{entity_name}}UpdatePayload): Promise<I{{entity_name}}Domain>
    {
        const id = payload.getId();
        const {{entity_name_lc}} = await this.repository.getOne(id);

        {{entity_name_lc}}.name = payload.getName();
        {{entity_name_lc}}.type = payload.getType();

        await this.repository.save({{entity_name_lc}});

        return {{entity_name_lc}};
    }
}

export default Update{{entity_name}}UseCase;
