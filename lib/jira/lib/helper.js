const Promise = require('promise'),


// PRIVATE FUNCTIONS

/**
 * Checking whether we have a dev mode argument or not
 */
_isSandBox = ()=>{
    //TODO do this better
    return process.argv.slice(2).indexOf("play") !== -1;
}

/**
 * Determines whether a User input is "Truethy" or not
 */
_isTruthy = (statement) =>{
    return (!!statement && (statement.toUpperCase() === "T" || statement.toUpperCase()=== "TRUE" || statement.toUpperCase() === "Y" || statement.toUpperCase()=== "YES"));
},

/**
 * Returns a float value
 */
_makeFloat = (value) => {
    return parseFloat(value, 10);
},

/**
 * Function to create bespoke values for all types of Story
 * Uses a Switch statement to determine what to display
 * @param  {} epic
 * @param  {} todoItem
 */
_formatStoryValues = (epic, todoItem)=> {

    switch(todoItem.type) { 
        case 'BUILD_RC1': { 
            return {
                title : "BUILD - v" + epic.version + "-RC1",
                description : "BUILD - v" + epic.version + "-RC1",
                successCriteria : "RC1 Build completed, reviewed and release email sent to relevant parties.",
                estimate : _makeFloat(2)
            }

           break; 
        } 
        case 'TEST_RC1': { 
            return {
                title : "TEST - v" + epic.version + "-RC1",
                description : "TEST - v" + epic.version + "-RC1",
                successCriteria : "RC1 Testing Plan completed to agreed level of coverage. Release either Passed or Rejected by QA.",
                estimate : _makeFloat(epic.defaultRc1)
            }
           break; 
        } 
        case 'BUILD_RC2': { 
            return {
                title : "BUILD - v" + epic.version + "-RC2",
                description : "BUILD - v" + epic.version + "-RC2",
                successCriteria : "RC2 Build completed, reviewed and release email sent to relevant parties.",
                estimate : _makeFloat(2)
            }
           break; 
        } 
        case 'TEST_RC2': { 
            return {
                title : "TEST - v" + epic.version + "-RC2",
                description : "TEST - v" + epic.version + "-RC2",
                successCriteria : "RC2 Testing Plan completed to agreed level of coverage. Release either Passed or Rejected by QA.",
                estimate : _makeFloat(epic.defaultRc2)
            }
           break; 
         } 
        case 'TEST_PLAN': { 
            return {
                title : "TEST_CREATE - v" + epic.version + " - Creation of Test Plan",
                description : "TEST_CREATE - v" + epic.version + " - Creation of Test Plan",
                successCriteria : "Test plan completed and reviewed by QA. Document circulated to relevant stakeholders.",
                estimate : _makeFloat(2)
            }
           break; 
        } 
        case 'TEST_SCENARIO': { 
            return {
                title : "TEST_CREATE - v" + epic.version + " - Creation of Test Scenarios",
                description : "TEST_CREATE - v" + epic.version + " - Creation of Test Scenarios",
                successCriteria : "Test Scenarios completed and reviewed by QA. Document circulated to relevant stakeholders.",
                estimate : _makeFloat(24)
            }
            break; 
         } 
         case 'BUILD_UAT': { 
            return {
                title : "BUILD - v" + epic.version + " - to UAT",
                description : "BUILD - v" + epic.version + " - to UAT",
                successCriteria : "UAT Build completed, reviewed and release email sent to relevant parties.",
                estimate : _makeFloat(2)
            }
            break; 
         } 
        default: { 
           //Should never hit 
            return {}
        } 
    }    
},

//***************************************************
// PUBLIC FUNCTIONS

/**
 * Function to Interface with the RESTful API
 * @param  {} jira
 * @param  {} body
 * @return Promise
 */
makeRequest = (jira, body) => {
    const options = {
        rejectUnauthorized: jira.strictSSL,
        uri: jira.makeUri('/issue'),
        method: 'POST',
        followAllRedirects: true,
        json: true,
        body: body
    };

    return new Promise( (onSuccess, onFailure) => {

        if (_isSandBox()){
            //SandBox mode, just return true
            return onSuccess({});
        } else {
            //NOT SandBox mode, make API calls
            jira.doRequest(options, function(error, response, body) {
                    if (error) {
                        onFailure(error);
                        return;
                    }

                    if (response.statusCode === 400) {
                        onFailure(body);
                        return;
                    }

                    if ((response.statusCode !== 200) && (response.statusCode !== 201)) {
                        onFailure(response.statusCode + ': Unable to connect to JIRA during search.');
                        return;
                    }

                    onSuccess(body);
            })
        }
    })
},

/**
 * Function to create a TODO list for all children for a given epic
 * @param  {} epic
 */
makeTodoBucket = (epic)=> {
    //Bucket actions to complete for this epic
    let todoBucket = [];

    for (let i=0; i < epic.numberOfRc; i++){
        //Adding an RC to the TODO list
        todoBucket.push({
            type: 'TEST_RC' + (i+1)
        })

        todoBucket.push({
            type: 'BUILD_RC' + (i+1)
        })
    }

    if (_isTruthy(epic.testCreateStory)){
        todoBucket.push({
            type: 'TEST_PLAN'
        })
    }

    if (_isTruthy(epic.testScenarioStory)){
        todoBucket.push({
            type: 'TEST_SCENARIO'
        })
    }

    if (_isTruthy(epic.uatBuild)){
        todoBucket.push({
            type: 'BUILD_UAT'
        })
    }

    return todoBucket;
},


/**
 * Function to formuate body of Epic to retun into the REST API
 * @param  {} epic
 * @param  {} projectId
 * @param  {} affectedProjectId
 */
createEpicBody  = (epic, projectId, affectedProjectId) => {
    const formattedTitle = "RELEASE v" + epic.version + " - " +  epic.epicTitle;
    return {"fields" : {
                "issuetype": {
                "id": "34"
            },
            "project": {
                "id": projectId
            },
            "labels": ['TSS_TIME_POINTS', 'TSS_BACKLOG'],   
            "description": formattedTitle,
            "summary": formattedTitle,
            "customfield_10701" : formattedTitle,
            "customfield_10170" : "All child stories completed, release built, reviewed and deployed to appropriate environment.",
            "customfield_10272" : [{"id" : affectedProjectId }]
        }
    }
},

/**
 * Function to formuate body of Story to retun into the REST API
 * @param  {} epic
 * @param  {} projectId
 * @param  {} affectedProjectId
 * @param  {} parentId
 * @param  {} todoItem
 */
createChildBody = (epic, projectId, affectedProjectId, parentId, todoItem, component) => {

    let storyValues = _formatStoryValues(epic, todoItem);

    return {        
        "fields": {
          "issuetype": {
            "id": "33"
          },
          "customfield_10272": [
            {
              "id": affectedProjectId
            }
          ],
          "project": {
            "id": projectId
          },
          "customfield_10700": parentId,
          "labels": [
            "TSS_BACKLOG",
            "TSS_TIME_POINTS"
          ],          
          "components": [
            {
              "id":  component
            }
          ],
          "customfield_10170": storyValues.successCriteria,
          "description": storyValues.description, 
          "summary": storyValues.title,
          "timetracking": {            
            "originalEstimate": storyValues.estimate + 'h',     
            "remainingEstimate": storyValues.estimate + 'h'         
          },
          "customfield_10203" : storyValues.estimate  
        }
      }    
};

module.exports = {createEpicBody, makeRequest, makeTodoBucket, createChildBody}
