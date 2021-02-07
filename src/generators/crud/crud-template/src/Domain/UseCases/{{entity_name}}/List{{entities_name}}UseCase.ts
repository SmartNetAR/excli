import { lazyInject } from '../../../inversify.config'
import ICriteria from "../../../InterfaceAdapters/Shared/ICriteria";
import IPaginator from "../../../InterfaceAdapters/Shared/IPaginator";
import I{{entity_name}}Repository from "../../../InterfaceAdapters/IRepositories/I{{entity_name}}Repository";
import {REPOSITORIES} from "../../../repositories";

class List{{entities_name}}UseCase
{
    @lazyInject(REPOSITORIES.I{{entity_name}}Repository)
    private repository: I{{entity_name}}Repository;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default List{{entities_name}}UseCase;
