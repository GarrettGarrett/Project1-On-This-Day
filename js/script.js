/*----- constants -----*/
let apiInfo;
let imgData;
let eventList = []
let deathsList = [] 
let birthsList = []
let imgList = []
let deathImgNameList = []
let deathsImgList = []
let listIndex = 0
var options = { year: 'numeric', month: 'long', day: 'numeric' };
let today  = new Date();
let currentYear = new Date().getFullYear()
let dateToday = today.toLocaleDateString("en-US", options)
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); 
let apiDate = mm + '/' + dd
let currentlyVeiwingDateAbbrev;
let currentlyVeiwingDate = today;
let currentlyVeiwingDateAPIVersion;
let siteCategory = "History"
// let siteCategory = "GA"
let topicList = []
let taskList = []



/*----- app's state (variables) -----*/




/*----- cached element references -----*/
let leftArrow = document.getElementById('left')
let rightArrow = document.getElementById("right");
let dateLeftArrow = document.getElementById('dateLeft')
let dateRightArrow = document.getElementById('dateRight')
let eventCard = document.getElementById('eventsCard')
let deathsCard = document.getElementById('deathsCard')
let birthsCard = document.getElementById('birthsCard')




/*----- event listeners -----*/
$(".todaysDate").html(dateToday)
leftArrow.addEventListener("click", shiftLeft);
rightArrow.addEventListener("click", shiftRight);
dateLeftArrow.addEventListener("click", prevDay);
dateRightArrow.addEventListener("click", nextDay);








/*----- functionns -----*/
function getApiData (param) {
        if (siteCategory === "History") {
                $( "#dateLeft" ).removeClass("btn-danger") // change arrows to red
                $( "#dateLeft" ).addClass("btn-light")
                $( "#dateRight" ).removeClass("btn-danger") 
                $( "#dateRight" ).addClass("btn-light")



                eventsCard.style.visibility = "visible"
                birthsCard.style.visibility = "visible"
                deathsCard.style.visibility = "visible"
                rightArrow.style.visibility = "visible"

                $.ajax(`https://history.muffinlabs.com/date/${param}`)
                .then(function(data) { 
                    apiInfo = data;
                    render();
                    
                    });
        } else if (siteCategory === "GA") {
                leftArrow.style.visibility = "hidden" //hide nav arrows
                rightArrow.style.visibility = "hidden"

                eventsCard.style.visibility = "hidden"
                birthsCard.style.visibility = "hidden"
                deathsCard.style.visibility = "hidden"

                
                $( "#dateLeft" ).removeClass("btn-light") // change arrows to red
                $( "#dateLeft" ).addClass("btn-danger")
                $( "#dateRight" ).removeClass("btn-light") // change arrows to red
                $( "#dateRight" ).addClass("btn-danger")
                

                $( ".eventsTitle" ).html(""); // clear 
                $( ".events" ).html("");  // clear 

                $( ".deathsTitle" ).html(""); // clear 
                $( ".deaths" ).html("");   // clear 

                $( ".birthsTitle" ).html(""); // clear 
                $( ".births" ).html("");// clear 

                
                topicList.length = 0 
                taskList.length = 0


                $.getJSON("ga.json", function(json) {
                        if (param in json) { //avoid errors when no json data for given date
                                topicList.push(json[param][0].topic); 
                                taskList.push(json[param][0].tasks);
                            } else {
                                return
                            }

                        
                        
                        let tasksStr = json[param][0].tasks; //string of tasks from JSON

                        let taskListSeperated = tasksStr.split(', '); //convert str comma seperated into an array
                        
                        
                        eventsCard.style.visibility = "visible"
                        $( ".eventsTitle" ).html(topicList); // update topic

                        if ((taskListSeperated.length) > 1) { //only place bullet points when theres information to display
                                taskListSeperated.forEach(task => $( ".events" ).append("<br>• " + task + "</br>")) //append each task   
                        } else {
                                return
                        }
                        


                // $( ".eventsTitle" ).html(""); // clear 
                // $( ".events" ).html("");  // clear 

                // $( ".deathsTitle" ).html(""); // clear 
                // $( ".deaths" ).html("");   // clear 

                // $( ".birthsTitle" ).html(""); // clear 
                // $( ".births" ).html("");// clear 

                }); 
        }

}

$("#toggle").click(function(){  // clicking "History"
        
        if (siteCategory === "History")  { // if before clicking, it displays History...
                $(".toggle").html('<img id="theImg" src="https://seir-everest.netlify.app/static/ga-logo-f6360a973f47b2a95db240ab4798c234.svg" width="70" height="70" />'); 
                siteCategory = "GA"
                getApiData(apiDate);
                
        } else { // if before clicking, it displays GA....
                $(".todaysDate").html(dateToday)
                $(".toggle").html("History"); 
                siteCategory = "History"
                getApiData(apiDate);
        }    
});


$("#dateToggle").click(function(){  
        $(".todaysDate").html(dateToday)
        currentlyVeiwingDate = new Date();
        getApiData(apiDate);
        

});


 

function render() {
        listIndex = 0
        eventList.length = 0
        deathsList.length = 0
        birthsList.length = 0
        for (let i = 0; i < apiInfo.data.Events.length; i++) {

                
                
                eventList.push(apiInfo.data.Events[i].html)

                deathsList.push(apiInfo.data.Deaths[i].html)

                birthsList.push(apiInfo.data.Births[i].html)

                 
                // let wikiLink = apiInfo.data.Deaths[i].links[0].link
                // let tempIndex = wikiLink.indexOf("wiki/");
                // let wikiName = wikiLink.substr(tempIndex + 5);
                // deathImgNameList.push(wikiName)
                
                // // console.log(deathImgNameList) //returns the name needed for next api call to get image from Wikipedia.
              }
        
        $( ".eventsTitle" ).html("Events: ");
        $( ".deathsTitle" ).html("Deaths: "); 
        $( ".birthsTitle" ).html("Births: "); 

        $( ".events" ).html(eventList[listIndex]); 
        $( ".deaths" ).html(deathsList[listIndex]);   
        $( ".births" ).html(birthsList[listIndex]);
        hideShowArrow();

        
        
        // deathImgNameList.forEach(name => getImg(name));
        
        
        
               
}; 


function shiftRight () {
        if (listIndex === eventList.length) {
                return
        }
        listIndex ++
        $( ".events" ).html(eventList[listIndex]); 
        $( ".deaths" ).html(deathsList[listIndex]);   
        $( ".births" ).html(birthsList[listIndex])
        hideShowArrow();
        
}

function shiftLeft () {
        if (listIndex === 0) {
                return
        }
        listIndex --
        $( ".events" ).html(eventList[listIndex]); 
        $( ".deaths" ).html(deathsList[listIndex]);   
        $( ".births" ).html(birthsList[listIndex])
        hideShowArrow();
        
}

function hideShowArrow () {
        if (listIndex === 0) {
        leftArrow.style.visibility = "hidden"
        } else if (listIndex === eventList.length) {
                rightArrow.style.visibility = "hidden"
        } else {
                leftArrow.style.visibility = "visible"
                rightArrow.style.visibility = "visible"
        }
        
};


function nextDay () {
        console.log(currentlyVeiwingDate)
        currentlyVeiwingDate.setDate(currentlyVeiwingDate.getDate() + 1); // add 1 day
        
        let dateToday = currentlyVeiwingDate.toLocaleDateString("en-US", options) // format to mm/dd
        let dd = String(currentlyVeiwingDate.getDate()).padStart(2, '0');
        let mm = String(currentlyVeiwingDate.getMonth() + 1).padStart(2, '0'); 
        let currentlyVeiwingDateAPIVersion = mm + '/' + dd // mm/dd
        let currentlyVeiwingDateHTMLVersion = currentlyVeiwingDate.toLocaleDateString("en-US", options) // Month, Day, Year
        $(".todaysDate").html(currentlyVeiwingDateHTMLVersion)

        getApiData(currentlyVeiwingDateAPIVersion);
        

         
}


function prevDay () {
        currentlyVeiwingDate.setDate(currentlyVeiwingDate.getDate() - 1); // add 1 day
        
        let dateToday = currentlyVeiwingDate.toLocaleDateString("en-US", options) // format to mm/dd
        let dd = String(currentlyVeiwingDate.getDate()).padStart(2, '0');
        let mm = String(currentlyVeiwingDate.getMonth() + 1).padStart(2, '0'); 
        let currentlyVeiwingDateAPIVersion = mm + '/' + dd
        let currentlyVeiwingDateHTMLVersion = currentlyVeiwingDate.toLocaleDateString("en-US", options) // Format: Month, Day, Year
        $(".todaysDate").html(currentlyVeiwingDateHTMLVersion)

        getApiData(currentlyVeiwingDateAPIVersion);
        
         
}



getApiData(apiDate);
$("#copyright").html(`Copyright &copy; All Rights Reserved ${currentYear} Project#1`)






// function getImg (name) {
//         $.ajax(`https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=pageimages&format=json&pithumbsize=500`)
//         .then(function(data) { 
//              imgData = data;
//             renderImg();
            
//             });
//     }


// function renderImg() {
//         console.log(imgData)
// }




