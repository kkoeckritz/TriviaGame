var questions = {
    0: {
        ask: "\"Sorry to bother you - where is the capital of Turkey?\"",
        answers: {
            a1: "Istanbul",
            a2: "Constantinople",
            a3: "Ankara"
        },
        correct: "a3"
    },
    1: {
        ask: "\"Excuse me - where can I find Hollywood?\"",
        answers: {
            a1: "Los Angeles",
            a2: "Milwaukee",
            a3: "Chicago"
        },
        correct: "a1"
    },
    2: {
        ask: "Third question?",
        answers: {
            a1: "Not this one",
            a2: "This neither.",
            a3: "Here we go."
        },
        correct: "a3"
    },
    3: {
        ask: "Fourth question?",
        answers: {
            a1: "Dis here",
            a2: "Not dis",
            a3: "Nor dis"
        },
        correct: "a1"
    },
    4: {
        ask: "Fifth question?",
        answers: {
            a1: "No",
            a2: "Yes",
            a3: "No"
        },
        correct: "a2"
    }
}

var game = {
    choice: "none",
    num_correct: 0,
    num_incorrect: 0,

    displayIntro: function() {
        // reset divs, counters; show 'ready, set, go'
        console.log("startOver called");
        $("#g_question").empty();
        $("#g_answers").empty();
        $("#g_reset").empty();
        this.num_correct = 0;
        this.num_incorrect = 0;

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
        // show countdown; decrement to 0
        var countdown = 10;
        $("#g_timer").html(`<h3>${countdown}</h3>`);
        var count_interval = setInterval(function() {
            countdown--;
            if (countdown > 0) {
                $("#g_timer").html(`<h3>${countdown}</h3>`);
            }
            else {
                clearInterval(count_interval);
            }
        }, 1000);

        // show question, answer choices
        console.log("__________________");
        console.log("displayQuestion called");
        $("#g_question").html(`<h2>${question.ask}</h2>`);
        $("#g_answers").empty();
        for (ans in question.answers) {
            $("<h4/>", {
                class: "gen_answers",
                id: ans,
                text: question.answers[ans]
            }).appendTo("#g_answers");
        }

        // add click listener to generated class (allow user to change answer)
        $(".gen_answers").on("click.gen_answers", function() {
            // save clicked id
            game.choice = $(this).attr("id");
            console.log(`choice1: ${game.choice}`);

            // change color to indicate choice
            $(".gen_answers").removeClass("selected");
            $(this).addClass("selected");
        });
    },
    displayAnswer: function(question) {

        console.log("displayAnswer called");
        console.log("------------------");

        // kill listener
        $(".gen_answers").off("click.gen_answers");        

        // evaluate clicked id correctness
        if (this.choice == "none") {
            $("#g_timer").html("<h3>Too Slow!</h3>");
            this.num_incorrect++;
        }
        else if (this.choice == question.correct) {
            $("#g_timer").html("<h3>CORRECT!</h3>");
            this.num_correct++;
        }
        else {
            $("#g_timer").html("<h3>INCORRECT!</h3>");
            this.num_incorrect++;
        }

        // compare choice (button id) with correct answer
        $("#g_question").html(`<h2>${question.ask}</h2>`);
        $("#g_answers").html(`<h3>${question.answers[question.correct]}</h3>`);

        // reset choice for next question
        this.choice = "none";
    },
    displayScore: function() {
        // grade game; show score
        console.log("displayScore called");
        $("#g_timer").empty();
        $("#g_question").html("<h2>Final Score:</h2>");
        $("#g_answers")
        .html(`<h2>Correct: ${this.num_correct}</h2>`)
        .append(`<h2>Incorrect: ${this.num_incorrect}</h2>`);

        // show reset button
        $("<input/>", {
            type: "button",
            id: "reset",
            value: "Try again?"
        }).appendTo("#g_reset");

        // when user clicks, restart everything
        $("#reset").one("click.reset", function() {
            game.playGame();

            $("#reset").off("click.reset");
        })
    },
    playGame: function() {
        // show intro screen
        game.displayIntro();

        var q_num = 0;

        // wait 2 seconds (for intro) then show first question, answer
        setTimeout(function() {
            game.displayQuestion(questions[q_num]);
            setTimeout(function() {
                game.displayAnswer(questions[q_num]);
                q_num++;
            }, 10000);
        
            // show each further question (indexed by q_num), answer; show score if over index
            var quiz_interval = setInterval(function() {
                if (q_num < Object.keys(questions).length) {
                    console.log(`Q_NUM: ${q_num}`);

                    game.displayQuestion(questions[q_num]);
        
                    setTimeout(function() {
                        game.displayAnswer(questions[q_num]);
                        q_num++;
                    }, 10000);
                }
                else {
                    console.log(`DONE: Q_NUM: ${q_num}`);
        
                    game.displayScore();
                    clearInterval(quiz_interval);
                }
            }, 12000);

        }, 2000);
    }
}

// run game when page loads
$().ready(function() {
    // COUNTER FOR TESTING --------------------
    // var foo = 0;
    // $("#test_count").html(`<p>${foo}</p>`);
    // setInterval(function() {
    //     foo++;
    //     $("#test_count").html(`<p>${foo}</p>`);
    // }, 1000);
    // ----------------------------------------

    game.playGame();
})