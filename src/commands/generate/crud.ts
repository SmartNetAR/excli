'use strict'

import {Command, flags} from '@oclif/command'

class CrudCommand extends Command {

	async run() {

		const {flags} = this.parse(CrudCommand)

		const targetGeneration = flags.for.toLowerCase().trim();

		//error handling
		if(CrudCommand.flags.for.options.indexOf(targetGeneration) == -1)
		{
			return this.error (`Target not found '${targetGeneration}', please try one of the valid ones - ${CrudCommand.flags.for.options.join(",")} - `)
		}

        const CrudGenerators = await import(`../../generators/crud/${targetGeneration}`)

		let entity = flags.entity || null;
		let tenantEntity = flags.tenantEntity || null;
		let gen = null;
		if (entity)
		{
			gen = new CrudGenerators(entity);
		}
		if (tenantEntity)
		{
			gen = new CrudGenerators(tenantEntity);
		}

		gen.run();
	}
}

CrudCommand.flags = {
	for: flags.string({
		description: 'Target destination for the generator command',
		options: ['entity', 'tenant_entity'] //valid options
	}),
	entity: flags.string({
		description: "Name of entity",
		required: true
	})
}
export default CrudCommand