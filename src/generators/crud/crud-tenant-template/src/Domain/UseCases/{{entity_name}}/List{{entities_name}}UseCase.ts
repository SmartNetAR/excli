import {ICriteria, IPaginator} from '@digichanges/shared-experience';
import ContainerFactory from '../../../Infrastructure/Factories/ContainerFactory';
import I{{entity_name}}Repository from '../../../InterfaceAdapters/IRepositories/I{{entity_name}}Repository';
import {REPOSITORIES} from '../../../repositories';

class List{{entities_name}}UseCase
{
    private repository: I{{entity_name}}Repository;

    constructor()
    {
        this.repository = ContainerFactory.create<I{{entity_name}}Repository>(REPOSITORIES.I{{entity_name}}Repository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default List{{entities_name}}UseCase;
