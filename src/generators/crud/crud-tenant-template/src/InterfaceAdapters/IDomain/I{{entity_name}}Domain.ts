import ITenantDomain from "./ITenantDomain";

interface I{{entity_name}}Domain
{
    name: string;
    type: number;
    // ... edit me
    tenant: ITenantDomain;
    createdAt: Date;
    updatedAt: Date;

    getId(): string;
}

export default I{{entity_name}}Domain;
