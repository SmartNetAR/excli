import TenantPayload from "../Defaults/TenantPayload";

interface {{entity_name}}RepPayload extends TenantPayload
{
    getName(): string;
    getType(): number;
}

export default {{entity_name}}RepPayload;
