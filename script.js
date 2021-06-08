var currentDate = ""; 
var currentDateString = "";
var currentHour = 8;
var timeEntries = [];

const timeEntriesName ="WorkDaySchedule";
const firstEntry =8;
const lastEntry =17;

const hourMap = ["12AM","1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM","12PM",
"1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"];

setCurrentDateAndHour();
buildTimeBlocks();
getTimeEntries();

$(".saveBtn").click(saveClick);

function setCurrentDateAndHour() {
    var today = new Date();
    var day = today.getDate();
    var dayEnd = "th";
}

currentHour = today.getHours();


function buildTimeBlocks() {
    var containerDiv = $(".container"); // get the container div to append new rows to

    // Loop through hourMap, from [firstEntry] of "9AM" to [lastEntry] of "5PM"
    for (let hourBlock=firstEntry; hourBlock <= lastEntry; hourBlock++) {
        // build the html for the row and the first column
        var newHtml = '<div class="row time-block"> ' +
            '<div class="col-md-1 hour">' + hourMap[hourBlock] + '</div> ';
        
        // conditionally set second column to corrent class: past, present or future
        if (hourBlock < currentHour) {
            newHtml = newHtml + '<textarea class="col-md-10 description past" id="text' + 
                hourMap[hourBlock] + '"></textarea> ';
        }
        else if (hourBlock === currentHour) {
            newHtml = newHtml + '<textarea class="col-md-10 description present" id="text' + 
                hourMap[hourBlock] + '"></textarea> ';
        }
        else {
            newHtml = newHtml + '<textarea class="col-md-10 description future" id="text' + 
                hourMap[hourBlock] + '"></textarea> ';
        };

        // add last column and close the row div
        newHtml = newHtml + '<button class="btn saveBtn col-md-1" value="' + hourMap[hourBlock] + '">' +
            '<i class="fas fa-save"></i></button> ' +
            '</div>';

        // add new elements to container
        containerDiv.append(newHtml);
    }
}


function getTimeEntries() {
    var teList = JSON.parse(localStorage.getItem(timeEntriesName));

    if (teList) {
        timeEntries = teList;
    }

    for (let i=0; i<timeEntries.length; i++) {
        if (timeEntries[i].day == currentDate) {
            $("#text"+timeEntries[i].time).val(timeEntries[i].text);  
        }
    }
}