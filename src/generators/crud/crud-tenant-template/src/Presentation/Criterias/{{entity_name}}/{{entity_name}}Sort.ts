import {Sort} from '@digichanges/shared-experience';

class {{entity_name}}Sort extends Sort
{
    static readonly NAME: string = 'name';
    static readonly TYPE: string = 'type';
    // ... edit / implements

    getFields(): any
    {
        return [
            {{entity_name}}Sort.NAME,
            {{entity_name}}Sort.TYPE
        ];
    }

    getDefaultSorts(): any
    {
        return [
            {[{{entity_name}}Sort.NAME]: 'asc'}
        ];
    }
}

export default {{entity_name}}Sort;
