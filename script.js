let tabview = []; // tableau dut mot à découvir
let tabword = []; // tableau des underscord et lettres trouvées
let alreadytab = [];
let word = $('#word');
let wordy = "";
let letter = $('#letter')
let start = $('#start');
let restart = $('#restart');
let lifeview = $('#life');
let play = $('#play');
let life = 10;
let underscord = $('#underscord');
let check = false;
let win;
let final;
var already = 0;
let winload = false;
let imgpendu;
let winspace = 0;

$('#go').click(function(){
    if (word.val().trim() == ""){
        word.val("");
        alert("Veillez entrez un mot !");
    }else{
        tabword = word.val().toUpperCase().split("");
        for (var i = 0; i < tabword.length; i++){
            if (tabword[i] == " "){
                tabview.push("-");
                winspace++;
            }else{
                tabview.push("_");
            }
        }
        win = tabview.length - winspace;
        wordy = tabview.join(" ");
        underscord.text(wordy);
        start.toggleClass("alt");
        restart.toggleClass("alt");
        play.toggleClass("alt");
        word.val("");
    }
})

$('#reload').click(function(){
    if (winload == false){
        tabview = []
        tabword = []
        underscord.text("");
        life = 10;
        lifeview.text(life);
        start.toggleClass("alt");
        restart.toggleClass("alt");
        play.toggleClass("alt");
        alreadytab = [];
        letter.val("");
        $('#you').css({'display':'none'});
        $('#win').css({'display':'none'});
        $('#lose').css({'display':'none'});
        winspace = 0;

    }else{
        tabview = []
        tabword = []
        underscord.text("");
        life = 10;
        lifeview.text(life);
        start.toggleClass("alt");
        restart.toggleClass("alt");
        alreadytab = [];
        winload = false;
        $('#you').css({'display':'none'});
        $('#win').css({'display':'none'});
        $('#lose').css({'display':'none'});
        letter.val("")
        winspace = 0;
    }
})

$('#ok').click(function(){

    // if (letter.val().length != 1){
    //     letter.val("")
    //     alert("Veuillez entrez une seule lettre.");
    // }else 
    if (letter.val() == " "){
        letter.val("")
        alert("Pas d'espace.");
    }else{
        already = 0;
        var alltab = alreadytab.length;
        for (var control = 0; control < alltab; control++){
            if (letter.val().toUpperCase() == alreadytab[control]){
                already++;
            }
        }
        if (already > 0){
            letter.val("")
            alert("Lettre déjà proposée.");
            already = 0;
        }else{
            alreadytab.push(letter.val().toUpperCase())
            for (var i = 0; i < tabword.length; i++){
                if (letter.val().toUpperCase() == tabword[i]){
                    check = true;
                    tabview[i] = tabword[i];
                    wordy = tabview.join(" ");
                    underscord.text(wordy);
                    win--;
                }
            }
            if (check == true){
                letter.val("")
                check = false;
                if (win == 0){
                    play.toggleClass("alt");
                    winload = true;
                    $('#you').css({
                        'margin-top': '20px',
                        'border': 'solid 2px black',
                        'height': '95%',
                        'width': '20%',
                        'display': 'flex',
                        'flex-direction': 'column',
                        'justify-content': 'space-around',
                        'align-items': 'center',
                        'font-size': '50px',
                        'background-color':'green'
                    });

                    $('#win').css({
                        'margin-top': '20px',
                        'border': 'solid 2px black',
                        'height': '95%',
                        'width': '20%',
                        'display': 'flex',
                        'flex-direction': 'column',
                        'justify-content': 'space-around',
                        'align-items': 'center',
                        'font-size': '50px',
                        'background-color':'green'
                    });
                }
            }else{
                letter.val("")
                life--;
                lifeview.text(life);
                $('#imgpendu').attr("src", `./assets/Pendu_${life}.png`)
                if (life == 0){
                    play.toggleClass("alt");
                    winload = true;

                    $('#you').css({
                        'margin-top': '20px',
                        'border': 'solid 2px black',
                        'height': '95%',
                        'width': '20%',
                        'display': 'flex',
                        'flex-direction': 'column',
                        'justify-content': 'space-around',
                        'align-items': 'center',
                        'font-size': '50px',
                        'background-color':'red'
                    });

                    $('#lose').css({
                        'margin-top': '20px',
                        'border': 'solid 2px black',
                        'height': '95%',
                        'width': '20%',
                        'display': 'flex',
                        'flex-direction': 'column',
                        'justify-content': 'space-around',
                        'align-items': 'center',
                        'font-size': '50px',
                        'background-color':'red'
                    });

                    underscord.text("Le mot était " + tabword.join(""));
                }
            }
        }
        
    }
})