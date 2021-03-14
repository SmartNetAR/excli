import {Schema} from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import {{entity_name}} from '../../../Domain/Entities/{{entity_name}}';

const {{entity_name}}Schema: any = new Schema({
    _id: {type: String, default: uuidv4},
    name: {type: String, required: true},
    type: {type: Number, required: true},
    // ... edit and implements
    tenant: {type: String, ref: "Tenant"},
}, {timestamps: true});

// {{entity_name}}Schema.index({name: 1, tenant: 1}, {unique: true}); // can delete me if not use

{{entity_name}}Schema.loadClass({{entity_name}});

export default {{entity_name}}Schema;
