const fetch = require("node-fetch");
//==========================================================
//
//  Discord Bot
//  
//  Posting in your Discord server through webhooks
//  on selected days, at a specified time
//
//==========================================================

//Edit these...

//Dates
const lectureDays = [
    'YYYYMMDD', 'YYYYMMDD', 'YYYYMMDD' 
];
const oneDayAfterCourseEnds = 'YYYYMMDD';

//Webhook
const webhookURL = "replace with webhook URL";

//Message
const botMessage = 'replace with your message to be sent';

//Post at this time
let postAtHour = 13;
let postAtMinutes = 0;

//==========================================================
//"Post the message"-functionality
const postMessage = async () => {
    try {
        await fetch(webhookURL, {
            method: "post",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              content: botMessage
            })
        });
        console.log("message sent");
    } catch (error) {
        console.log(error);
    };
};



let oneDayInMs = 86400000;
const appStarterDate = new Date();
let msToPostHour = new Date(appStarterDate.getFullYear(), appStarterDate.getMonth(), appStarterDate.getDate(), postAtHour, postAtMinutes, 0, 0) - appStarterDate;
if (msToPostHour < 0) {
    msToPostHour += oneDayInMs; // it's after x o'clock, try x o'clock tomorrow.
}
console.log('App started at: ' + appStarterDate);
console.log('Post at this time: ' + new Date(appStarterDate.getFullYear(), appStarterDate.getMonth(), appStarterDate.getDate(), postAtHour, postAtMinutes, 0, 0));
console.log(`Total Hours until checking date and depending on, post: ${(msToPostHour / 3600000).toFixed(1)}`);
console.log(`Total Minutes until checking date and depending on, post: ${parseInt(msToPostHour / 60000)}`);


//for testing
//post at these interval-times
// oneDayInMs = 10000;
//timeout until first post
// msToPostHour = 1000;



//Sending the message every lecture day at x o'clock
//If the day is not a lecture day, don't send any message
let intervalID;

setTimeout(() => {
    console.log(`setTimeout callback initialized`);
    checkTheDate();

    console.log(`next try in: ${oneDayInMs / 3600000} hours`);

    let intervalCounter = 1;
    intervalID = setInterval(() => {
        console.log(`nb${intervalCounter} setInterval callback initialized`);
        checkTheDate();
        intervalCounter++;
    }, oneDayInMs);
}, msToPostHour);

function checkTheDate() {
    const date = new Date();
    const today = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
    
    if (today >= oneDayAfterCourseEnds) {
        clearInterval(intervalID);
        console.log(`Intervals stopped`);
        process.exit(0);
    };
    
    for (let lectureDay of lectureDays) {
        if (lectureDay === today) {
            console.log("today's a lecture day, send reminder message");
            postMessage();
        }
    }
}