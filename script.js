// Assignment: Trivia Night
// Objectives:
// 1. Manipulate the DOM based on data received from an API.
// 2. Manipulate the DOM based on user interaction.
$(document).ready(function() {
    let categoryIDs = {
        'Entertainment: Video Games': 'games',
        'History': 'history',
        'Science & Nature': 'science'
    };
    const amount = 3;  // single question returned
    const type = 'multiple';
    const category = 15;   // 22 is category for video games (entertainment)
    const baseUrl = 'https://opentdb.com/api.php?amount=' + amount + '&category=' + category + '&type=' + type;
    $.get(baseUrl, function(response){
        for(let index = 0; index < response.results.length; index++){
            const result = response.results[index];
            const html = buildHTML(result);
            const score = buildScoreHTML(index);
            console.log(result);
            const elementID = categoryIDs[result.category];
            console.log(elementID);
            console.log(buildDisplayHTML(score, html));
            const element = document.getElementById(elementID);
            let answerStr = '';
            let allAnswers = [
                result.correct_answer,
                result.incorrect_answers
            ];
            // let newAnswersArray = [].concat.apply(allAnswers);
            let newAnswersArray = [];
            for(var i = 0; i < allAnswers.length; i++){
                if(typeof allAnswers[i] == 'object'){
                    for(var x = 0; x < allAnswers[i].length; x++){
                        newAnswersArray.push(allAnswers[i][x]);
                    }
                } else {
                    newAnswersArray.push(allAnswers[i]);
                }
            }
            answerStr = buildAnswersHTML(newAnswersArray);

            // console.log("index: " + index + " | score: " + score + " | html: " + html);
            element.innerHTML += buildDisplayHTML(score, html, answerStr);
        }
    }, 'json')
    .done(function() { });

    function buildAnswersHTML(answersArray){
        let tempAnswers = '';
        for(var ans = 0; ans < answersArray.length; ans++){
            tempAnswers += `<input type='radio' class='answers' value='${answersArray[ans]}' /><label name='answers' class='answers'>${answersArray[ans]}</label>`;
        }
        return tempAnswers;
    }

    function buildHTML(question){
        // populate the html string with the question information
        let htmlStr = `<div class="hidden" data-id="${question.category}">${question.question}</div>`;
        // console.log("htmlString: " + htmlStr);
        return htmlStr;
    }
    function buildDisplayHTML(score, question, answers){
        let scoreDisplayHtml = `<div class="question">${score} ${question} ${answers}</div>`;
        return scoreDisplayHtml;
    }
    function buildScore(value){
        return (value + 1) *100;
    }
    function buildScoreHTML(value) {
        let scoreHtml = `<div class="difficulty">${buildScore(value)}</div>`;
        return scoreHtml;
    }

    // if the div is clicked, show question information
    $('#games').on('click', '.question', function(){
    // $('.question').click( function (event) {
        // to do this, we need to send another request to the API.
        let id = $(this).attr('data-id');
        $(this).children('.difficulty').toggle();
        $(this).children('.hidden').toggle();
        $(this).children('.answers').toggle();
    });
});


