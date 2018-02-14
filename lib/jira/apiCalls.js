
const {ticketTypeEnum, jiraProjectMapping} = require('./constants'),
    helper = require('./lib/helper'),
    Promise = require('promise'),


    // PRIVATE FUNCTIONS
    _getProjectDetail = (key, detail) => {
        return jiraProjectMapping.filter((project) => {return project.key === key})[0][detail];
    },

    // **************************************
    // PUBLIC FUNCTIONS

    /**
     * Function to make request to create a Story
     * @param  {} jira
     * @param  {} epic
     * @param  {} todoItem
     * @param  {} parentId
     * @return Promise
     */
    createStory = (jira, epic, todoItem, parentId) => {
        return helper.makeRequest(
            jira, 
            helper.createChildBody(
                epic, 
                _getProjectDetail(epic.jiraProject, 'id'), 
                _getProjectDetail(epic.jiraProject, 'affected'), 
                parentId, 
                todoItem,
                _getProjectDetail(epic.jiraProject, 'component')
            )
        );
    },

    /**
     * Function to make request to create an Epic
     * @param  {} jira
     * @param  {} epic
     * @return Promise
     */    
    createEpic = (jira, epic) => {
        return helper.makeRequest(
            jira, 
            helper.createEpicBody(
                epic, 
                _getProjectDetail(epic.jiraProject, 'id'),
                _getProjectDetail(epic.jiraProject, 'affected')
            )
        );
    }, 

    /**
     * Function to recursively create Children (stories for now)
     * Keeps firing until TODO list has been wiped
     * @param  {} jira
     * @param  {} todoList
     * @param  {} epic
     * @param  {} parentId
     * @return Promise
     */
    recursiveChildCreation = (jira, todoList, epic, parentId) => {

        return new Promise( (onSuccess, onFailure) => {

            createStory(jira, epic, todoList[0], parentId).then( (res) => {
                    //On successful Child creation
                    console.log('Successfully created: ' + todoList[0].type + " - " + res.key)

                    //removes our the child we just did
                    todoList.shift();

                    if (todoList.length > 0){
                        //we have more children to create, then re-iterate 
                        return recursiveChildCreation(jira, todoList, epic, parentId);
                    } else {
                        //End of the line, all stories created successfully
                        onSuccess();
                    }
                }, 
                (err) => {
                    //On error, bomb out
                    console.error('Failure to create Child ticket: ' + JSON.stringify(err.errors));

                    onFailure(err);
                }
            )
        });
    }


module.exports = { createStory, createEpic, recursiveChildCreation}