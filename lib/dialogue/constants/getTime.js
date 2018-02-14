const timeQuestions = [
    {
        'type' : 'input',
        'name' : 'user',
        'message' : 'Which user do you wish to get time logging for? (E.g. "tim.payton")',
        'validate' : (submission) => {
            if (submission && submission.length > 0){
                return true
            } else {
                return 'Please enter a valid user name'
            }
        }
    },
    {
        'type' : 'input',
        'name' : 'sprintId',
        'message' : 'For which sprint Id do you want to view time logging for? (E.g. "1183")',
        'validate' : (submission) => {
            if (submission && (submission.length > 0) && (submission.length < 5)){
                return true
            } else {
                return 'Please enter a valid spring Id'
            }
        }
    },
];

module.exports = {
    timeQuestions
}