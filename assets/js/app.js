$(document).ready(function() {

    // Set the firstHour and lastHour parameters
    var firstHour = 9;
    var lastHour = 17; //5pm in 24 hour format

    // First pull our array
    var plannerArray = {};

    var today = getDate();
    var hour = getHour();

    // We'll set an interval to run every half hour to update the today/hour variables in case a user leaves their tab open
    var hourCheck;

    init();

    //initalize our day planner
    function init() {
        renderArray();
        renderPlanner();
        renderCurrentDay();
    }

    // Run the render array function to update the array if necessary
    function renderArray() {
        // If there's anything in localStorage, let's parse it
        if (retrieveArray()) {
            plannerArray = retrieveArray();
        }
        // If today hasn't been added, let's add it
        if (!plannerArray[today]) {
            plannerArray[today] = renderArrayHours();

            // Let's go ahead and send the updated array back to localStorage
            storeArray();
        }
        
    }

    // Renders the hour items for plannerArray
    function renderArrayHours() {
        var hoursArray = {};
        for (var i = firstHour; i <= lastHour; i++) {
            hoursArray[i] =  "";
        }
        return hoursArray;
    }

    // Render the day planner
    function renderPlanner() {
        // $('#plannerBody').empty();
        for (var i = firstHour; i <= lastHour; i++) {
            $('#plannerBody').append('<p id="'+i+'"><strong>'+getHourFormatted(i)+'</strong>:<input type="text" value="'+plannerArray[today][i]+'" class="event" data-hour="'+i+'"/><button class="save" data-hour="'+i+'">Save</button></p>');
        }
    }

    function renderCurrentDay() {
        $('#currentDay').text(moment().format('dddd, MMMM D, YYYY'));
    }

    // Click listener for save button and keyup listener for input
    $('.save').on('click',saveEvent);
    $('.event').on('keyup',saveEvent);

    function saveEvent(e) {
        // If the event type was a click (ie from the save button) OR an enter key (from the keyup listener)
        if (e.type == "click" || e.keyCode == 13) {
            var hour = $(this).data().hour;
            plannerArray[today][hour] = $('input[data-hour='+hour+']').val();
            storeArray();
        }
    }

    // Helper functions

    // Store/retrieve array in localStorage
    function storeArray() {
        localStorage.setItem('planner',JSON.stringify(plannerArray));
    }

    function retrieveArray() {
        return JSON.parse(localStorage.getItem('planner'));
    }

    //Retrieves Current Date
    function getDate() {    
        return moment().format('YYYYMMDD');
    }

    //Retrieves Current Hour
    function getHour() {
        return moment().format('k');
    }

    // Retrieve pretty version of the time
    function getHourFormatted(hr) {
       return moment(hr,'H').format('ha');
    }

});