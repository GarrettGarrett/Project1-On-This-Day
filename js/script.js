/*----- constants -----*/
let date = "5/21"
let eventList = []
let deathsList = [] 
let birthsList = []
let slider = document.querySelector(".slider");
let leftArrow = document.querySelector(".left");
let rightArrow = document.querySelector(".right");
let sectionIndex = 0;

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


function moveLeftListener(leftArrow) {
        leftArrow.addEventListener('click', function () {
                if (sectionIndex <= 0) {
                sectionIndex === 0
                return
                } else {
                sectionIndex--
                slider.style.transform = 'translate(' + (sectionIndex) * -25 +'%)';
                }                     
        });
}

function moveRightListener(rightArrow) {
        rightArrow.addEventListener('click', function () {
                if (sectionIndex >= (slider.childElementCount - 1)) {
                  sectionIndex === slider.childElementCount
                  return
                } else {
                  sectionIndex++
                  slider.style.transform = 'translate(' + (sectionIndex) * -25 +'%)';
                }                     
            });
}




getApiData();
moveLeftListener(leftArrow)
moveRightListener(rightArrow)


