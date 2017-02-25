//////////////////////////////////////////////////
// LETTE MENSA WEBSITE - (C) 2016/7 			//
// https://github.com/LetteVerein/lette-mensa   //
//////////////////////////////////////////////////

//# Init Start
$(document).ready(function init() {
    if (dateToday != getdateToday()) {
        console.warn("Warning, your date (" + dateToday + ") is hardcoded!");
        console.debug("Start, Today " + dateToday + " (" + getDayName(dateToday) + ")");
        setButtons(dateToday);
        loadJSON(dateToday);
    } else {
        console.debug("Start, Today " + dateToday + " (" + getDayName(dateToday) + ")");
        setButtons(dateToday);
        loadJSON(dateToday);
    }

    // set active button
    $('#daymenu li').on('click', function () {
        // $(this).button('complete')
        $("#daymenu").find(".active").removeClass("active");
        $(this).addClass('active').siblings().removeClass('active');
    })
})

// # buttons for changing the day.
function setButtons(date) {
    const mensaID = ["mensa0", "mensa1"], buttons = ["d0", "d1", "d2", "d3"];
    let d0 = getDatePlus(date, +0, "DD.MM"), d0name = getDayName(date),
        d1 = getDatePlus(date, +1, "DD.MM"), d1name = getDayName(getDatePlus(date, +1, "YYYY-MM-DD")),
        d2 = getDatePlus(date, +2, "DD.MM"), d2name = getDayName(getDatePlus(date, +2, "YYYY-MM-DD")),
        d3 = getDatePlus(date, +3, "DD.MM"), d3name = getDayName(getDatePlus(date, +3, "YYYY-MM-DD")),
        d4 = getDatePlus(date, +4, "DD.MM"), d4name = getDayName(getDatePlus(date, +4, "YYYY-MM-DD")),
        d5 = getDatePlus(date, +5, "DD.MM"), d5name = getDayName(getDatePlus(date, +5, "YYYY-MM-DD")),
        d6 = getDatePlus(date, +6, "DD.MM"), d6name = getDayName(getDatePlus(date, +6, "YYYY-MM-DD"));
    for (a = 0; a < mensaID.length; a++) {
        if (getDayName(date) == "Samstag") {
            $("#" + mensaID[a] + " #" + buttons[0]).text(error);
            $("#" + mensaID[a] + " #" + buttons[1]).text(d2name + " (" + d2 + ")");
            $("#" + mensaID[a] + " #" + buttons[2]).text(d3name + " (" + d3 + ")");
            $("#" + mensaID[a] + " #" + buttons[3]).text(d4name + " (" + d4 + ")");
            $("#" + mensaID[a] + " #" + buttons[3]).text(d5name + " (" + d5 + ")");
        }
        else if (getDayName(date) == "Sonntag") {
            $("#" + mensaID[a] + " #" + buttons[0]).text(error);
            $("#" + mensaID[a] + " #" + buttons[1]).text(d1name + " (" + d1 + ")");
            $("#" + mensaID[a] + " #" + buttons[2]).text(d2name + " (" + d2 + ")");
            $("#" + mensaID[a] + " #" + buttons[3]).text(d3name + " (" + d3 + ")");
            $("#" + mensaID[a] + " #" + buttons[3]).text(d4name + " (" + d4 + ")");
        }
        else if (getDayName(date) == "Mittwoch") {
            $("#" + mensaID[a] + " #" + buttons[0]).text(d0name + " (" + d0 + ")");
            $("#" + mensaID[a] + " #" + buttons[1]).text(d1name + " (" + d1 + ")");
            $("#" + mensaID[a] + " #" + buttons[2]).text(d2name + " (" + d2 + ")");
            $("#" + mensaID[a] + " #" + buttons[3]).text(d5name + " (" + d5 + ")");
            $("#" + mensaID[a] + " #" + buttons[3]).text(d6name + " (" + d6 + ")");
        }
        else if (getDayName(date) == "Donnerstag") {
            $("#" + mensaID[a] + " #" + buttons[0]).text(d0name + " (" + d0 + ")");
            $("#" + mensaID[a] + " #" + buttons[1]).text(d1name + " (" + d1 + ")");
            $("#" + mensaID[a] + " #" + buttons[2]).text(d4name + " (" + d4 + ")");
            $("#" + mensaID[a] + " #" + buttons[3]).text(d5name + " (" + d5 + ")");
            $("#" + mensaID[a] + " #" + buttons[3]).text(d6name + " (" + d6 + ")");
        }
        else if (getDayName(date) == "Freitag") {
            $("#" + mensaID[a] + " #" + buttons[0]).text(d0name + " (" + d0 + ")");
            $("#" + mensaID[a] + " #" + buttons[1]).text(d3name + " (" + d3 + ")");
            $("#" + mensaID[a] + " #" + buttons[2]).text(d4name + " (" + d4 + ")");
            $("#" + mensaID[a] + " #" + buttons[3]).text(d5name + " (" + d5 + ")");
            $("#" + mensaID[a] + " #" + buttons[3]).text(d6name + " (" + d6 + ")");
        }
        else {
            $("#" + mensaID[a] + " #" + buttons[0]).text(d0name + " (" + d0 + ")");
            $("#" + mensaID[a] + " #" + buttons[1]).text(d1name + " (" + d1 + ")");
            $("#" + mensaID[a] + " #" + buttons[2]).text(d2name + " (" + d2 + ")");
            $("#" + mensaID[a] + " #" + buttons[3]).text(d3name + " (" + d3 + ")");
            //$("#"+mensaID[a]+" #"+buttons[4]).text(d4name+" ("+d4+")");
        };
    }
    for (a = 0; a < mensaID.length; a++) {
        $("#" + mensaID[a] + " #" + buttons[0]).on("click", function (event) {
            event.preventDefault();
            AssignmentByDate(date);
        });
        $("#" + mensaID[a] + " #" + buttons[1]).on("click", function (event) {
            event.preventDefault();
            AssignmentByDate(getDatePlus(date, +1, "YYYY-MM-DD"));
        });
        $("#" + mensaID[a] + " #" + buttons[2]).on("click", function (event) {
            event.preventDefault();
            AssignmentByDate(getDatePlus(date, +2, "YYYY-MM-DD"));
        });
        $("#" + mensaID[a] + " #" + buttons[3]).on("click", function (event) {
            event.preventDefault();
            AssignmentByDate(getDatePlus(date, +3, "YYYY-MM-DD"));
        });
    }
    console.debug("Buttons names are set.")
};

// # Assignment by Date
function AssignmentByDate(date) {
    const mensaID = ["Mensa0", "Mensa1"];
    let lStorageName = "mensa-day_" + date;
    if (localStorage.getItem(lStorageName) === null) {
        console.warn(errorAPINull + date);
        loadJSON(date);
    } else {
        try {
            console.debug("Assignment for the " + date + ", start...");
            const data = JSON.parse(localStorage.getItem(lStorageName));
            displayTheMeals(mensaID[0], date, data);
            displayTheMeals(mensaID[1], date, data);
            console.debug("Assignment for the " + date + " , done.");
        } catch (error) {
            console.error(errorAPI)
            console.error(errorAPINull + date)
            alert(date + "\n" + errorAPINull2);
            reloadPage();
        }
    }

    function displayTheMeals(mensa, date, data) {
        let speiseElemente = ["name", "beschreibung", "beachte", "preis", "kcal", "fette", "eiweisse", "kolenhydrate", "zusatzstoffe"];
        if (mensa == mensaID[0]) {
            var speiseTypen = ["Vorspeise", "Vegetarisch", "Vollkost", "Beilagen", "Dessert"];
        } else if (mensa == mensaID[1]) {
            var speiseTypen = ["Vorspeise", "Leichte-Vollkost", "Gemüseteller", "Dessert"];
        } else {
            console.error("Error! No mensa selected.")
            reloadPage();
        };

        for (let a = 0; a < speiseTypen.length; a++) {
            for (let b = 0; b < speiseElemente.length; b++) {
                let currentMealPart = data[mensa][date][speiseTypen[a]][speiseElemente[b]];
                $("#" + mensa.toLocaleLowerCase() + " #" + speiseTypen[a].toLocaleLowerCase() + " #" + speiseElemente[b] + "").text(currentMealPart)
            }
        };
    };
};
// ##