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
           ' - etx...'
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

Now you can:
1- edit your files ./${folderName}
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

        const destDir = process.cwd();

        const entityCamelCase = camelize(this.entity_name);
        const EntityPascalCase = pascalize(this.entity_name);
        const ENTITYUPPERCASE = camelToSnakeCase(entityCamelCase).toUpperCase();

        const templateVars = {
            entity_name: EntityPascalCase,
            entities_name: pluralize.plural(EntityPascalCase),
            entity_name_lc: entityCamelCase,
            entities_name_lc: pluralize.plural(entityCamelCase),
            entity_name_uc: ENTITYUPPERCASE,
            entities_name_uc: pluralize.plural(ENTITYUPPERCASE)
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
    }

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