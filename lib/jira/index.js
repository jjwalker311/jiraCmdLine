const Jira = require('jira').JiraApi,
    apiFunctions = require('./apiCalls'),
    helper = require('./lib/helper'),
    {jiraConstants} = require('./constants'),

    jira = new Jira(...jiraConstants),
    
    /**
     * Creates epic and children within, based on Epic detemined by User entry
     * Creates parent epic, then recursively creates children based on TODO list
     * @param  {} epic
     */
    createEpic = (epic) => {

        apiFunctions.createEpic(jira, epic).then((res) => {
                //on successful epic creation
                console.log('Successfully created Epic: ' + res.key);

                //Create our list of TODO actions, i.e. Make RC1 / 2 plus test plan
                let todoBucket = helper.makeTodoBucket(epic);

                apiFunctions.recursiveChildCreation(jira, todoBucket, epic, res.key);
            }, 
            (err) => {
                //on error
                console.error('Something went wrong in creating Epic, please try again....' + JSON.stringify(err.errors));
            }
        );

    };

module.exports = {createEpic,  jira};
