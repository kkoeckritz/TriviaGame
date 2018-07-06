var questions = {
    q1: {
        ask: "Who is the best?",
        a1: "Britney Spears",
        a2: "Shakira",
        a3: "Michelle Branch",
        correct: "a1"
    },
    q2: {
        ask: "Where is the best?",
        a1: "New York",
        a2: "Milwaukee",
        a3: "Los Angeles",
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
        }, 750);
        setTimeout(function() {
            console.log("GO");
            $("#g_timer").html("<h2>GO!</h2>");
        }, 1500);

    },
    displayQuestion: function(question) {
        // add question, answer choices, click listener, countdown to screen
        console.log("displayQuestion called");

        // after timeout kill listener; grab user choice

    },
    displayAnswer: function() {
        // compare choice (button id) with correct answer
        console.log("displayAnswer called");
        console.log("------------");
        
    },
    displayScore: function() {
        // grade game; show score
        console.log("displayScore called");

    }
}



$().ready(function() {
    // show intro screen
    game.startOver();

    // show each question; wait; show answer
    setTimeout(function() {
        for (var q_num = 0; q_num < Object.keys(questions).length; q_num++) {
            setTimeout(function() {
                game.displayQuestion(questions[q_num]);
            }, 2000 + 12000 * q_num);
    
            setTimeout(function() {
                game.displayAnswer();
                q_num++;
            }, 12000 + 12000 * q_num);
        }
    }, 2000);

    // then show score
    setTimeout(function() {
        game.displayScore();
    }, 4000 + 12000 * Object.keys(questions).length);
})