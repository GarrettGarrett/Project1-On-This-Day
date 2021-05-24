/*----- constants -----*/
let date = "5/21"
let eventList = []
let deathsList = [] 
let birthsList = []

/*----- app's state (variables) -----*/
let apiInfo;

/*----- cached element references -----*/

/*----- event listeners -----*/

/*----- functions -----*/
function getApiData () {
        $.ajax(`http://history.muffinlabs.com/date/${date}`)
    .then(function(data) { 
        apiInfo = data;
        render();
        });
}


function render() {
        eventList.length = 0 //clear the evenList
        deathsList.length = 0 //clear the deathsList
        birthsList.length = 0 //clear the birthsList
        for (let i = 0; i < apiInfo.data.Events.length; i++) {
                eventList.push(apiInfo.data.Events[i].html)

                deathsList.push(apiInfo.data.Deaths[i].html)

                birthsList.push(apiInfo.data.Births[i].html)
              }
}; 


getApiData();
console.log('events', eventList)
console.log('births', birthsList)
console.log('deaths', deathsList)


