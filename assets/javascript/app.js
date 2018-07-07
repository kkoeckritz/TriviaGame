var questions = {
    0: {
        ask: "First question?",
        answers: {
            a1: "Britney Spears",
            a2: "Shakira",
            a3: "Michelle Branch"
        },
        correct: "a1"
    },
    1: {
        ask: "Second question?",
        answers: {
            a1: "New York",
            a2: "Milwaukee",
            a3: "Los Angeles"
        },
        correct: "a3"
    },
    2: {
        ask: "Third question?",
        answers: {
            a1: "70s",
            a2: "80s",
            a3: "90s"
        },
        correct: "a3"
    },
    3: {
        ask: "Fourth question?",
        answers: {
            a1: "Ada",
            a2: "Bruce",
            a3: "Cindy"
        },
        correct: "a2"
    },
    4: {
        ask: "Fifth question?",
        answers: {
            a1: "Soda",
            a2: "Beer",
            a3: "Juice"
        },
        correct: "a3"
    }
}

var game = {
    choice: "none",

    startOver: function() {
        // reset divs; show 'ready, set, go'
        console.log("startOver called");
        $("#g_question").empty();
        $("#g_question").empty();

        console.log("READY");
        $("#g_timer").html("<h2>READY</h2>");
        setTimeout(function() {
            console.log("SET");
            $("#g_timer").html("<h2>SET</h2>");
        }, 500);
        setTimeout(function() {
            console.log("GO");
            $("#g_timer").html("<h2>GO!</h2>");
        }, 1000);

    },
    displayQuestion: function(question) {
        // add question, answer choices, click listener, countdown to screen
        console.log("__________________");
        console.log("displayQuestion called");
        // console.log(question);
        $("#g_timer").html(""); // TODO: COUNTDOWN
        $("#g_question").html(`<h3>${question.ask}</h3>`);
        $("#g_answers").empty();
        for (ans in question.answers) {
            $("#g_answers").append(`<h4>${question.answers[ans]}</h4>`);
        }
        // after timeout kill listener; grab user choice

    },
    displayAnswer: function() {
        // compare choice (button id) with correct answer
        console.log("displayAnswer called");
        console.log("------------------");
        $("#g_timer").html("<h3>RIGHT OR WRONG</h3>")
        $("#g_question").html("<h3>KEEP QUESTION</h3>");
        $("#g_answers").html("<h3>DISPLAY CORRECT ANSWER</h3>");

        
    },
    displayScore: function() {
        // grade game; show score
        console.log("displayScore called");
        $("#g_timer").empty();
        $("#g_question").html("<h2>Final Score:</h2>");
        $("#g_answers").html("<h2>(score)</h2>");
    }
}



$().ready(function() {
    // COUNTER FOR TESTING --------------------
    var foo = 1;
    setInterval(function() {
        $("#test_count").html(`<p>${foo}</p>`);
        foo++;
    }, 1000);
    // ----------------------------------------

    // show intro screen
    game.startOver();

    var q_num = 0;

    // wait 2 seconds (for intro) then show first question, answer
    setTimeout(function() {
        game.displayQuestion(questions[q_num]);
        setTimeout(function() {
            game.displayAnswer();
            q_num++;
        }, 10000);
    
        // show each further question (indexed by q_num), answer; show score if over index
        var quiz_interval = setInterval(function() {
            if (q_num < Object.keys(questions).length) {
                console.log(`Q_NUM: ${q_num}`);
    
                // setTimeout(function() {
                game.displayQuestion(questions[q_num]);
                // }, 2000);
    
                setTimeout(function() {
                    game.displayAnswer();
                    q_num++;
                }, 10000);
            }
            else {
                console.log(`DONE: Q_NUM: ${q_num}`);
    
                game.displayScore();
                clearInterval(quiz_interval);
                // clearInterval(quest_interval);
            }
        }, 12000);

    }, 2000);
})