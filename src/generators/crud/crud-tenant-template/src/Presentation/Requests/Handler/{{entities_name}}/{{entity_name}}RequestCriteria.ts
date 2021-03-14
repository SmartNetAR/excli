import {IFilter, IPagination, ISort, ICriteria} from '@digichanges/shared-experience';
import * as express from 'express';
import ICriteriaAndTenant from "../../../../InterfaceAdapters/Shared/ICriteriaAndTenant";
import {{entity_name}}Filter from '../../../Criterias/{{entity_name}}/{{entity_name}}Filter';
import {{entity_name}}Sort from '../../../Criterias/{{entity_name}}/{{entity_name}}Sort';
import Pagination from '../../../Shared/Pagination';
import TenantRequest from "../Defaults/TenantRequest";

class {{entity_name}}RequestCriteria extends TenantRequest implements ICriteria
{
    private readonly sort: ISort;
    private readonly filter: IFilter;
    private readonly pagination: IPagination;

    constructor(request: express.Request)
    {
        super(request);
        this.pagination = new Pagination(request);
        this.sort = new {{entity_name}}Sort(request);
        this.filter = new {{entity_name}}Filter(request);
    }

    getPagination(): IPagination
    {
        return this.pagination;
    }

    getFilter(): IFilter
    {
        return this.filter;
    }

    getSort(): ISort
    {
        return this.sort;
    }
}

export default {{entity_name}}RequestCriteria;
