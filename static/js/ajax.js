"use strict";


//Display test result on page
let user_melody;

function testResult(evt) {
    evt.preventDefault();
    let url = "/pitches.json"
    let formInputs = {
        "pitches-one": $(".pitches-one").val(),
        "pitches-two": $(".pitches-two").val(),
        "pitches-three": $(".pitches-three").val(),
        "pitches-four": $(".pitches-four").val(),
        "pitches-five": $(".pitches-five").val(),
        "pitches-six": $(".pitches-six").val(),
        "pitches-sev": $(".pitches-sev").val(),
        "pitches-eight": $(".pitches-eight").val()
    };
    console.log(formInputs)
    
    $.post(url, formInputs, (results) =>{ user_melody=results; console.log(results); $("#show-pitches").text(JSON.stringify(results))})

}



$('#pitch-form').on('submit',testResult);



