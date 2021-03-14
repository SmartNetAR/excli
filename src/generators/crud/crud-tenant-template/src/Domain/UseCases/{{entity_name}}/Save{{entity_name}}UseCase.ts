import {{entity_name}} from '../../../Domain/Entities/{{entity_name}}';
import ContainerFactory from '../../../Infrastructure/Factories/ContainerFactory';
import I{{entity_name}}Domain from '../../../InterfaceAdapters/IDomain/I{{entity_name}}Domain';
import I{{entity_name}}Repository from '../../../InterfaceAdapters/IRepositories/I{{entity_name}}Repository';
import {{entity_name}}RepPayload from '../../../InterfaceAdapters/Payloads/{{entities_name}}/{{entity_name}}RepPayload';
import {REPOSITORIES} from '../../../repositories';

class Save{{entity_name}}UseCase
{
    private repository: I{{entity_name}}Repository;

    constructor()
    {
        this.repository = ContainerFactory.create<I{{entity_name}}Repository>(REPOSITORIES.I{{entity_name}}Repository);
    }

    async handle(payload: {{entity_name}}RepPayload): Promise<I{{entity_name}}Domain>
    {
        let {{entity_name_lc}} = new {{entity_name}}();
        {{entity_name_lc}}.name = payload.getName();
        {{entity_name_lc}}.type = payload.getType();
        // ... edit me
        {{entity_name_lc}}.tenant = payload.getTenant();

        await this.repository.save({{entity_name_lc}});

        return {{entity_name_lc}};
    }
}

export default Save{{entity_name}}UseCase;
