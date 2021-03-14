import {Filter} from '@digichanges/shared-experience';

class {{entity_name}}Filter extends Filter
{
    static readonly NAME: string = 'name';
    static readonly TYPE: string = 'type';
    // ... edit / implements

    getFields(): any
    {
        return [
            {{entity_name}}Filter.NAME,
            {{entity_name}}Filter.TYPE
        ];
    }

    getDefaultFilters(): any
    {
        return [];
    }
}

export default {{entity_name}}Filter;
