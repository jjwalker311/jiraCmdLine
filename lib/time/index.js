const  Promise = require('promise'),
    constants = require('./lib/constants'),
    timeHelper = require('./lib/helper'),
    { jira } = require('../jira'),

/**
 * API call to return sprint data
 * @param  {} data
 */
getSprintData = (data)=> {
    return new Promise( (onSuccess, onFailure) => {
        /**
         * Calls the JiraAPI "searching" functionality
         */
        jira.searchJira(
            timeHelper.makeJQL(data), 
            timeHelper.makeAdditionalData(), 
            (err, res) => {
               if (!!err){
                   //something has gone wrong
                   onFailure(err);
               } else {
                    //We have a successful 200 response, parse the data   
                    onSuccess(res);
               }
            }
        )
    });    
}, 

/**
 * Function to parse data and display to the user
 * @param  {} results
 * @param  {} rawData
 */
parseSprintData = (results, rawData)=> {
    //Array used to hold all work logged for a given user
    let workLogged = [];

    if (!!results.issues && results.issues.length > 0){
        //Itterate around all issues from results
        for (let i=0; i < results.issues.length; i++){
            let ticketData = results.issues[i].fields;
            if (!!ticketData.worklog && !!ticketData.worklog.total > 0){
                //we have worklogs for this ticket, add to the list

                workLogged = timeHelper.pushTimeLogged(
                    ticketData.worklog.worklogs,
                    rawData.user,
                    workLogged,
                    ticketData.project
                );

            }
            //else, nothing worked here, move on
        }
    }

    if (workLogged.length > 0){
        //We now have an array of all work logged for our user, now parse them and display results to user 
        timeHelper.parseWorklogs(workLogged);
    }

};


module.exports = {
    getSprintData, parseSprintData
}