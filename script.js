var currentDay = moment().format("dddd LL");
$("#currentDay").append(currentDay);

var currentTime = moment().format("LT");
$("#currentTime").append(currentTime);


var now = new Date().getHours();

function colorCode() {
  if (now > 9) {
    $("#comment9am").addClass("past");
  } else if (now >= 9 && now < 10) {
    $("#comment9am").addClass("present");
  } else if (now < 9) {
    $("#comment9am").addClass("future");
  }
  if (now > 10) {
    $("#comment10am").addClass("past");
  } else if (now >= 10 && now < 11) {
    $("#comment10am").addClass("present");
  } else if (now < 10) {
    $("#comment10am").addClass("future");
  }
  if (now > 11) {
    $("#comment11am").addClass("past");
  } else if (now >= 11 && now < 12) {
    $("#comment11am").addClass("present");
  } else if (now < 11) {
    $("#comment11am").addClass("future");
  }
  if (now > 12) {
    $("#comment12pm").addClass("past");
  } else if (now >= 12 && now < 13) {
    $("#comment12pm").addClass("present");
  } else if (now < 12) {
    $("#comment12pm").addClass("future");
  }
  if (now > 13) {
    $("#comment1pm").addClass("past");
  } else if (now >= 13 && now < 14) {
    $("#comment1pm").addClass("present");
  } else if (now < 13) {
    $("#comment1pm").addClass("future");
  }
  if (now > 14) {
    $("#comment2pm").addClass("past");
  } else if (now >= 14 && now < 15) {
    $("#comment2pm").addClass("present");
  } else if (now < 14) {
    $("#comment2pm").addClass("future");
  }
  if (now > 15) {
    $("#comment3pm").addClass("past");
  } else if (now >= 15 && now < 16) {
    $("#comment3pm").addClass("present");
  } else if (now < 15) {
    $("#comment3pm").addClass("future");
  }
  if (now > 16) {
    $("#comment4pm").addClass("past");
  } else if (now >= 16 && now < 17) {
    $("#comment4pm").addClass("present");
  } else if (now < 16) {
    $("#comment4pm").addClass("future");
  }
  if (now > 17) {
    $("#comment5pm").addClass("past");
  } else if (now >= 17 && now < 18) {
    $("#comment5pm").addClass("present");
  } else if (now < 17) {
    $("#comment5pm").addClass("future");
  }
}


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
    var containerDiv = $(".container"); 

    
    for (let hourBlock=firstEntry; hourBlock <= lastEntry; hourBlock++) {
        
        var newHtml = '<div class="row time-block"> ' +
            '<div class="col-md-1 hour">' + hourMap[hourBlock] + '</div> ';
        
        
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

        
        newHtml = newHtml + '<button class="btn saveBtn col-md-1" value="' + hourMap[hourBlock] + '">' +
            '<i class="fas fa-save"></i></button> ' +
            '</div>';

        
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


function saveClick () {
    var hourBlock = $(this).val();
    var entryFound = false;
    var newEntryIndex = timeEntries.length;
    var newEntry = {day:currentDate, time:hourBlock, text: $("#text"+hourBlock).val()};

    function timeGreater(time1,time2) {
        var num1 = parseInt(time1.substring(0, time1.length-2)); 
        var num2 = parseInt(time2.substring(0, time2.length-2)); 
        var per1 = time1.substr(-2,2); 
        var per2 = time2.substr(-2,2); 

        if (num1 === 12) {
            num1 = 0;
        }

        if (num2 === 12) {
            num2 = 0;
        }

       
        if (per1 < per2) {
            return false; 
        }
        else if (per1 > per2) {
            return true; 
        }
        else {
            return (num1 > num2);
        }
    }
        

}


for (let i=0; i<timeEntries.length; i++) {
    if (timeEntries[i].day == currentDate) {
        if (timeEntries[i].time == hourBlock) {
            timeEntries[i].text == newEntry.text;
            entryFound = true;
            break;
        }

        else if (timeGreater(timeEntries[i].time, hourBlock)) {
            newEntryIndex = i;
            break;
        }
    }
    

else if (timeEntries[i].day > currentDate) {
    newEntryIndex = i;
    break;
}


if (!entryFound) {
    timeEntries.splice(newEntryIndex, 0, newEntry);
}

// store in local storage
localStorage.setItem(timeEntriesName, JSON.stringify(timeEntries));

} 
