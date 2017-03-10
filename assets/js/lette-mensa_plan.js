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
        let t0 = d0, t1 = d3; t2 = d4, t3 = d5, t4 = d6;
        let t0name = d0name, t1name = d3ame, t2name = d4name, t3name = d5name, t4name = d6name;
        let t0nameshort = d0nameshort; t1nameshort = d3nameshort, t2nameshort = d4nameshort, t3nameshort = d5nameshort, t4nameshort= d6nameshort;
        $("#d0").text(error).on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +0, "YYYY-MM-DD")); });
        $("#d1").text(t1name + " (" + t1 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +2, "YYYY-MM-DD")); });
        $("#d2").text(t2name + " (" + t2 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +3, "YYYY-MM-DD")); });
        $("#d3").text(t3name + " (" + t3 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +4, "YYYY-MM-DD")); });
        $("#d4").text(t4name + " (" + t4 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +5, "YYYY-MM-DD")); });
        $("#d0-tiny").text(error).on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +0, "YYYY-MM-DD")); });
        $("#d1-tiny").text(t1nameshort + " (" + t1 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +2, "YYYY-MM-DD")); });
        $("#d2-tiny").text(t2nameshort + " (" + t2 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +3, "YYYY-MM-DD")); });
        $("#d3-tiny").text(t3nameshort + " (" + t3 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +4, "YYYY-MM-DD")); });
        $("#d4-tiny").text(t4nameshort + " (" + t4 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +5, "YYYY-MM-DD")); });
    }
    else if (getDayName(date) == "Sonntag") {
        let t0 = d0, t1 = d2; t2 = d3, t3 = d4, t4 = d5;
        let t0name = d0name, t1name = d2ame, t2name = d3name, t3name = d4name, t4name = d5name;
        let t0nameshort = d0nameshort; t1nameshort = d1nameshort, t2nameshort = d3nameshort, t3nameshort = d4nameshort, t4nameshort= d5nameshort;
        $("#d0").text(error).on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +0, "YYYY-MM-DD")); });
        $("#d1").text(t1name + " (" + t1 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +1, "YYYY-MM-DD")); });
        $("#d2").text(t2name + " (" + t2 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +2, "YYYY-MM-DD")); });
        $("#d3").text(t3name + " (" + t3 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +3, "YYYY-MM-DD")); });
        $("#d4").text(t4name + " (" + t4 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +4, "YYYY-MM-DD")); });
        $("#d0-tiny").text(t0nameshort + " (" + t1 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +0, "YYYY-MM-DD")); });
        $("#d1-tiny").text(t1nameshort + " (" + t1 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +1, "YYYY-MM-DD")); });
        $("#d2-tiny").text(t2nameshort + " (" + t2 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +2, "YYYY-MM-DD")); });
        $("#d3-tiny").text(t3nameshort + " (" + t3 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +3, "YYYY-MM-DD")); });
        $("#d4-tiny").text(t4nameshort + " (" + t4 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +4, "YYYY-MM-DD")); });
    }
    else if (getDayName(date) == "Mittwoch") {
        let t0 = d0, t1 = d1; t2 = d2, t3 = d5, t4 = d6;
        let t0name = d0name, t1name = d1name, t2name = d2name, t3name = d5name, t4name = d6name;
        let t0nameshort = d0nameshort; t1nameshort = d1nameshort, t2nameshort = d2nameshort, t3nameshort = d5nameshort, t4nameshort= d6nameshort;
        $("#d0").text(t0name + " (" + t0 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +0, "YYYY-MM-DD")); });
        $("#d1").text(t1name + " (" + t1 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +1, "YYYY-MM-DD")); });
        $("#d2").text(t2name + " (" + t2 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +2, "YYYY-MM-DD")); });
        $("#d3").text(t3name + " (" + t3 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +5, "YYYY-MM-DD")); });
        $("#d4").text(t4name + " (" + t4 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +6, "YYYY-MM-DD")); });
        $("#d0-tiny").text(t0nameshort + " (" + t1 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +0, "YYYY-MM-DD")); });
        $("#d1-tiny").text(t1nameshort + " (" + t1 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +1, "YYYY-MM-DD")); });
        $("#d2-tiny").text(t2nameshort + " (" + t2 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +2, "YYYY-MM-DD")); });
        $("#d3-tiny").text(t3nameshort + " (" + t3 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +5, "YYYY-MM-DD")); });
        $("#d4-tiny").text(t4nameshort + " (" + t4 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +6, "YYYY-MM-DD")); });
    }
    else if (getDayName(date) == "Donnerstag") {
        let t0 = d0, t1 = d1; t2 = d4, t3 = d5, t4 = d6;
        let t0name = d0name, t1name = d1name, t2name = d3name, t3name = d5name, t4name = d6name;
        let t0nameshort = d0nameshort; t1nameshort = d1nameshort, t2nameshort = d3nameshort, t3nameshort = d5nameshort, t4nameshort= d6nameshort;
        $("#d0").text(t0name + " (" + t0 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +0, "YYYY-MM-DD")); });
        $("#d1").text(t1name + " (" + t1 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +1, "YYYY-MM-DD")); });
        $("#d2").text(t2name + " (" + t2 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +5, "YYYY-MM-DD")); });
        $("#d3").text(t3name + " (" + t3 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +6, "YYYY-MM-DD")); });
        $("#d4").text(t4name + " (" + t4 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +7, "YYYY-MM-DD")); });
        $("#d0-tiny").text(t0nameshort + " (" + t0 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +0, "YYYY-MM-DD")); });
        $("#d1-tiny").text(t1nameshort + " (" + t1 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +1, "YYYY-MM-DD")); });
        $("#d2-tiny").text(t2nameshort + " (" + t2 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +5, "YYYY-MM-DD")); });
        $("#d3-tiny").text(t3nameshort + " (" + t3 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +6, "YYYY-MM-DD")); });
        $("#d4-tiny").text(t4nameshort + " (" + t4 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +7, "YYYY-MM-DD")); });
    }
    else if (getDayName(date) == "Freitag") {
        let t0 = d0, t1 = d3; t2 = d4, t3 = d5, t4 = d6;
        let t0name = d0name, t1name = d3name, t2name = d4name, t3name = d5name, t4name = d6name;
        let t0nameshort = d0nameshort; t1nameshort = d3nameshort, t2nameshort = d4nameshort, t3nameshort = d5nameshort, t4nameshort= d6nameshort;
        $("#d0").text(t0name + " (" + t0 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +0, "YYYY-MM-DD")); });
        $("#d1").text(t1name + " (" + t1 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +3, "YYYY-MM-DD")); });
        $("#d2").text(t2name + " (" + t2 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +4, "YYYY-MM-DD")); });
        $("#d3").text(t3name + " (" + t3 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +5, "YYYY-MM-DD")); });
        $("#d4").text(t4name + " (" + t4 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +6, "YYYY-MM-DD")); });
        $("#d0-tiny").text(t0nameshort + " (" + t0 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +0, "YYYY-MM-DD")); });
        $("#d1-tiny").text(t1nameshort + " (" + t1 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +3, "YYYY-MM-DD")); });
        $("#d2-tiny").text(t2nameshort + " (" + t2 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +4, "YYYY-MM-DD")); });
        $("#d3-tiny").text(t3nameshort + " (" + t3 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +5, "YYYY-MM-DD")); });
        $("#d4-tiny").text(t4nameshort + " (" + t4 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +6, "YYYY-MM-DD")); });
    }
    else { // catch Mo and Th.
        $("#d0").text(d0name + " (" + d0 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +0, "YYYY-MM-DD")); });
        $("#d1").text(d1name + " (" + d1 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +1, "YYYY-MM-DD")); });
        $("#d2").text(d2name + " (" + d2 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +2, "YYYY-MM-DD")); });
        $("#d3").text(d3name + " (" + d3 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +3, "YYYY-MM-DD")); });
        $("#d4").text(d4name + " (" + d4 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +4, "YYYY-MM-DD")); });
        $("#d0-tiny").text(d0nameshort + " (" + d0 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +0, "YYYY-MM-DD")); });
        $("#d1-tiny").text(d1nameshort + " (" + d1 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +1, "YYYY-MM-DD")); });
        $("#d2-tiny").text(d1nameshort + " (" + d2 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +2, "YYYY-MM-DD")); });
        $("#d3-tiny").text(d1nameshort + " (" + d3 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +3, "YYYY-MM-DD")); });
        $("#d4-tiny").text(d1nameshort + " (" + d4 + ")").on("click", function (event) { event.preventDefault(); AssignmentByDate(getDatePlus(date, +4, "YYYY-MM-DD")); });
    };
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