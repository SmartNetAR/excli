import { lazyInject } from '../../../inversify.config'
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";
import I{{entity_name}}Repository from "../../../InterfaceAdapters/IRepositories/I{{entity_name}}Repository";
import {REPOSITORIES} from "../../../repositories";
import I{{entity_name}}Domain from "../../../InterfaceAdapters/IDomain/I{{entity_name}}Domain";

class Remove{{entity_name}}UseCase
{
    @lazyInject(REPOSITORIES.I{{entity_name}}Repository)
    private repository: I{{entity_name}}Repository;

    async handle(payload: IdPayload): Promise<I{{entity_name}}Domain>
    {
        const id = payload.getId();
        return await this.repository.delete(id);
    }
}

export default Remove{{entity_name}}UseCase;
