
let screen = "";
let number1 = 0;
let number2 = 0;
let opération = "";
let pushEgal = false


// on a une chaine de caracteres string avec des nombres et des opération, on va reperer la position de chaque opération.
function resultat() {

    pushEgal = true;
    let screenSplit = Array.from(screen); //  .split transforme le string en une liste, mais ATTENTION, c'est un objet , par un array
    // il vaut mieux visiblement utiliser Array.from

    //console.log(typeof(screenSplit)) object, la propriété lenght ne fonctionne pas
    let i = 0  // on modifie le tableau pour assembler les nombres ensemble
    while (i < Object.keys(screenSplit).length) {
        if (isNaN(screenSplit[i]) == false && isNaN(screenSplit[i + 1]) == false) { // si deux éléments se suivant sont des nombres
            screenSplit[i] = Number(screenSplit[i] + screenSplit[i + 1]); // on additionne ces deux string, ne pas confondre split  splice et slice!!
            screenSplit.splice(i + 1, 1); // on supprime le second élement
        }
        else { i += 1 }
    }
    console.log(screenSplit)
    // Avant tout, priorité aux chiffres décimaux

    i = 1
    while (i < Object.keys(screenSplit).length) {
        if (screenSplit[i] == "," || screenSplit[i] == ".") {
            screenSplit[i] = screenSplit[i - 1] + "." + screenSplit[i + 1];// on remplace par l'opération
            screenSplit.splice(i - 1, 1); screenSplit.splice(i, 1); // on supprime les deux nombres
            i -= 1
        }


        else { i += 1 }
    }

    //Maintenant, on va transformer les string nombre en nombre
    for (let i = 0; i < Object.keys(screenSplit).length; i++) {
        if (isNaN(Number(screenSplit[i])) == false) { screenSplit[i] = Number(screenSplit[i]) };
    }


    // Maintenant, il faut donner la priorité aux divisions et multiplications, et au %

    i = 1
    while (i < Object.keys(screenSplit).length) {
        if (screenSplit[i] == "/") {
            screenSplit[i] = screenSplit[i - 1] / screenSplit[i + 1];// on remplace par l'opération
            screenSplit.splice(i - 1, 1); screenSplit.splice(i, 1); // on supprime les deux nombres
            i -= 1
        }
        else if (screenSplit[i] == "*") {
            screenSplit[i] = screenSplit[i - 1] * screenSplit[i + 1];// on remplace par l'opération
            screenSplit.splice(i - 1, 1); screenSplit.splice(i, 1); // on supprime les deux nombres
            i -= 1
        }

        else if (screenSplit[i] == "%") {
            screenSplit[i] = screenSplit[i + 1] / 100 * screenSplit[i - 1];// on remplace par l'opération
            screenSplit.splice(i - 1, 1); screenSplit.splice(i, 1); // on supprime les deux nombres
            i -= 1

        }

        else { i += 1 }
    }
    console.log(screenSplit)

    i = 1
    while (i < Object.keys(screenSplit).length) {
        if (screenSplit[i] == "+") {
            screenSplit[i] = Number(screenSplit[i - 1]) + Number(screenSplit[i + 1]);// on remplace par l'opération
            screenSplit.splice(i - 1, 1); screenSplit.splice(i, 1); // on supprime les deux nombres
            i -= 1
        }
        else if (screenSplit[i] == "-") {
            screenSplit[i] = screenSplit[i - 1] - screenSplit[i + 1];// on remplace par l'opération
            screenSplit.splice(i - 1, 1); screenSplit.splice(i, 1); // on supprime les deux nombres
            i -= 1
        }

        else { i += 1 }
    }
    console.log(screenSplit)
    screen = String(screenSplit) // convertit l'objet en string
    document.querySelector("#resultat input").value = screenSplit
}

// Message d'erreur

function erreur() { document.querySelector("#resultat input").value = "Erreur"; setTimeout(function () { document.querySelector("#resultat input").value = screen }, 200) }

// Nombres
function nombre(id, print) {
    document.getElementById(id).addEventListener("click", function () { screen += print; console.log("saisie: " + screen); document.querySelector("#resultat input").value = screen; pushEgal = false })
}


nombre("un", "1")
nombre("deux", "2")
nombre("trois", "3")
nombre("quatre", "4")
nombre("cinq", "5")
nombre("six", "6")
nombre("sept", "7")
nombre("huit", "8")
nombre("neuf", "9")
nombre("zero", "0")


// Opération
function operation(id, print) {
    document.getElementById(id).addEventListener("click", function () {
        if (isNaN(screen.charAt(screen.length - 1)) == false && screen != "") { screen += print; console.log("saisie: " + screen); document.querySelector("#resultat input").value = screen; pushEgal = false }
        else {
            erreur()

        }
    })
}


operation("plus", "+")
operation("moins", "-")
operation("fois", "*")
operation("divise", "/")
operation("percent", "%")
operation("virgule", ",")

// AC, supprime le dernier ou tout si déjà un résultat
document.getElementById("ac").addEventListener("click", function () {
    if (pushEgal == false) { screen = screen.slice(0, -1); }
    else { screen = ""; }; document.querySelector("#resultat input").value = screen; pushEgal = false
})


// Résultat
document.getElementById("egal").addEventListener("click", function () {
    if (isNaN(screen.charAt(screen.length - 1)) == true) { erreur() }

    else { resultat() }
})


