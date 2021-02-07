import IdPayload from "../Defaults/IdPayload";
import {{entity_name}}RepPayload from "./{{entity_name}}RepPayload";

interface {{entity_name}}UpdatePayload extends IdPayload, {{entity_name}}RepPayload {}

export default {{entity_name}}UpdatePayload;