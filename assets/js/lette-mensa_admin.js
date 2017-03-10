//////////////////////////////////////////////////
// LETTE MENSA WEBSITE - (C) 2016/7 			//
// https://github.com/LetteVerein/lette-mensa   //
//////////////////////////////////////////////////

// Datepicker & Buttons
// -- bootstrap-datepicker.de.min.js - https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/locales/bootstrap-datepicker.de.min.js
!function (a) {
    a.fn.datepicker.dates.de = {
        days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        daysShort: ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"],
        daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        today: "Heute",
        monthsTitle: "Monate",
        clear: "Löschen",
        weekStart: 1,
        format: "dd.mm.yyyy"
    }
}(jQuery);
// --

//# init
$(function () {
    $('#datepicker').datepicker({
        format: "yyyy-mm-dd",
        maxViewMode: 3,
        todayBtn: "linked",
        language: "de",
        daysOfWeekDisabled: "0,6",
        daysOfWeekHighlighted: "0,6",
        calendarWeeks: true,
        todayHighlight: true
    });
    $('#datepicker').datepicker().on("changeDate", function () {
        dateToday = $('#datepicker').datepicker('getFormattedDate');
        console.log("Date selected: " + dateToday)
        $('#mensa0').css('display', '');
        $('#next').css('display', '');
        $('#datepicker').css('display', 'none');
        $("#date-display").text($('#datepicker').datepicker('getFormattedDate'));
    });
    $('#SubmitAndSave').click(function () {
        BootstrapDialog.show({
            message: 'Möchten Sie die Daten wirklich speichern? \n\n Passwort zum speichern: <input type="text" id="auth-pw" class="form-control">',
            onhide: function (dialogRef) {
                var input = dialogRef.getModalBody().find('input').val();
            },
            buttons: [{
                label: 'Speichern',
                title: 'Speichern',
                cssClass: 'btn-danger',
                action: function (dialogItself) {
                    postRoutine();
                    $('#mensa1').css('display', 'none');
                    $('#datepicker').css('display', '');
                    dialogItself.close();
                }
            }, {
                label: 'Abbrechen',
                cssClass: 'btn-info',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }]
        });
    });
    $('button#next').click(function () {
        $('#mensa0').css('display', 'none');
        $('#next').css('display', 'none');
        $('#mensa1').css('display', '');
        $('#finish').css('display', '');
    });
    $('button#back').click(function () {
        $('#mensa1').css('display', 'none');
        $('#mensa0').css('display', '');
        $('#next').css('display', '');
    });
    $('.select-name').selectize({
        allowEmptyOption: false,
        maxItems: 1,
        create: true,
        createOnBlur: true,
        persist: false,
        valueField: 'title',
        labelField: 'title',
        searchField: 'title',
        sortField: {
            field: 'title',
            direction: 'asc'
        },
        options: [
            { title: "Tomatensalat" },
            { title: "Hähnchenkeule" },
            { title: "Erbsen, Paprikagemüse" },
            { title: "Erdbeeren" }],
    });
    $('.select-zusatzstoffe').selectize({
        delimiter: ', ',
        create: true,
        persist: false,
        valueField: 'name',
        labelField: 'name',
        searchField: 'name',
        options: [
            { name: "Salz" },
            { name: "Süßstoff" },
            { name: "Jodsalz" }],
    });
});
$(document).ready(function () {
    console.log("Date Today: " + moment().locale(momentLang).format("YYYY-MM-DD") + " (" + moment().locale(momentLang).format("dddd") + ") - And we use: " + getPreviousWorkday());
    $("#date-display").text("Tag bitte wählen... - " + getPreviousWorkday());
});

function postRoutine() {
    try {
        console.log(prepDataforPost())
        var dataReadyForPost = JSON.stringify(prepDataforPost());
        // var dataReadyForPost = prepDataforPost();
        console.log(dataReadyForPost);
        postJSON(dataReadyForPost);
    } catch (error) {
        console.log("Error: " + error)
        alert(errorAPIOffline)
    }
    return successPost
}

//# error handeling
function reloadPage() {
    setTimeout(
        function () {
            window.location.reload();
            /* or window.location = window.location.href; */
            console.log(errorReload);
            alert(errorReload);
        }, 5000)
};
// --

//# prep daten for the post
function prepDataforPost() {
    var dataObj = {}, date = $("#date-display").text(), auth_pw = $("input#auth-pw").val(), mensaID = ["Mensa0", "Mensa1"];
    if (date.length != 10) {
        // date = getPreviousWorkday();
        console.log(errorNoDay);
        alert(errorNoDay);
        return errorNoDay;
    }

    // OBJ/JSON Model
    dataObj = {
        auth_pw: "",
        Mensa0: {
            dateToday: {
                Vorspeise: {},
                Vegetarisch: {},
                Vollkost: {},
                Beilagen: {},
                Dessert: {},
            }
        },
        Mensa1: {
            dateToday: {
                Vorspeise: {},
                'Leichte-Vollkost': {},
                Dessert: {},
                Gemüseteller: {},
            }
        }
    };

    dataObj.auth_pw = auth_pw

    prepDataforMensa(mensaID[0], date);
    prepDataforMensa(mensaID[1], date);
    console.log(dataObj);
    return dataObj;

    function prepDataforMensa(mensa, date) {
        if (mensa == mensaID[0]) {
            var speiseTypen = ["Vorspeise", "Vegetarisch", "Vollkost", "Beilagen", "Dessert"], speiseElemente = ["name", "beschreibung", "beachte", "preis", "kcal", "fette", "eiweisse", "kolenhydrate", "zusatzstoffe"];
        } else if (mensa == mensaID[1]) {
            var speiseTypen = ["Vorspeise", "Leichte-Vollkost", "Gemüseteller", "Dessert"], speiseElemente = ["name", "beschreibung", "beachte", "preis", "kcal", "fette", "eiweisse", "kolenhydrate", "zusatzstoffe"];
        } else {
            console.log("Error! No mensa selected.")
            return error
        };

        for (var i = 0; i < speiseTypen.length; i++) {
            for (var iB = 0; iB < speiseElemente.length; iB++) {
                dataObj[mensa].dateToday[speiseTypen[i]][speiseElemente[iB]] = $("#" + mensa + "-" + speiseTypen[i] + "-" + speiseElemente[iB]).val()
            }
        };

        // rename of 'date' sinde dataObj to the real date like '2000-01-01'
        dataObj[mensa][date] = dataObj[mensa].dateToday
        delete dataObj[mensa].dateToday
    };
};