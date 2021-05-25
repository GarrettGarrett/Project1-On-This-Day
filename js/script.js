/*----- constants -----*/
let apiInfo;
let eventList = []
let deathsList = [] 
let birthsList = []
let listIndex = 0
var options = { year: 'numeric', month: 'long', day: 'numeric' };
let today  = new Date();
let dateToday = today.toLocaleDateString("en-US", options)
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); 
let apiDate = mm + '/' + dd



/*----- app's state (variables) -----*/




/*----- cached element references -----*/
let leftArrow = document.getElementById('left')
let rightArrow = document.getElementById("right");



/*----- event listeners -----*/
$( ".todaysDate" ).html(dateToday)
leftArrow.addEventListener("click", shiftLeft);
rightArrow.addEventListener("click", shiftRight);



/*----- functions -----*/
function getApiData () {
        $.ajax(`http://history.muffinlabs.com/date/${apiDate}`)
    .then(function(data) { 
        apiInfo = data;
        render();
        
        });
}


function render() {
        for (let i = 0; i < apiInfo.data.Events.length; i++) {
                eventList.push(apiInfo.data.Events[i].html)

                deathsList.push(apiInfo.data.Deaths[i].html)

                birthsList.push(apiInfo.data.Births[i].html)
              }
        
        $( ".events" ).html(eventList[listIndex]); 
        $( ".deaths" ).html(deathsList[listIndex]);   
        $( ".births" ).html(birthsList[listIndex]); 
               
}; 


function shiftRight () {
        if (listIndex === eventList.length) {
                return
        }
        listIndex ++
        $( ".events" ).html(eventList[listIndex]); 
        $( ".deaths" ).html(deathsList[listIndex]);   
        $( ".births" ).html(birthsList[listIndex])
        
}

function shiftLeft () {
        if (listIndex === 0) {
                return
        }
        listIndex --
        $( ".events" ).html(eventList[listIndex]); 
        $( ".deaths" ).html(deathsList[listIndex]);   
        $( ".births" ).html(birthsList[listIndex])
        
}




getApiData();




