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
    const buttons = ["d0", "d1", "d2", "d3", "d4"];
    let d0 = getDatePlus(date, +0, "DD.MM"), d0name = getDayName(date), d0nameshort = moment(date).locale(momentLang).format("dd"),
        d1 = getDatePlus(date, +1, "DD.MM"), d1name = getDayName(getDatePlus(date, +1, "YYYY-MM-DD")), d1nameshort = moment(getDatePlus(date, +1, "YYYY-MM-DD")).locale(momentLang).format("dd"),
        d2 = getDatePlus(date, +2, "DD.MM"), d2name = getDayName(getDatePlus(date, +2, "YYYY-MM-DD")), d2nameshort = moment(getDatePlus(date, +2, "YYYY-MM-DD")).locale(momentLang).format("dd"),
        d3 = getDatePlus(date, +3, "DD.MM"), d3name = getDayName(getDatePlus(date, +3, "YYYY-MM-DD")), d3nameshort = moment(getDatePlus(date, +3, "YYYY-MM-DD")).locale(momentLang).format("dd"),
        d4 = getDatePlus(date, +4, "DD.MM"), d4name = getDayName(getDatePlus(date, +4, "YYYY-MM-DD")), d4nameshort = moment(getDatePlus(date, +4, "YYYY-MM-DD")).locale(momentLang).format("dd"),
        d5 = getDatePlus(date, +5, "DD.MM"), d5name = getDayName(getDatePlus(date, +5, "YYYY-MM-DD")), d5nameshort = moment(getDatePlus(date, +5, "YYYY-MM-DD")).locale(momentLang).format("dd"),
        d6 = getDatePlus(date, +6, "DD.MM"), d6name = getDayName(getDatePlus(date, +6, "YYYY-MM-DD")), d6nameshort = moment(getDatePlus(date, +6, "YYYY-MM-DD")).locale(momentLang).format("dd");

    if (getDayName(date) == "Samstag") {
        progs = ["2", "3", "4", "5", "6"];
    }
    else if (getDayName(date) == "Sonntag") {
        progs = ["1", "2", "3", "4", "5"];
    }
    else if (getDayName(date) == "Mittwoch") {
        progs = ["0", "1", "2", "5", "6"];
    }
    else if (getDayName(date) == "Donnerstag") {
        progs = ["0", "1", "4", "5", "6"];
    }
    else if (getDayName(date) == "Freitag") {
        progs = ["0", "3", "4", "5", "6"];
    }
    else { // catch Mo and Th.
        progs = ["0", "1", "2", "3", "7"];
    }

    for (i = 0; i < buttons.length; i++) {
        console.log(i);
        console.log([progs[i]].toString());
        let btnPlus = "+" + [progs[i]].toString();
        $("#d" + eval([i])).text(eval("d" + [progs[i]] + "name") + " (" + eval("d" + [progs[i]]) + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, btnPlus, "YYYY-MM-DD")); });
        $("#d" + eval([i]) + "-tiny").text(eval("d" + [progs[i]] + "nameshort") + " (" + eval("d" + [progs[i]]) + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, btnPlus, "YYYY-MM-DD")); });
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