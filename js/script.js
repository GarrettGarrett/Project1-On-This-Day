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
let dateToday = today.toLocaleDateString("en-US", options)
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); 
let apiDate = mm + '/' + dd



/*----- app's state (variables) -----*/




/*----- cached element references -----*/
let leftArrow = document.getElementById('left')
let rightArrow = document.getElementById("right");



/*----- event listeners -----*/
$(".todaysDate").html(dateToday)
leftArrow.addEventListener("click", shiftLeft);
rightArrow.addEventListener("click", shiftRight);



/*----- functions -----*/
function getApiData () {
        $.ajax(`https://history.muffinlabs.com/date/${apiDate}`)
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

                 
                // let wikiLink = apiInfo.data.Deaths[i].links[0].link
                // let tempIndex = wikiLink.indexOf("wiki/");
                // let wikiName = wikiLink.substr(tempIndex + 5);
                // deathImgNameList.push(wikiName)
                
                // // console.log(deathImgNameList) //returns the name needed for next api call to get image from Wikipedia.
              }
        
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


getApiData();




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




