class Epic {
    constructor(keys, values){ 
        if (keys && keys.length > 0){
            for(var i=0; i < keys.length; i++){
                this[keys[i]] = values[i];
            }
        }   
    };

    updateEpicData(data){ 
        for (var key in data) {
            if (data[key] != ''){
                //update up the Epic data with what the user
                this[key] = data[key];
            }
            //else keep with the default values
          }
    }
}; 

module.exports = {
    Epic
}    