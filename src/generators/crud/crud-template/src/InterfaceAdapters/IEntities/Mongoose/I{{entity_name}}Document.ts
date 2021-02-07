import {Document} from "mongoose";
import I{{entity_name}}Domain from "../../IDomain/I{{entity_name}}Domain";

interface I{{entity_name}}Document extends Document, I{{entity_name}}Domain {}

export default I{{entity_name}}Document;
