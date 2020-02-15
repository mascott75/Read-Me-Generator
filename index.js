const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");

var userEmail;
var profileImg;

const writeFileAsync = util.promisify(fs.writeFile);


function getGitInfo() {
    return inquirer
        .prompt({
            type: "Input",
            message: "Enter your GitHub username:",
            name: "username"
        })
        .then(function({ username }) {
            const queryUrl = `https://api.github.com/users/${username}`;

            return axios.get(queryUrl).then(function(res) {
                userEmail = (res.data.email)
                profileImg = (res.data.avatar_url)
            })
        })
        .then(function promptUser() {
            const theinputs = inquirer.prompt([{
                type: "input",
                name: "title",
                message: "Input the name of the project."
            }, {
                type: "input",
                name: "description",
                message: "Give a brief description of the project."
            }, {
                type: "input",
                name: "toc",
                message: "Write a table of contents for the project."
            }, {
                type: "input",
                name: "instalation",
                message: "List the instalations needed for your project."
            }, {
                type: "input",
                name: "usage",
                message: "Tell the user what this project can be used for."
            }, {
                type: "input",
                name: "license",
                message: "Input the license."
            }, {
                type: "input",
                name: "contributing",
                message: "Now list the contributers to the project."
            }, {
                type: "input",
                name: "tests",
                message: "Write the tests used"
            }])
            return theinputs;
        })
}



function generateReadMe(answers) {
    return `Title: ${answers.title} \n \n
    Description: ${answers.description} \n \n
    Table of Contents: ${answers.toc} \n \n
    Instalations: ${answers.instalation} \n \n
    Usage: ${answers.usage} \n \n
    License: ${answers.license} \n \n
    Constributors: ${answers.contributing} \n \n
    Tests: ${answers.tests} \n \n \n
    ![profile-pic](${profileImg}) \n
    Email: ${userEmail}`
}

async function init() {
    console.log("hi")
    try {
        const answers = await getGitInfo();

        const text = generateReadMe(answers);

        await writeFileAsync("READMETest.md", text);

        console.log("Successfully wrote to README.md");
    } catch (err) {
        console.log(err);
    }
}
init();