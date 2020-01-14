# Work Day Planner

## Summary

This application renders an hourly planner for a typical work day schedule. Each hour, from 9am to 5pm, features the ability to enter text that when saved persists on the planner even when refreshed. The application also tracks the current time of day in order to display the items in the planner as past, present, or future.

## Prerequisites

- Web Browser (Chrome, Safari, Firefox, etc)
- [JavaScript](https://enablejavascript.co/)
- [Local Storage](https://voicethread.com/howto/enabling-cookies/)

## Installing

Copy the repository link.

```
https://github.com/amandalatkins/code-quiz.git
```

Clone the repository to your local development environment

```
git clone https://github.com/amandalatkins/code-quiz.git
```

Open ``index.html`` in your prefered web browser

## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Moment.js](https://momentjs.com/)
* [Bootstrap](https://getbootstrap.com)

## Deployed Link

* [See Live App](https://amandalatkins.github.io/day-planner)

## Screenshots

![Desktop View](/assets/images/desktop.png)
![Mobile View](/assets/images/mobile.png)

## Code Snippets

The following snippet shows the setup of the object structure that powers the planner.

```javascript
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
```

## Authors

* ### Amanda Atkins
    - [Portfolio](https://digitalrainstorm.com)
    - [Github](https://github.com/amandalatkins)
    - [LinkedIn](https://www.linkedin.com/in/amandalatkins)

See also the list of [contributors](https://github.com/amandalatkins/day-planner/contributors) who participated in this project.

## License

This project is licensed under the MIT License.

Save icon is licensed under [Font Awesome's Free License](https://fontawesome.com/license/free).

## Acknowledgments

* [Font Awesome](https://fontawesome.com/) for the save icon
