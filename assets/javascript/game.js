var chosen = {
    hero: {
        id: "hero",
        name: "HERO",
        hp: 888,
        ap: 2,
        cap: 1,
        img: ""
    },
    defender: {
        id: "defender",
        name: "DEFENDER",
        hp: 999,
        ap: 2,
        cap: 1,
        img: ""
    }
}

var character = {
    dennis: {
        id: "dennis",
        name: "Dennis Reynolds",
        hp: 100,
        ap: 8,
        cap: 8,
        img: "https://vignette.wikia.nocookie.net/itsalwayssunny/images/d/d6/Dennis_%2811%29.jpg/revision/latest?cb=20110812033346"
    },
    dee: {
        id: "dee",
        name: "Dee Reynolds",
        hp: 90,
        ap: 10,
        cap: 10,
        img: "https://i.pinimg.com/originals/b5/5c/32/b55c3287164a4460f8f4f47485727079.jpg"
    },
    mac: {
        id: "mac",
        name: "Mac",
        hp: 120,
        ap: 9,
        cap: 9,
        img: "http://media.lehighvalleylive.com/tv_impact/photo/itsalwayssunny-macjpg-834a5d489f4922f3_large.jpg"
    },
    charlie: {
        id: "charlie",
        name: "Charlie Kelly",
        hp: 100,
        ap: 6,
        cap: 6,
        img: "http://images2.fanpop.com/images/photos/2900000/iasip-its-always-sunny-in-philadelphia-2900439-375-500.jpg"
    },
    frank: {
        id: "frank",
        name: "Frank Reynolds",
        hp: 140,
        ap: 7,
        cap: 7,
        img: "https://vignette.wikia.nocookie.net/itsalwayssunny/images/7/7b/Frank_%282%29.jpg/revision/latest/scale-to-width-down/180?cb=20110812033432"
    }
}

var game = {
    initDivs: function(which) {
        // 0: add all character divs
        if (which == 0) {

            // fill with character data
            for (var person in character) {
                $("<div/>", {
                    id: character[person].id,
                    class: "char_div char_unselected"
                }).appendTo("#g_chars");
                $("#" + character[person].id)
                .append("<p>" + character[person].id + "</p>")
                .append("<img src=\"" + character[person].img + "\" width=\"125\" height=\"140\"/>")
                .append("<p>" + character[person].hp + "</p>");
            }
            console.log("characters initialized.")
        }
        // 1: add hero div
        else if (which == 1) {

            // clear target parent div first
            $("#hero").html("");

            // show hero data            
            $("<div/>", {
                id: "hero",
                class: "char_div hero_div"
            }).appendTo("#g_hero");
            $("#hero")
            .append("<p>" + chosen.hero.name + "</p>")
            .append("<img src=\"" + chosen.hero.img + "\" width=\"125\" height=\"140\"/>")
            .append("<p class=\"g_hero_hp\">" + chosen.hero.hp + "</p>");
        }
        // 2: add defender div
        else if (which == 2) {

            // clear target parent div first
            $("#defender").html("");

            // show defender data               
            $("<div/>", {
                id: "defender",
                class: "char_div defender_div"
            }).appendTo("#g_defender");
            $("#defender")
            .append("<p>" + chosen.defender.name + "</p>")
            .append("<img src=\"" + chosen.defender.img + "\" width=\"125\" height=\"140\"/>")
            .append("<p class=\"g_defender_hp\">" + chosen.defender.hp + "</p>");
        }

    },
    chooseHero: function() {
        // listen for clicked character div
        $(".char_unselected").one("click.hero_select", function() {
            var char_id = $(this).attr("id");

            console.log("hero: " + char_id);

            // set hero's properties to those of chosen character
            for (var property in chosen.hero) {
                chosen.hero[property] = character[char_id][property];
            }

            // relocate chosen char (as hero)
            $(this).detach().hide(1000);
            game.initDivs(1);
            $(this).removeClass("char_unselected");
            $(".char_unselected").detach().appendTo("#g_enemies");

            // kill listener
            $(".char_unselected").off("click.hero_select");
        });
    },
    chooseDefender: function() {
        // listen to remaining unselected divs for click
        $(".char_unselected").one("click.defender_select", function() {
            var char_id = $(this).attr("id");

            console.log("defender: " + char_id);

            // set defender's properties to those of chosen character
            for (var property in chosen.defender) {
                chosen.defender[property] = character[char_id][property];
            }

            // relocate chosen char (as defender)
            $(this).detach().hide(1000);
            game.initDivs(2);
            $(this).removeClass("char_unselected");

            // kill listener
            $(".char_unselected").off("click.defender_select");
        });
    },
    doBattle: function() {
        console.log("FIGHT: " + chosen.hero.name + " vs " + chosen.defender.name);
        var won = false;

        // when user clicks Attack button
        $("#g_attack").on("click.attack", function() {

            // if hero is dead, kill listener and reload page
            if (chosen.hero.hp < 1) {
                $("#g_attack").off("click.attack");
                $(".game").html("<h2>" + chosen.hero.name + " is dead. You lose. </h2>");
                setTimeout(function() {
                    location.reload(true);
                }, 2000)
            }

            // // if not changed from "done", user must have won!
            // else if (chosen.defender.name == "done") {
            //     $(".game").html("<h2>" + chosen.hero.name + " has conquered all. You win! </h2>");
            //     setTimeout(function() {
            //         location.reload(true);
            //     }, 2000)
            // }

            // if defender is dead, let user choose another from enemies
            else if (chosen.defender.hp < 1) {
                $("#defender").html("");

                // if enemies left, this should be undone by chooseDefender
                chosen.defender.name = "done";
                game.chooseDefender();

                // if not changed from "done", user must have won!
                $(document).one("click.defender_select", function() {
                    if (chosen.defender.name == "done") {
                        $(".game").html("<h2>" + chosen.hero.name + " has conquered all. You win! </h2>");
                        setTimeout(function() {
                            location.reload(true);
                        }, 2000)
                    }
                    $(document).off("click.defender_select");
                });
            }

            else {
                // adjust health/attack points, redisplay them
                chosen.defender.hp -= chosen.hero.ap;
                chosen.hero.hp -= chosen.defender.cap;
                 chosen.hero.ap += chosen.hero.cap;
                game.initDivs(1);
                game.initDivs(2);

                console.log("hero hp: " + chosen.hero.hp);
                console.log("def hp: " + chosen.defender.hp);

                // check again for hero death
                if (chosen.hero.hp < 1) {
                    $("#g_attack").off("click.attack");
                    $(".game").html("<h2>" + chosen.hero.name + " is dead. You lose. </h2>");
                    setTimeout(function() {
                        location.reload(true);
                    }, 2000)
                }
                
                // check again for defender death
                else if (chosen.defender.hp < 1) {
                    $("#defender").html("");
                    game.chooseDefender();

                    // if not changed from "done", user must have won!
                    $(document).one("click.defender_select", function() {
                        if (chosen.defender.name == "done") {
                            $(".game").html("<h2>" + chosen.hero.name + " has conquered all. You win! </h2>");
                            setTimeout(function() {
                                location.reload(true);
                            }, 2000)
                        }
                        $(document).off("click.defender_select");
                    });
                }
            }
        });
        // console.log(chosen.hero.id + " is triumphant. You win!");
    },
    playGame: function() {
        this.chooseHero();
        $(document).one("click.hero_select", function() {
            game.chooseDefender();
            $(document).one("click.defender_select", function() {
                game.doBattle();
            });
        });
    }
}

$().ready(function() {
    game.initDivs(0);
    setTimeout(function() {
        game.playGame();
    }, 100);
})