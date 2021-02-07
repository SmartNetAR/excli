import * as express from "express";
import {{entity_name}}RepPayload from "../../../../InterfaceAdapters/Payloads/{{entities_name}}/{{entity_name}}RepPayload";
import {IsInt, IsString} from "class-validator";

class {{entity_name}}RepRequest implements {{entity_name}}RepPayload
{
    @IsString()
    name: string;

    @IsInt()
    type: number;

    constructor(request: express.Request)
    {
        this.name = request.body.name;
        this.type = request.body.type;
        // ... edit / implements
    }

    getName(): string
    {
        return this.name;
    }

    getType(): number
    {
        return this.type;
    }
}

export default {{entity_name}}RepRequest;
