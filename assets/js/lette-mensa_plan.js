//////////////////////////////////////////////////
// LETTE MENSA WEBSITE - (C) 2016/7 			//
// https://github.com/LetteVerein/lette-mensa   //
//////////////////////////////////////////////////

//# Init Start
$(document).ready(function init() {
    if (dateToday != getdateToday()) {
        console.warn("Warning, your date (" + dateToday + ") is hardcoded!");
        console.debug("Start, Today " + dateToday + " (" + getDayName(dateToday) + ")");
        setButtonsAndMeal(dateToday);
    } else {
        console.debug("Start, Today " + dateToday + " (" + getDayName(dateToday) + ")");
        setButtonsAndMeal(dateToday);
    }

    // set active button
    $('#daymenu li').on('click', function () {
        // $(this).button('complete')
        $("#daymenu").find(".active").removeClass("active");
        $(this).addClass('active').siblings().removeClass('active');
    })
})

function setButtonsAndMeal(date) {
    const buttons = ["d0", "d1", "d2", "d3", "d4"];
    let d0 = getDatePlus(date, +0, "DD.MM"),
        d0name = getDayName(date),
        d0nameshort = moment(date).locale(momentLang).format("dd"),
        d1 = getDatePlus(date, +1, "DD.MM"),
        d1name = getDayName(getDatePlus(date, +1, "YYYY-MM-DD")),
        d1nameshort = moment(getDatePlus(date, +1, "YYYY-MM-DD")).locale(momentLang).format("dd"),
        d2 = getDatePlus(date, +2, "DD.MM"),
        d2name = getDayName(getDatePlus(date, +2, "YYYY-MM-DD")),
        d2nameshort = moment(getDatePlus(date, +2, "YYYY-MM-DD")).locale(momentLang).format("dd"),
        d3 = getDatePlus(date, +3, "DD.MM"),
        d3name = getDayName(getDatePlus(date, +3, "YYYY-MM-DD")),
        d3nameshort = moment(getDatePlus(date, +3, "YYYY-MM-DD")).locale(momentLang).format("dd"),
        d4 = getDatePlus(date, +4, "DD.MM"),
        d4name = getDayName(getDatePlus(date, +4, "YYYY-MM-DD")),
        d4nameshort = moment(getDatePlus(date, +4, "YYYY-MM-DD")).locale(momentLang).format("dd"),
        d5 = getDatePlus(date, +5, "DD.MM"),
        d5name = getDayName(getDatePlus(date, +5, "YYYY-MM-DD")),
        d5nameshort = moment(getDatePlus(date, +5, "YYYY-MM-DD")).locale(momentLang).format("dd"),
        d6 = getDatePlus(date, +6, "DD.MM"),
        d6name = getDayName(getDatePlus(date, +6, "YYYY-MM-DD")),
        d6nameshort = moment(getDatePlus(date, +6, "YYYY-MM-DD")).locale(momentLang).format("dd"),
        d7 = getDatePlus(date, +7, "DD.MM"),
        d7name = getDayName(getDatePlus(date, +7, "YYYY-MM-DD")),
        d7nameshort = moment(getDatePlus(date, +7, "YYYY-MM-DD")).locale(momentLang).format("dd"),
        progs;

    if (getDayName(date) == "Samstag") {
        progs = ["2", "3", "4", "5", "6"];
        let dnow = getDatePlus(date, +1, "YYYY-MM-DD");
        runInit(dnow);
    } else if (getDayName(date) == "Sonntag") {
        progs = ["1", "2", "3", "4", "5"];
        let dnow = getDatePlus(date, +1, "YYYY-MM-DD");
        runInit(dnow);
    } else if (getDayName(date) == "Montag") {
        progs = ["0", "1", "2", "3", "4"];
        runInit(date);
    } else if (getDayName(date) == "Mittwoch") {
        progs = ["0", "1", "2", "5", "6"];
        runInit(date);
    } else if (getDayName(date) == "Donnerstag") {
        progs = ["0", "1", "4", "5", "6"];
        runInit(date);
    } else if (getDayName(date) == "Freitag") {
        progs = ["0", "3", "4", "5", "6"];
        runInit(date);
    } else { // catch Mo
        progs = ["0", "1", "2", "3", "4"];
        runInit(date);
    }
    setButtons(date, progs);
    preLoadData(date, progs);

    // init fun for init day
    function runInit(date) {
        loadJSON(date);
        setTitle(date);
        setMeal(date);
    }

    // set text (date and datename) on buttons and mensa text headline. On click switch to the right day.
    function setButtons(date, progs) {
        for (let i = 0; i < buttons.length; i++) {
            // console.debug(buttons.length);
            // console.debug(i);
            // console.debug([progs[i]].toString());
            let btnPlus = "+" + [progs[i]].toString();
            for (let i2 = 0; i2 < 2; i2++) {
                $("#d" + eval([i])).text(eval("d" + [progs[i]] + "name") + " - " + getDatePlus(date, +0, "DD.MM")).on("click", function (event) {
                    event.preventDefault();
                    setMeal(getDatePlus(date, btnPlus, "YYYY-MM-DD"));
                    setTitle(getDatePlus(date, btnPlus, "YYYY-MM-DD"));
                });
            }
            $("#d" + eval([i]) + "-tiny").text(eval("d" + [progs[i]] + "nameshort")).on("click", function (event) {
                event.preventDefault();
                setMeal(getDatePlus(date, btnPlus, "YYYY-MM-DD"));
                setTitle(getDatePlus(date, btnPlus, "YYYY-MM-DD"));
            });
            $("#d" + eval([i]) + "-date").text(eval("d" + [progs[i]]) + "").on("click", function (event) {
                event.preventDefault();
                setMeal(getDatePlus(date, btnPlus, "YYYY-MM-DD"));
                setTitle(getDatePlus(date, btnPlus, "YYYY-MM-DD"));
            });
        }
        console.debug("Buttons are set.")
    };

    function setTitle(date) {
        $("#mensa0-title").text("Normale Küche | " + getDayName(date) + ", den " + getDatePlus(date, +0, "DD.MM.YYYY"));
        $("#mensa1-title").text("Diätküche | " + getDayName(date) + ", den " + getDatePlus(date, +0, "DD.MM.YYYY"));
        console.debug("Titles are set.")
    }

    // preload data bevor on button click
    function preLoadData(date, progs) {
        try {
            for (let i = 1; i < progs.length; i++) {
                let datePlus = "+" + [progs[i]].toString();
                console.log(datePlus);
                loadJSON(getDatePlus(date, datePlus, "YYYY-MM-DD"));
            }
        } catch (error) {
            console.error(errorAPI);
        }
    }

    function setMeal(date) {
        let sessionStorageName = "mensa-day_" + date;

        if (sessionStorage.getItem(sessionStorageName) === null) {
            console.warn(errorAPINull + date);
            loadJSON(date);
        } else {
            try {
                console.debug("Meal set assignment for the " + date + ", start...");
                const data = JSON.parse(sessionStorage.getItem(sessionStorageName));
                setMeal(mensaID[0], date, data);
                setMeal(mensaID[1], date, data);
                console.debug("Meal set assignment for the " + date + " , done.");
            } catch (error) {
                console.error(errorAPI)
                console.error(errorAPINull + date)
                alert(date + "\n" + errorAPINull2);
                reloadPage();
            }
        }

        function setMeal(mensa, date, data) {
            if (mensa == mensaID[0]) {
                let speiseTypen = speiseTypenMensa0;
            } else if (mensa == mensaID[1]) {
                let speiseTypen = speiseTypenMensa1;
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
}