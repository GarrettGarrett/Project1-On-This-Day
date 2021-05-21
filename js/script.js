/*----- constants -----*/
let date = "5/21"
/*----- app's state (variables) -----*/
let apiData;
/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/
function getApiData () {
        $.ajax(`http://history.muffinlabs.com/date/${date}`)
    .then(function(data) { 
        apiData = data;
        render();
        });
}

function render() {
        console.log(apiData.data.Events);
};   


getApiData()