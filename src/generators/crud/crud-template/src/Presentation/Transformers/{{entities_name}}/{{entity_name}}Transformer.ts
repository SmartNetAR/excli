import {Transformer} from '@digichanges/shared-experience';
import moment from 'moment';
import I{{entity_name}}Domain from '../../../InterfaceAdapters/IDomain/I{{entity_name}}Domain';

class {{entity_name}}Transformer extends Transformer
{
    public transform({{entity_name_lc}}: I{{entity_name}}Domain)
    {
        return {
            'id': {{entity_name_lc}}.getId(),
            'name': {{entity_name_lc}}.name,
            'type': {{entity_name_lc}}.type,
            // ... edit / implements
            'createdAt': moment({{entity_name_lc}}.createdAt).utc().unix(),
            'updatedAt': moment({{entity_name_lc}}.updatedAt).utc().unix(),
        };
    }
}

export default {{entity_name}}Transformer;
