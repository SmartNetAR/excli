import * as express from "express";
import {{entity_name}}UpdatePayload from "../../../../InterfaceAdapters/Payloads/{{entities_name}}/{{entity_name}}UpdatePayload";
import {IsInt, IsString} from "class-validator";
import IdRequest from "../Defaults/IdRequest";

class {{entity_name}}UpdateRequest extends IdRequest implements {{entity_name}}UpdatePayload
{
    @IsString()
    name: string;

    @IsInt()
    type: number;

    constructor(request: express.Request)
    {
        super(request);
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

export default {{entity_name}}UpdateRequest;
