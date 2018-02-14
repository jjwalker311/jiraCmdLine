/**
 * Creates a JQL statement
 * We want to obtain data for the sprint in question, plus/minus one sprint
 * @param  {} data
 */
const makeJQL = (data) => {

    //Integer value of sprint
    const sprintId = parseInt(data.sprintId, 10);

    return "Sprint=" + sprintId + " or Sprint=" + (sprintId+1) + " or Sprint=" + (sprintId-1);
},

makeAdditionalData  = () => {
    return {
        maxResults : 300,
        fields : ['worklog','project']
    }
},

pushTimeLogged = (worklogs, userName, timeLoggedForUser, project) => {
    //filters Worklogs to return only logs related to our user
    const workLoggedForUser = worklogs.filter(function(wl){return wl.author.key === userName;});

    for(let i=0; i < workLoggedForUser.length; i++){
        //itterate around and push if we have time logged for a given user
        timeLoggedForUser.push(
            {
                jira : {
                    id : workLoggedForUser[i].issueId,
                    project : project.key,
                    summary : project.name
                },
                logged : {
                    id : workLoggedForUser[i].id,
                    date : workLoggedForUser[i].started,
                    duration :workLoggedForUser[i].timeSpentSeconds
                }
            }
        );
    }

    return timeLoggedForUser;
},

/**
 * Function to:
 * Group WorkLogged - Per Day, Per Project, Per Developer
 */
parseWorklogs = function(workLogged){
    const oldestToNewest = workLogged.sort(function(a,b){
        return new Date(b.logged.date) - new Date(a.logged.date);
    }),

     /**
      * Determines if we are on the same day
      * @param date1
      * @param date2
      * @returns {boolean}
      */
    isDateOnSameDay = function(dateToCheck){
        return new Date(dateToCheck).toDateString() === dayByDayBreakdown[dayByDayBreakdown.length-1].date;
    },

    addRecordForDayToBreakdown = function(newDate){
        //adding day with logged time
        dayByDayBreakdown.push({
            date : new Date(newDate.logged.date).toDateString(),
            projects: []
        });
    },

    addTimeLoggedForMostRecentRecord = function(data){
        if (!!data){
            //dayByDayBreakdown[dayByDayBreakdown.length-1].timeLogged.push(data);

            if (!!dayByDayBreakdown[dayByDayBreakdown.length-1].projects && dayByDayBreakdown[dayByDayBreakdown.length-1].projects[data.jira.project]){
                //we already have a record for this project, just push to it
                dayByDayBreakdown[dayByDayBreakdown.length-1].projects[data.jira.project].push(data);
            } else {
                //this is the first record we have for today, create a new record and push
                dayByDayBreakdown[dayByDayBreakdown.length-1].projects[data.jira.project] = [data];
            }
        }
    };
    
    //Setting up our variables
    let messageToDisplay, projectData, totalHours, dayByDayBreakdown = [];

    if (!!oldestToNewest && oldestToNewest.length > 0){
        //Added record for first day
        addRecordForDayToBreakdown(oldestToNewest[0]);

        //we have some time logged in the sprint, iterate around it
        for(var i=0; i < oldestToNewest.length; i++){
            //do we have a record for this day yet?
            if (isDateOnSameDay(oldestToNewest[i].logged.date)){
                //yes it is, simply add to the array
                addTimeLoggedForMostRecentRecord(oldestToNewest[i]);
            } else {
                //no it's not, need to add new day record and then add to array
                addRecordForDayToBreakdown(oldestToNewest[i]);
                addTimeLoggedForMostRecentRecord(oldestToNewest[i]);
            }
        }
    }


    if (!!dayByDayBreakdown && dayByDayBreakdown.length > 0){
        //Itterate around days
        for(let j=0; j < dayByDayBreakdown.length; j++){
            messageToDisplay = 'On ' + dayByDayBreakdown[j].date + ' -> ';

            //Itterate around project for a given day
            for (let projectName in dayByDayBreakdown[j].projects) {
                if (dayByDayBreakdown[j].projects.hasOwnProperty(projectName)) {
                    projectData = dayByDayBreakdown[j].projects[projectName];
                    totalHours = 0;

                    //Itterate around time logs for a given project on a given day
                    for(let k=0; k < projectData.length; k++){
                        totalHours += projectData[k].logged.duration/3600;
                    }

                    messageToDisplay += ' ' + projectName + ': ' + (totalHours || 0).toFixed(1) +  ' hours  ';
                }
            }

            console.log(messageToDisplay);
        }
    }
};


module.exports = {makeJQL, makeAdditionalData, pushTimeLogged, parseWorklogs};