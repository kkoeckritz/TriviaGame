var questions = {
    0: {
        ask: "\"Sorry to bother you - where is the capital of Wyoming?\"",
        answers: {
            a1: "Jackson",
            a2: "Cheyenne",
            a3: "Laramie"
        },
        correct: "a2"
    },
    1: {
        ask: "\"I need to get to Hollywood!\"",
        answers: {
            a1: "Go to Los Angeles",
            a2: "Head to Milwaukee",
            a3: "Try Chicago"
        },
        correct: "a1"
    },
    2: {
        ask: "\"Where can I take my boat to see the Statue of Liberty?\"",
        answers: {
            a1: "Ellis Island",
            a2: "Staten Island",
            a3: "Liberty Island"
        },
        correct: "a3"
    },
    3: {
        ask: "\"Hey bro! Where's the Grand Canyon bro? Slacklinin' bro!\"",
        answers: {
            a1: "Colorado",
            a2: "Arizona",
            a3: "New Mexico"
        },
        correct: "a2"
    },
    4: {
        ask: "\"Hi there, big Mickey Mouse fan. How do I get to Disney World?\"",
        answers: {
            a1: "I think it's in Southern California...",
            a2: "It's on the East Coast somewhere",
            a3: "You're going to have to go to Florida"
        },
        correct: "a3"
    },
    5: {
        ask: "\"Do you Uber? Doesn't matter - take me to Crater Lake!\"",
        answers: {
            a1: "Okay, let's go to Mississippi",
            a2: "Looks like we're going to Washington",
            a3: "That's all the way in Oregon; how about you walk there yourself!"
        },
        correct: "a3"
    },

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
    game.playGame();
})