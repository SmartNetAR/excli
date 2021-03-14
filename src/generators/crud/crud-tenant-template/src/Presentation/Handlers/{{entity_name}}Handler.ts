import {IPaginator, StatusCode} from '@digichanges/shared-experience';
import {NextFunction, Request, Response} from 'express';
import {inject} from 'inversify';
import {controller, httpDelete, httpGet, httpPost, httpPut, next, request, response} from 'inversify-express-utils';
import ValidatorRequest from '../../Application/Shared/ValidatorRequest';
import Permissions from '../../Config/Permissions';
import Get{{entity_name}}UseCase from '../../Domain/UseCases/{{entity_name}}/Get{{entity_name}}UseCase';
import List{{entities_name}}UseCase from '../../Domain/UseCases/{{entity_name}}/List{{entities_name}}UseCase';
import Remove{{entity_name}}UseCase from '../../Domain/UseCases/{{entity_name}}/Remove{{entity_name}}UseCase';
import Save{{entity_name}}UseCase from '../../Domain/UseCases/{{entity_name}}/Save{{entity_name}}UseCase';
import Update{{entity_name}}UseCase from '../../Domain/UseCases/{{entity_name}}/Update{{entity_name}}UseCase';
import I{{entity_name}}Domain from '../../InterfaceAdapters/IDomain/I{{entity_name}}Domain';
import {TYPES} from '../../types';
import AuthorizeMiddleware from '../Middlewares/AuthorizeMiddleware';
import TenantAndIdRequest from "../Requests/Handler/Defaults/TenantAndIdRequest";
import {{entity_name}}RepRequest from '../Requests/Handler/{{entities_name}}/{{entity_name}}RepRequest';
import {{entity_name}}RequestCriteria from '../Requests/Handler/{{entities_name}}/{{entity_name}}RequestCriteria';
import {{entity_name}}UpdateRequest from '../Requests/Handler/{{entities_name}}/{{entity_name}}UpdateRequest';
import Responder from '../Shared/Responder';
import {{entity_name}}Transformer from '../Transformers/{{entities_name}}/{{entity_name}}Transformer';

@controller('/api/{{entities_name_lc}}')
class {{entity_name}}Handler
{
    @inject(TYPES.Responder)
    private responder: Responder;

    @httpPost('/', AuthorizeMiddleware(Permissions.{{entities_name_uc}}_SAVE))
    public async save (@request() req: Request, @response() res: Response, @next() nex: NextFunction): Promise<void>
    {
        const _request = new {{entity_name}}RepRequest(req);
        await ValidatorRequest.handle(_request);

        const save{{entity_name}}UseCase = new Save{{entity_name}}UseCase();
        const {{entity_name_lc}}: I{{entity_name}}Domain = await save{{entity_name}}UseCase.handle(_request);

        this.responder.send({{entity_name_lc}}, req, res, StatusCode.HTTP_CREATED, new {{entity_name}}Transformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.{{entities_name_uc}}_LIST))
    public async list (@request() req: Request, @response() res: Response, @next() nex: NextFunction): Promise<void>
    {
        const _request = new {{entity_name}}RequestCriteria(req);
        await ValidatorRequest.handle(_request);

        const list{{entities_name}}UseCase = new List{{entities_name}}UseCase();
        const paginator: IPaginator = await list{{entities_name}}UseCase.handle(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new {{entity_name}}Transformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.{{entities_name_uc}}_SHOW))
    public async getOne  (@request() req: Request, @response() res: Response, @next() nex: NextFunction): Promise<void>
    {
        const _request = new TenantAndIdRequest(req);
        await ValidatorRequest.handle(_request);

        const get{{entity_name}}UseCase = new Get{{entity_name}}UseCase();
        const {{entity_name_lc}}: I{{entity_name}}Domain = await get{{entity_name}}UseCase.handle(_request);

        this.responder.send({{entity_name_lc}}, req, res, StatusCode.HTTP_OK, new {{entity_name}}Transformer());
    }

    @httpPut('/:id', AuthorizeMiddleware(Permissions.{{entities_name_uc}}_UPDATE))
    public async update (@request() req: Request, @response() res: Response, @next() nex: NextFunction): Promise<void>
    {
        const _request = new {{entity_name}}UpdateRequest(req);
        await ValidatorRequest.handle(_request);

        const update{{entity_name}}UseCase = new Update{{entity_name}}UseCase();
        const {{entity_name_lc}}: I{{entity_name}}Domain = await update{{entity_name}}UseCase.handle(_request);

        this.responder.send({{entity_name_lc}}, req, res, StatusCode.HTTP_CREATED, new {{entity_name}}Transformer());
    }

    @httpDelete('/:id', AuthorizeMiddleware(Permissions.{{entities_name_uc}}_DELETE))
    public async remove (@request() req: Request, @response() res: Response, @next() nex: NextFunction): Promise<void>
    {
        const _request = new TenantAndIdRequest(req);
        await ValidatorRequest.handle(_request);

        const remove{{entity_name}}UseCase = new Remove{{entity_name}}UseCase();
        const {{entity_name_lc}}: I{{entity_name}}Domain = await remove{{entity_name}}UseCase.handle(_request);

        this.responder.send({{entity_name_lc}}, req, res, StatusCode.HTTP_OK, new {{entity_name}}Transformer());
    }
}

export default {{entity_name}}Handler;
