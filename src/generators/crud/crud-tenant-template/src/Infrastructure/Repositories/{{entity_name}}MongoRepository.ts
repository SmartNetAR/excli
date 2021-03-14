import {IPaginator} from '@digichanges/shared-experience';
import {injectable} from 'inversify';
import {Model, Query} from 'mongoose';
import I{{entity_name}}Domain from '../../InterfaceAdapters/IDomain/I{{entity_name}}Domain';
import I{{entity_name}} from '../../InterfaceAdapters/IEntities/Mongoose/I{{entity_name}}Document';
import I{{entity_name}}Repository from '../../InterfaceAdapters/IRepositories/I{{entity_name}}Repository';
import ICriteriaAndTenant from "../../InterfaceAdapters/Shared/ICriteriaAndTenant";
import {{entity_name}}Filter from '../../Presentation/Criterias/{{entity_name}}/{{entity_name}}Filter';
import MongoPaginator from '../../Presentation/Shared/MongoPaginator';
import {connection} from '../Database/MongooseCreateConnection';
import NotFoundException from '../Exceptions/NotFoundException';

@injectable()
class {{entity_name}}MongoRepository implements I{{entity_name}}Repository
{
    private readonly repository: Model<I{{entity_name}}>;

    constructor()
    {
        this.repository = connection.model<I{{entity_name}}>('{{entity_name_snakeCase}}');
    }

    async save ({{entity_name_lc}}: I{{entity_name}}Domain): Promise<I{{entity_name}}Domain>
    {
        return await this.repository.create({{entity_name_lc}});
    }

    async getOne(id: string): Promise<I{{entity_name}}Domain>
    {
        const {{entity_name_lc}} = await this.repository.findOne({_id: id});

        if (!{{entity_name_lc}})
        {
            throw new NotFoundException('{{entity_name}}');
        }

        return {{entity_name_lc}};
    }

    async list(criteria: ICriteriaAndTenant): Promise<IPaginator>
    {
        const queryBuilder: Query<I{{entity_name}}[], I{{entity_name}}> = this.repository.find();
        const filter = criteria.getFilter();
        let tenantId = criteria.getTenant()?.getId();

        if (filter.has({{entity_name}}Filter.TYPE))
        {
            const type = filter.get({{entity_name}}Filter.TYPE);

            queryBuilder.where({{entity_name}}Filter.TYPE).equals(type);
        }
        if (filter.has({{entity_name}}Filter.NAME))
        {
            const name: string = filter.get({{entity_name}}Filter.NAME);
            const rsearch = new RegExp(name, 'g');

            queryBuilder.where({{entity_name}}Filter.NAME).regex(rsearch);
        }
        if (tenantId)
        {
            queryBuilder.where('tenant').equals(tenantId);
        }

        return new MongoPaginator(queryBuilder, criteria);
    }

    async update({{entity_name_lc}}: I{{entity_name}}Domain): Promise<I{{entity_name}}Domain>
    {
        return this.repository.updateOne({_id: {{entity_name_lc}}.getId()}, {{entity_name_lc}});
    }

    async delete(id: string): Promise<I{{entity_name}}Domain>
    {
        const {{entity_name_lc}} = await this.repository.findByIdAndDelete({_id: id});

        if (!{{entity_name_lc}})
        {
            throw new NotFoundException('{{entity_name}}');
        }

        return {{entity_name_lc}};
    }

    async getOneBy(conditions: {}): PromiseI{{entity_name}}Domain>
    {
        const {{entity_name_lc}} = await this.repository.findOne(conditions);

        if (!{{entity_name_lc}})
        {
            throw new NotFoundException('{{entity_name}}');
        }

        return {{entity_name_lc}};
    }

}

export default {{entity_name}}MongoRepository;
