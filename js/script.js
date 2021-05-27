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
var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
};
let today = new Date();
let currentYear = new Date().getFullYear()
let dateToday = today.toLocaleDateString("en-US", options)
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let apiDate = mm + '/' + dd
let currentlyVeiwingDateAbbrev;
let currentlyVeiwingDate = today;
let currentlyVeiwingDateAPIVersion;
let siteCategory = "History"
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
leftArrow.addEventListener("click", shiftLeft);
rightArrow.addEventListener("click", shiftRight);
dateLeftArrow.addEventListener("click", prevDay);
dateRightArrow.addEventListener("click", nextDay);

$("#toggle").click(function () { // When 'History' is clicked, switch categories to 'GA' and vice versa.
        if (siteCategory === "History") { // if before clicking, current view is History ...
                $(".toggle").html('<img id="theImg" src="https://seir-everest.netlify.app/static/ga-logo-f6360a973f47b2a95db240ab4798c234.svg" width="70" height="70" />');
                siteCategory = "GA"
                getApiData(apiDate);

        } else { // if before clicking, current view is GA ....
                $(".todaysDate").html(dateToday)
                $(".toggle").html("History");
                siteCategory = "History"
                getApiData(apiDate);
        }
});

$("#dateToggle").click(function () { // When the date is clicked, revert back to today's date.
        $(".todaysDate").html(dateToday)
        currentlyVeiwingDate = new Date();
        getApiData(apiDate);
});

/*----- functionns -----*/
function onPageLoad() { // When the page first loads, display historical information for today & set the footer.
        $(".todaysDate").html(dateToday) // Default to today's date.
        getApiData(apiDate);
        $("#copyright").html(`Copyright &copy; All Rights Reserved ${currentYear} Project#1`)
}

function getApiData(param) { // API call.  Param = date in mm/dd format. 
        if (siteCategory === "History") { // make API call if viewing history category
                updateHistory(param);

        } else if (siteCategory === "GA") { // reference ga.json file if viewing GA category
                updateGA(param);
        }
}

function render() {
        listIndex = 0 // Reset the index 
        clearHistoryLists(); // Empty previous information
        for (let i = 0; i < apiInfo.data.Events.length; i++) { // Store each event, death, and birth in an array.
                pushApiDataToLists(i);
        }
        populateHistoryCards(); // Populate the 1st event, death, and birth on page 1
        hideShowArrow(); // Handle visiblity of navigation arrows
}

function updateHistory(param) { // API call.  Param = date in mm/dd format. 
        changeNavArrowsToRed();
        eventCardsVisible();
        rightArrow.style.visibility = "visible"
        $.ajax(`https://history.muffinlabs.com/date/${param}`)
                .then(function (data) {
                        apiInfo = data;
                        render();
                });
}

function updateGA(param) {
        eventArrowsHidden();
        eventCardsHidden();
        dateArrowsRedtoWhite();
        clearCardsHTML();
        topicList.length = 0
        taskList.length = 0

        $.getJSON("ga.json", function (json) { // Read the JSON data from ga.json.
                if (param in json) { // Avoid errors when no json data for given date.
                        topicList.push(json[param][0].topic);
                        taskList.push(json[param][0].tasks);
                } else {
                        return
                }

                let tasksStr = json[param][0].tasks; // String of tasks from JSON

                let taskListSeperated = tasksStr.split(', '); // Convert comma seperated string into an array

                eventsCard.style.visibility = "visible"
                $(".eventsTitle").html(topicList); // Update topic

                if ((taskListSeperated.length) > 1) { // Only place bullet points when theres information to display
                        taskListSeperated.forEach(task => $(".events").append("<br>• " + task + "</br>")) // Append each task   
                } else {
                        return
                }
        });
}

function shiftRight() {
        if (listIndex === eventList.length) { // If vieiwing the last card, stop adding to the index and hide right arrow
                return
        }
        listIndex++
        populateHistoryCards();
        hideShowArrow(); // Handle visiblity of navigation arrows

}

function shiftLeft() {
        if (listIndex === 0) { // If vieiwing the first card, stop removing 1 from the index and hide left arrow
                return
        }
        listIndex--
        populateHistoryCards();
        hideShowArrow(); // Handle visiblity of navigation arrows

}

function hideShowArrow() { // Handles the visibility of navigation arrows based on the current card. 
        if (listIndex === 0) {
                leftArrow.style.visibility = "hidden"
        } else if (listIndex === eventList.length) {
                rightArrow.style.visibility = "hidden"
        } else {
                leftArrow.style.visibility = "visible"
                rightArrow.style.visibility = "visible"
        }
}

function nextDay() { // Navigate to the next day.
        updateDateBy(1)
}

function prevDay() { // Navigate to the previous day.
        updateDateBy(-1)
}

function changeNavArrowsToRed() { // Update date navigation arrows to red.
        $("#dateLeft").removeClass("btn-danger")
        $("#dateLeft").addClass("btn-light")
        $("#dateRight").removeClass("btn-danger")
        $("#dateRight").addClass("btn-light")
}


function eventCardsVisible() { // Update event cards to visible.
        eventsCard.style.visibility = "visible"
        birthsCard.style.visibility = "visible"
        deathsCard.style.visibility = "visible"
}

function eventArrowsHidden() { // Hide event navigation arrows.
        leftArrow.style.visibility = "hidden"
        rightArrow.style.visibility = "hidden"
}

function eventCardsHidden() { // Update event cards to hidden.
        eventsCard.style.visibility = "hidden"
        birthsCard.style.visibility = "hidden"
        deathsCard.style.visibility = "hidden"
}

function dateArrowsRedtoWhite() { // Update date navigation arrows to the light color.
        $("#dateLeft").removeClass("btn-light")
        $("#dateLeft").addClass("btn-danger")
        $("#dateRight").removeClass("btn-light")
        $("#dateRight").addClass("btn-danger")
}

function clearCardsHTML() { // Clear text within all cards.
        $(".eventsTitle").html("");
        $(".events").html("");

        $(".deathsTitle").html("");
        $(".deaths").html("");
        $(".birthsTitle").html("");
        $(".births").html("");
}

function clearHistoryLists() { // Empty the event, death, and birth lists.
        eventList.length = 0
        deathsList.length = 0
        birthsList.length = 0
}

function pushApiDataToLists(index) { // Add incoming API info to the correct array.
        i = index
        eventList.push(apiInfo.data.Events[i].html)
        deathsList.push(apiInfo.data.Deaths[i].html)
        birthsList.push(apiInfo.data.Births[i].html)
}

function populateHistoryCards() { // Update the history cards with the next event, death, and birth for that date.
        $(".eventsTitle").html("Events: ");
        $(".deathsTitle").html("Deaths: ");
        $(".birthsTitle").html("Births: ");

        $(".events").html(eventList[listIndex]);
        $(".deaths").html(deathsList[listIndex]);
        $(".births").html(birthsList[listIndex]);
}

function updateDateBy(thisManyDays) { // Update page information when the date is adusted by + or - 1.
        currentlyVeiwingDate.setDate(currentlyVeiwingDate.getDate() + thisManyDays); // Adjust currently viewed date by this many days.
        let dateToday = currentlyVeiwingDate.toLocaleDateString("en-US", options) // Format to mm/dd for API calls.
        let dd = String(currentlyVeiwingDate.getDate()).padStart(2, '0'); // Format to mm/dd for API calls.
        let mm = String(currentlyVeiwingDate.getMonth() + 1).padStart(2, '0'); // Format to mm/dd for API calls.
        let currentlyVeiwingDateAPIVersion = mm + '/' + dd // Format: mm/dd.
        let currentlyVeiwingDateHTMLVersion = currentlyVeiwingDate.toLocaleDateString("en-US", options) // Format: Month, Day, Year.
        $(".todaysDate").html(currentlyVeiwingDateHTMLVersion) // Update page to display the new date in format Month, Day, Year.
        getApiData(currentlyVeiwingDateAPIVersion); // Retrieve the API data for the new date in the correct mm/dd format.
}


onPageLoad(); // When the page first loads, display historical information for today & set the footer.