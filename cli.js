#!/usr/bin/env node
const { createNewEpic, getTimeLogged } = require('./lib'),
    {questionsEpic} = require('./lib/dialogue/constants/epicCreation'),
    {timeQuestions} = require('./lib/dialogue/constants/getTime'), 
    program = require('commander'),
    { prompt } = require('inquirer');

program
    .version('1.0.0')
    .description('Epic Creator');

// EPIC CREATER   
program
    .command('createEpic') // No need of specifying arguments here
    .alias('a')
    .description('Create an Epic by answering a few questions')
    .action(() => {
        prompt(questionsEpic).then(answers => {
            createNewEpic(answers);
        })
    });  
    
// TIME LOGGER    
program
    .command('getTime') // No need of specifying arguments here
    .alias('t')
    .description('Return time for a given User')
    .action(() => {
        prompt(timeQuestions).then(answers => {
            getTimeLogged(answers);
        })
    });      
 
program.parse(process.argv);