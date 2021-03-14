import {IBaseRepository} from '@digichanges/shared-experience';
import I{{entity_name}}Domain from '../IDomain/I{{entity_name}}Domain';

interface I{{entity_name}}Repository extends IBaseRepository
{
    getOneBy(conditions: {}): Promise<I{{entity_name}}Domain>;
}

export default I{{entity_name}}Repository;
