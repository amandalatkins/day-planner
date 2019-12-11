$(document).ready(function() {

    // Set the firstHour and lastHour parameters
    var firstHour = 9;
    var lastHour = 17; //5pm in 24 hour format

    // First create our Object
    var plannerObject = {};

    var today = getDate();
    var hour = getHour();

    //For testing, uncomment line 14 and set your chosen hour in 24 hour time
    // var hour = 11;

    init();

    //initalize our day planner
    function init() {
        renderObject();
        renderPlanner();
        renderCurrentDay();
    }

    // Run the renderObject function to update the Object if necessary
    function renderObject() {
        // If there's anything in localStorage, let's parse it
        if (retrieveObject()) {
            plannerObject = retrieveObject();
        }
        // If today hasn't been added, let's add it
        if (!plannerObject[today]) {
            plannerObject[today] = renderObjectHours();
            // Let's go ahead and send the updated Object back to localStorage
            storeObject();
        } 
    }

    // Renders the hour items for plannerObject
    function renderObjectHours() {
        var hoursObject = {};
        for (var i = firstHour; i <= lastHour; i++) {
            hoursObject[i] =  "";
        }
        return hoursObject;
    }

    // Render the day planner
    function renderPlanner() {
        $('#plannerBody').empty();
        for (var i = firstHour; i <= lastHour; i++) {
            var html = '<div class="hour-row '+isPastPresFut(i)+'" id="'+i+'">';
            html += '<div class="planner-container hour-label"><span>'+getHourFormatted(i)+'</span></div>';
            html += '<textarea class="planner-container event" data-hour="'+i+'">'+plannerObject[today][i]+'</textarea>';
            html += '<button class="planner-container save btn btn-primary" data-hour="'+i+'"><img src="assets/images/save-solid.svg"/></button>';
            html += '</div>';

            $('#plannerBody').append(html);
        }
    }

    // This function renders the current day at the top of the page
    function renderCurrentDay() {
        $('#currentDay').text(moment().format('dddd, MMMM D, YYYY'));
    }

    // Click listener for save button and keyup listener for input
    $('.save').on('click',saveEvent);

    // Save a new event to our Object and push it to localStorage
    function saveEvent(e) {
            var hour = $(this).data().hour;
            plannerObject[today][hour] = $('textarea[data-hour='+hour+']').val().trim();
            storeObject();
    }

    // Helper functions

    // Store/retrieve Object in localStorage
    function storeObject() {
        localStorage.setItem('planner',JSON.stringify(plannerObject));
    }
    function retrieveObject() {
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
    // Determine if the hour passed to the function is before, current, or after the realtime current hour
    function isPastPresFut(i) {
        if (i < hour) {
            return "past";
        } else if (i == hour) {
            return "current";
        } else if (i > hour) {
            return "future";
        }
    }

    // Retrieve pretty 12 hour version of the time
    function getHourFormatted(hr) {
       return moment(hr,'H').format('ha');
    }

});