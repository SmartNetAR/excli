import {Schema} from "mongoose";
import {{entity_name}} from "../../../Domain/Entities/{{entity_name}}";
import { v4 as uuidv4 } from 'uuid';

const {{entity_name}}Schema: any = new Schema({
    _id: {type: String, default: uuidv4},
    name: {type: String, required: true},
    type: {type: Number, required: true},
    // ... edit and implements
}, {timestamps: true});

{{entity_name}}Schema.loadClass({{entity_name}});

export default {{entity_name}}Schema;
