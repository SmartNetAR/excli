'use strict'

import inquirer = require("inquirer")
import chalk from "chalk"
import BaseGenerator from "../../common/baseGenerator"
import copy = require('copy-template-dir')
import pluralize = require('pluralize')
import { string } from "@oclif/command/lib/flags"

const SOURCEEXPRESSBLOG = __dirname + "/crud-template"

module.exports = class ExpressBlogGenerator extends BaseGenerator{

    entity_name: string;

    constructor(entity: string)
    {
        super();
        this.entity_name = entity;
    }

    prompts() {
        this.log(`The following list of files will be created: 
${chalk.green(
        ['src',
           ' - /InterfaceAdapters/IDomain/I' + this.entity_name + 'Domain.ts',
           ' - /Domain/Entities/' + this.entity_name + '.ts',
           ' - etc...'
].join("\n")
)} 
Also the following routes will be availabe for you:
${chalk.green("- GET")} /${this.entity_name}/:id
${chalk.green("- GET")} /${this.entity_name}/
${chalk.green("- POST")} /${this.entity_name}/
${chalk.green("- PUT")} /${this.entity_name}/:id
${chalk.green("- DELETE")} /${this.entity_name}/:id

`)

    return inquirer.prompt([
            {
                type: "confirm",
                name: "continue",
                message: "Are you sure you wish to continue?",
                choices: "Y/n",
                default: "Y"
            },
            // {
            //     when: response => response.continue,
            //     type: "string",
            //     name: "appname",
            //     message: "What's the name of your entity?"
            // }
        ])
        .then( answer => answer) 
        .catch( err => false)
    }

    // cleanAppName(appname) {
    //     return appname.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
    // }

    printSuccessMessage(folderName) {
        this.log(chalk.green(`
== CONGRATS == 
Your crud is ready for you to start pumping code into it!

        `))
    }
        
    /*
    Create the destination folder using the application name given,
    and copy the blog files into it
    */
    copyFiles(appname: string) {
        // const folderName = this.cleanAppName(appname)
        const camelize = (str: string) => {
            return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
              if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
              return index === 0 ? match.toLowerCase() : match.toUpperCase();
            });
        }

        const pascalize = (str: string) => {
            return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
              if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
              return index === 0 ? match.toUpperCase() : match.toUpperCase();
            });
        }

        const camelToSnakeCase = (str: string) => (
            str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
        )

        const pascalToSnakeCase = (str: string) => (
            str.replace(/[A-Z]/g, (letter, index) => index > 0 ? `_${letter}` : letter)
        )

        const destDir = process.cwd();

        const entityCamelCase = camelize(this.entity_name);
        const EntityPascalCase = pascalize(this.entity_name);
        const ENTITY_UPPER_CASE = camelToSnakeCase(entityCamelCase).toUpperCase();
        const Entity_Pascal_Case = pascalToSnakeCase(EntityPascalCase);

        const templateVars = {
            entity_name: EntityPascalCase,
            entities_name: pluralize.plural(EntityPascalCase),
            entity_name_lc: entityCamelCase,
            entities_name_lc: pluralize.plural(entityCamelCase),
            entity_name_uc: ENTITY_UPPER_CASE,
            entities_name_uc: pluralize.plural(ENTITY_UPPER_CASE),
            entity_name_snakeCase: Entity_Pascal_Case 
        }

        copy(SOURCEEXPRESSBLOG, destDir, templateVars, (err, createdFiles: string[])=>{
            if (err) 
            {
                console.log(err);
                throw err;
            }
            // createdFiles.forEach( filePath => console.log(`Created ${filePath}`))
            console.log('done !')
        });
        this.printFilesToEdit(templateVars)
    }

    printFilesToEdit(templateVars: any) {

        const { entity_name, entities_name,
                entity_name_lc, entities_name_lc,
                entity_name_uc, entities_name_uc,
                entity_name_snakeCase
        } = templateVars;

        this.log(
`
${chalk.green( ['config/Permissions.ts'].join("\n") )}
${chalk.yellow([
` ... `,
`   // ${entities_name_uc}`,
`    static readonly ${entities_name_uc}_SAVE: string = '${entities_name_lc}Save';`,
`    static readonly ${entities_name_uc}_UPDATE: string = '${entities_name_lc}Update';`,
`    static readonly ${entities_name_uc}_SHOW: string = '${entities_name_lc}Show';`,
`    static readonly ${entities_name_uc}_LIST: string = '${entities_name_lc}List';`,
`    static readonly ${entities_name_uc}_DELETE: string = '${entities_name_lc}Delete';`,
` ...\n`,
` ...`,
"            `${Permissions."+entities_name_uc+"_SAVE}`,",
"            `${Permissions."+entities_name_uc+"_UPDATE}`,",
"            `${Permissions."+entities_name_uc+"_SHOW}`,",
"            `${Permissions."+entities_name_uc+"_LIST}`,",
"            `${Permissions."+entities_name_uc+"_DELETE}`,",
` ...\n`,
].join("\n"))}

${chalk.green( ['src/Infrastructure/Database/MongooseCreateConnection.ts'].join("\n") )}
${chalk.yellow([
` ... `,
`import I${entity_name}Document from '../../InterfaceAdapters/IEntities/Mongoose/I${entity_name}Document';`,
` ...\n`,
` ... `,
`import ${entity_name}Schema from '../Schema/Mongoose/${entity_name}';`,
` ...\n`,
` ... `,
`        connection.model<I${entity_name}Document>('${entity_name_snakeCase}', ${entity_name}Schema);`,
` ...\n`,
].join("\n"))}

${chalk.green( ['src/repositories.ts'].join("\n") )}
${chalk.yellow([
` ... `,
`    I${entity_name}Repository: 'I${entity_name}Repository',`,
` ...\n`,
].join("\n"))}

${chalk.green( ['src/inversify.config.ts'].join("\n") )}
${chalk.yellow([
` ... `,
`import I${entity_name}Repository from './InterfaceAdapters/IRepositories/I${entity_name}Repository';`,
` ...\n`,
` ... `,
`import ${entity_name}MongoRepository from './Infrastructure/Repositories/${entity_name}MongoRepository';`,
` ...\n`,
` ... `,
`    container.bind<I${entity_name}Repository>(REPOSITORIES.I${entity_name}Repository).to(${entity_name}MongoRepository);`,
` ...\n`,
].join("\n"))}

${chalk.green( ['src/Application/app.ts'].join("\n") )}
${chalk.yellow([
` ... `,
`import '../Presentation/Handlers/${entity_name}Handler';`,
` ...\n`,
].join("\n"))}

${chalk.green( ['src/config/Roles.ts Roles Permission'].join("\n") )}
${chalk.yellow([
` ... `,
`                Permissions.${entities_name_uc}_SAVE,`,
`                Permissions.${entities_name_uc}_UPDATE,`,
`                Permissions.${entities_name_uc}_SHOW,`,
`                Permissions.${entities_name_uc}_LIST,`,
`                Permissions.${entities_name_uc}_DELETE,`,
` ...\n`,
].join("\n"))}

`)}

    execute(answer) {
        if(!answer.continue){
            return this.log("OK then, see you later!")
        }

        this.copyFiles(answer.appname)
    }

    async run() {
        this.prompts() //ask the questions
            .then(this.execute.bind(this)) //execute the command
    }
}