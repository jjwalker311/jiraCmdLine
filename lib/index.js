const { defaultEpicValues, defaultEpicKeys } = require('./dialogue/constants/epicCreation'),
      { Epic } = require('./epic'),
      { getSprintData, parseSprintData } = require('./time')
      jira = require('./jira'),

    //Creating instance of Epic
    newEpic = new Epic(defaultEpicKeys, defaultEpicValues),

    /**
     * Simple function to update key/value on our Epic we have created
     * @param  {} data
     */
    createNewEpic = (data) => {
        //Update data in our Epic
        newEpic.updateEpicData(data);

        //Calls Jira API to create new Epic and children within 
        jira.createEpic(newEpic);
    },

    /**
     * Function to call the JIRA API and parse the results to the command line
     * @param  {} data
     */
    getTimeLogged = (rawData)=> {
        getSprintData(rawData).then(
            (res) => {
                console.log("Successfully obtained Sprint Data, now parsing...");

                //We have good sprint data, start parsing
                parseSprintData(res, rawData);
            },
            (err) => {
                //Something went wrong, show error
                console.error('Failure to Get Sprint Data: ' + JSON.stringify(err));                
            }
        )
    }

module.exports = {
    createNewEpic, getTimeLogged
}