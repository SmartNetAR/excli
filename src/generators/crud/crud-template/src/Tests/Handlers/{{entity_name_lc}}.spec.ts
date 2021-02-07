import {InversifyExpressServer} from "inversify-express-utils";
import supertest from "supertest";
import ICreateConnection from "../../InterfaceAdapters/IDatabase/ICreateConnection";
import initServer from "../initServer";

describe("Start {{entity}} Test", () =>
{
    let server: InversifyExpressServer;
    let request: supertest.SuperTest<supertest.Test>;
    let dbConnection: ICreateConnection;
    let token: any = null;
    let {{entity_name_lc}}Id: string = '';
    let deleteResponse: any = null;

    beforeAll(async (done) => {
        const configServer = await initServer();

        server = configServer.server;
        request = configServer.request;
        dbConnection = configServer.dbConnection;

        done();
    });

    afterAll((async (done) => {
        await dbConnection.drop();
        await dbConnection.close();

        done();
    }));

    describe('{{entity}} Success', () =>
    {
        beforeAll(async (done) => {
           const payload = {
                email: "user@node.com",
                password: "12345678"
            };

            const response: any = await request
                .post("/api/auth/login?provider=local")
                .set('Accept', 'application/json')
                .send(payload);

            const {body: {data} } = response;

            token = data.token;

            done();
        });

        test('Add {{entity}} /{{entities_name_lc}}', async done => {
           const payload = {
                name: '{{entity}} 1',
                type: 10
            };

            const response: any = await request
                .post('/api/{{entities_name_lc}}')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const {body: {status, statusCode, data, metadata: {refreshToken} } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.type).toStrictEqual(payload.type);

            token = refreshToken;
            {{entity_name_lc}}Id = data.id;

            done();
        });

        test('Get {{entity}} /{{entities_name_lc}}/:id', async done => {

            const payload = {
                name: '{{entity}} 1',
                type: 10
            };

            const response: any = await request
                .get(`/api/{{entities_name_lc}}/${{{entity_name_lc}}Id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data, metadata: {refreshToken} } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.type).toStrictEqual(payload.type);

            token = refreshToken;

            done();
        });

        test('Update {{entity}} /{{entities_name_lc}}/:id', async done => {
            const payload = {
                name: '{{entity}} 1 update',
                type: 11
            }

            const response: any = await request
                .put(`/api/{{entities_name_lc}}/${{{entity_name_lc}}Id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const {body: {status, statusCode, data, metadata: {refreshToken} } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.type).toStrictEqual(payload.type);

            token = refreshToken;

            done();
        });

        test('Delete {{entity}} /{{entities_name_lc}}/:id', async done => {
            const payload = {
                name: '{{entity}} 13 for delete',
                type: 13
            }

            const createResponse: any = await request
                .post('/api/{{entities_name_lc}}')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            deleteResponse = await request
                .delete(`/api/{{entities_name_lc}}/${createResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${createResponse.body.metadata.refreshToken}`)
                .send();

            const {body: {status, statusCode, data, metadata: {refreshToken} } } = deleteResponse;

            expect(deleteResponse.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.type).toStrictEqual(payload.type);

            token = refreshToken;

            done();
        });

        test('Get {{entities_name}} /{{entities_name_lc}}', async done => {

            const response: any = await request
                .get('/api/{{entities_name_lc}}?pagination[limit]=5&pagination[offset]=0')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data, pagination, metadata: {refreshToken} } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.length).toStrictEqual(5);
            expect(pagination.total).toStrictEqual(5);
            expect(pagination.currentUrl).toContain('/api/{{entities_name_lc}}?pagination[limit]=5&pagination[offset]=0');
            expect(pagination.nextUrl).toContain('/api/{{entities_name_lc}}?pagination[limit]=5&pagination[offset]=5');

            token = refreshToken;

            done();
        });

        test('Get {{entities_name}} /{{entities_name_lc}} without pagination', async done => {

            const response: any = await request
                .get('/api/{{entities_name_lc}}')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data, pagination, metadata: {refreshToken} } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.length).toStrictEqual(11);
            expect(pagination).not.toBeDefined();

            token = refreshToken;

            done();
        });

        test('Get {{entities_name}} /{{entities_name_lc}} with Filter Type', async done => {

            const response: any = await request
                .get('/api/{{entities_name_lc}}?pagination[limit]=20&pagination[offset]=0&filter[type]=11')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data, pagination, metadata: {refreshToken} } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.length).toStrictEqual(1);
            expect(pagination.total).toStrictEqual(1);

            expect(data[0].type).toStrictEqual(11);

            token = refreshToken;

            done();
        });

        test('Get {{entities_name}} /{{entities_name_lc}} with Sort Desc Type', async done => {

            const response: any = await request
                .get('/api/{{entities_name_lc}}?pagination[limit]=20&pagination[offset]=0&sort[type]=desc')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data: [{{entity_name_lc}}1, {{entity_name_lc}}2], metadata: {refreshToken} } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect({{entity_name_lc}}1.type).toBeGreaterThanOrEqual({{entity_name_lc}}2.type);

            token = refreshToken;

            done();
        });
    });

    describe('{{entity}} Fails', () =>
    {
        beforeAll(async (done) => {
           const payload = {
                email: "user@node.com",
                password: "12345678"
            };

            const response: any = await request
                .post("/api/auth/login?provider=local")
                .set('Accept', 'application/json')
                .send(payload);

            const {body: {data} } = response;

            token = data.token;

            done();
        });

        test('Add {{entity}} /{{entities_name_lc}}', async done => {
           const payload = {
                name: '{{entity}} 2',
                type: '{{entity}} 1'
            };

            const response: any = await request
                .post('/api/{{entities_name_lc}}')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const {body: {status, statusCode, message, errors: [error], metadata: {refreshToken} } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
            expect(message).toStrictEqual('Failed Request.');

            expect(error.property).toStrictEqual('type');
            expect(error.constraints.isInt).toStrictEqual('type must be an integer number');

            token = refreshToken;

            done();
        });

        test('Get {{entity}} /{{entities_name_lc}}/:id', async done => {

            const response: any = await request
                .get(`/api/{{entities_name_lc}}/${{{entity_name_lc}}Id}dasdasda123`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, message, errors: [error], metadata: {refreshToken} } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
            expect(message).toStrictEqual('Failed Request.');

            expect(error.property).toStrictEqual('id');
            expect(error.constraints.isUuid).toBeDefined();
            expect(error.constraints.isUuid).toStrictEqual('id must be an UUID');

            token = refreshToken;

            done();
        });

        test('Update {{entity}} /{{entities_name_lc}}/:id', async done => {
            const payload = {
                name: 11,
                type: 'asdasd'
            }

            const response: any = await request
                .put(`/api/{{entities_name_lc}}/${{{entity_name_lc}}Id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const {body: {status, statusCode, message, errors: [errorName, errorType], metadata: {refreshToken} } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
            expect(message).toStrictEqual('Failed Request.');

            expect(errorName.property).toStrictEqual('name');
            expect(errorName.constraints.isString).toBeDefined();
            expect(errorName.constraints.isString).toStrictEqual('name must be a string');

            expect(errorType.property).toStrictEqual('type');
            expect(errorType.constraints.isInt).toBeDefined();
            expect(errorType.constraints.isInt).toStrictEqual('type must be an integer number');

            token = refreshToken;

            done();
        });

        test('Delete {{entity}} error /{{entities_name_lc}}/:id', async done => {

            const deleteErrorResponse: any = await request
                .delete(`/api/{{entities_name_lc}}/${deleteResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, message, metadata: {refreshToken} } } = deleteErrorResponse;

            expect(deleteErrorResponse.statusCode).toStrictEqual(400);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_BAD_REQUEST');
            expect(message).toStrictEqual('{{entity}} Not Found');

            token = refreshToken;

            done();
        });
    });
});

