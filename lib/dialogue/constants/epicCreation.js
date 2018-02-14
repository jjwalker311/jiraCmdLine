
const  defaultEpicValues = [ 2, 12, 6, false, false],
       {jiraProjectMapping} = require('../../jira/constants'),
       defaultEpicKeys = ['numberOfRc', 'defaultRc1','defaultRc2', 'testCreateStory', 'testScenarioStory'],
       
       /**
        * Function to check a given key against our known Project list
        */
       _checkThatProjectNameExists = (name) => {
            return jiraProjectMapping.filter((project) => {return project.key === name}).length > 0;
       },


    /**
     * Array of questions around epic creation
     */
       questionsEpic= [
            {
                'type' : 'input',
                'name' : 'jiraProject',
                'message' : 'Please enter your Project Name (e.g. AFM/BFM/WLL)',
                'validate' : (submission) => {
                    if (!submission || submission.length === 0){
                        return 'This is mandatory, enter something....'
                    } else if (!_checkThatProjectNameExists(submission)){
                        return "Don't recognise this Project Name, please enter in the format 'AFM'/'WLL'"
                    } else {
                        return true
                    }
                }
            },
            {
                'type' : 'input',
                'name' : 'epicTitle',
                'message' : 'Please enter the name of your epic (Will be part of title)',
                'validate' : (submission) => {
                    if (submission && submission.length > 5){
                        return true
                    } else {
                        return 'Please enter a sensible Epic title'
                    }
                }
            },
            {
                'type' : 'input',
                'name' : 'version',
                'message' : 'Please enter version number (e.g. 1.0.0)',
                'validate' : (submission) => {
                    if (submission && submission.length >= 5){
                        return true
                    } else {
                        return 'Please enter a valid Version number (X.Y.Z)'
                    }
                }
            },
            {
                'type' : 'input',
                'name' : 'numberOfRc',
                'message' : 'Please enter number of RCs (default 2)',
                'validate' : (submission) => {
                    if (NaN !== parseInt(submission, 10)){
                        return true                    
                    } else {
                        return "Please enter an integer value"
                    }
                }    
            },
            {
                'type' : 'input',
                'name' : 'defaultRc1',
                'message' : 'Please enter duration of RC1 (default 12)',
                'validate' : (submission) => {
                    if (NaN !== parseInt(submission, 10)){
                        return true                    
                    } else {
                        return "Please enter an integer value"
                    }
                }    
            },
            {
                'type' : 'input',
                'name' : 'defaultRc2',
                'message' : 'Please enter duration of RC2 (default 6)',
                'validate' : (submission) => {
                    if (NaN !== parseInt(submission, 10)){
                        return true                    
                    } else {
                        return "Please enter an integer value"
                    }
                }    
            },
            {
                'type' : 'input',
                'name' : 'testCreateStory',
                'message' : 'Do you want a "TEST_CREATE" story for Test Plan? (default false)'
            },
            {
                'type' : 'input',
                'name' : 'testScenarioStory',
                'message' : 'Do you want a "TEST_CREATE" story for Scenario Creation? (default false)'
            },
            {
                'type' : 'input',
                'name' : 'uatBuild',
                'message' : 'Do you want a "BUILD UAT" story? (default false)'
            }


       ];


module.exports = {
    defaultEpicValues, defaultEpicKeys, questionsEpic
};