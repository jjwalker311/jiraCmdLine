const csvFilePath='./jira.csv'
const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
    console.log(JSON.stringify(jsonObj))
})
.on('done',(error)=>{
    console.log('end')
})