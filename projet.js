var C = 39; //nbre de colonnes

var L = 20; //nbre de lignes

var etatCase = [];

etatCase[0] = 1;


for (var i = 1; i < C * L; i++) etatCase[i] = 0; //état de la case i

var etatPorte = [];


for (var i = 0; i < 2 * C * L - C - L; i++)
	
    etatPorte[i] = 0; //état de la porte i


var chemin = [0]; //numéros des cases dans l'ordre



function casesContigues(k) { //renvoie le tableau des cases contigues à la case k //dont l'état est 0

    var T = [];

    if (k - 1 >= 0 && k - 1 < C * L && Math.floor((k - 1) / C) == Math.floor(k / C) &&
	
        etatCase[k - 1] == 0) T.push(k -1);


    if (k + 1 >= 0 && k + 1 < C * L && Math.floor((k + 1) / C) == Math .floor(k / C)&&
	
        etatCase[k + 1] == 0) T.push(k +1);


    if (k - C >= 0 && k - C < C * L && (k - C) % C == k % C &&
	
        etatCase[k - C] == 0) T.push(k -C);



    if (k + C >= 0 && k + C < C * L && (k + C) % C == k % C &&
	
        etatCase[k + C] == 0) T.push(k + C);


    return T;

}




function porteEntre(a, b) { //renvoie le numéro de la porte entre les cases a et b
    var A = Math.min(a, b),
        B = Math.max(a, b);


    if (B == A + 1) return (2 * C - 1) * Math.floor(A / C) + A % C;

    else return (2 * C - 1) * Math.floor(A / C) + C - 1 + A % C;




}




function avanceChemin(k) { //renvoie la case suivant la case chemin[k]
    var m = k;

    while (casesContigues(chemin[m]).length ==  0 && m >= 0) m--;

    if (m >= 0) {
		
        var T = casesContigues(chemin[m]),l = T.length;
		
        var K = Math.floor(l * Math.random()),C = T[K];
		
        chemin.push(C);
		
        etatCase[C] = 1;
		
        etatPorte[porteEntre(chemin[m],C)] = 1;

    } 
	
	else chemin.push(0);


}



function prepareTableau() {

    var table = document.createElement("table");

    document.body.appendChild(table);

    var tr = [];

    for (var i = 0; i < L; i++) {
		
        tr[i] = document.createElement("tr");
		
        table.appendChild(tr[i]);
    }

    table.style.borderCollapse ="collapse";

    var td = [];

    for (var i = 0; i < L; i++) td[i] = [];

    for (var i = 0; i < L; i++) {

        for (var j = 0; j < C; j++) {
			
            td[i][j] = document.createElement("td");
			
            tr[i].appendChild(td[i][j]);
			
            td[i][j].setAttribute("id",C*i+j);
			
            td[i][j].style.width ="20px";
			
            td[i][j].style.height ="20px";
			
        }

    }

}




function noCase(k) { //renvoie le numéro de la case située à gauche (avec D) ou

    //au-dessus (avec B) de la porte numéro k

    var N = [];

    if (k % (2 * C - 1) < C - 1) N = [C*(Math.floor(k/(2*C- 1)))+   k%(2*C-1),"D" ];

    else N = [C * (Math.floor(k / (2*C-1))) + (k - C + 1) %(2 * C - 1), "B" ];

    return N;
	
}



function traceLabyrinthe() {

    document.getElementsByTagName( "table")[0].style.border ="3px solid red";
	
    document.getElementById(0).style.borderLeft ="3px solid white";
	
    document.getElementById(L*C-1).style.borderRight ="3px solid white";
	
    for (var i = 0; i < etatPorte.length; i++) {

        if (etatPorte[i] == 0) {

            var N = noCase(i);

            if (N[1] == "D") document.getElementById(N[0]).style.borderRight ="3px solid rgb(255,207,83)";

            if (N[1] == "B") document.getElementById(N[0]).style.borderBottom ="3px solid rgb(255,207,83)";
			
        }

    }

}


prepareTableau();

var j = 0;

while (chemin[j] != 0 || j == 0) {
    avanceChemin(j);
    j++;
}

traceLabyrinthe();




function gauche(k) { /*Applique le fond d'écran général du labyrinthe à la case k
					 et applique le fond d'écran du personnage a la case k-1*/

    var elt = document.getElementById(k);
    var elt1 = document.getElementById(k - 1);

    if (etatPorte[porteEntre(k, k - 1)] == 1) {
		
        if (k - 1 >= 0 && k - 1 < C * L && Math.floor((k - 1) / C) == Math.floor(k / C)) {
			
            elt.style.backgroundImage = 'url("imagedefondlabi.png")';
			
            elt1.style.backgroundImage =  'url("perso.png")';

        }
    }




}



function droite(k) {/*Applique le fond d'écran général du labyrinthe à la case k
					 et applique le fond d'écran du personnage a la case k+1*/

    var elt2 = document.getElementById(k);
    var elt3 = document.getElementById( k + 1);

    if (etatPorte[porteEntre(k, k + 1)] == 1) {
		
        if (k + 1 >= 0 && k + 1 < C * L &&Math.floor((k + 1) / C) == Math.floor(k / C)) {
			
            elt2.style.backgroundImage = 'url("imagedefondlabi.png")';
			
            elt3.style.backgroundImage =   'url("perso.png")';

        }
    }




}




function bas(k) {/*Applique le fond d'écran général du labyrinthe à la case k
					 et applique le fond d'écran du personnage a la case k+C*/

    var elt4 = document.getElementById(k);
    var elt5 = document.getElementById(k + C);


    if (etatPorte[porteEntre(k, k + C)] == 1) {

        if (k + C >= 0 && k + C < C * L && (k + C) % C == k % C) {
			
            elt4.style.backgroundImage = 'url("imagedefondlabi.png")';
			
            elt5.style.backgroundImage =  'url("perso.png")';

        }


    }


}




function haut(k) {/*Applique le fond d'écran général du labyrinthe à la case k
					 et applique le fond d'écran du personnage a la case k-C*/

    var elt6 = document.getElementById(k);
    var elt7 = document.getElementById(k - C);

    if (etatPorte[porteEntre(k, k - C)] == 1) {
		
        if (k - C >= 0 && k - C < C * L && (k - C) % C == k % C) {
			
            elt6.style.backgroundImage = 'url("imagedefondlabi.png")';
			
            elt7.style.backgroundImage =  'url("perso.png")';

        }

    }

}




function couleurAleat() {/*Génère une couleur aléatoire*/
	
    var a = Math.floor(256 * Math.random()); b = Math.floor(256 * Math.random());
    c = Math.floor(256 * Math.random());

    return "rgb(" + a + "," + b + "," + c + ")";


}




function changecouleurMur() {//Applique une couleur aléatoire au mur du labyrinthe.

    var color = couleurAleat();

    for (var i = 0; i < etatPorte.length; i++) {

        if (etatPorte[i] == 0 && color != "rgb(126,0,1)") {
			
            var N = noCase(i);

            if (N[1] == "D") {document.getElementById(  N[0]).style.borderRight ="3px solid " +color;}


            if (N[1] == "B") { document.getElementById(     N[0]).style.borderBottom = "3px solid " + color;}



        }

    }




}




function banane(L, C) {//Génère entre 21 et 28 bananes dans des cases aléatoires du labyrinthe (tableau).

    var t = Math.floor(51 * Math.random()) + 1;
    var e = Math.floor(6 * Math.random()) + 25;

    for (var i = t; i < (L * C); i += e) {
		
        document.getElementById(i).style.backgroundImage = 'url("banane.png")';

    }

}


function SupprimeImageBanane(L, C) {//Applique à toutes les cases du tableau (labyrinthe) le fond d'écran général du labyrinthe.

    for (var i = 1; i < (L * C); i++) {
		
        var eltt = document.getElementById(i)
		
        eltt.style.backgroundImage ='url("imagedefondlabi.png")';


    }

}


function messageFinJeu() {//  Insère dans la balise <p id="messageFinjeu"> le message:Vous avez fini le labyrinthe, bravo!
	
    var message1 = document.getElementById("messageFinjeu");

    message1.innerHTML ="Vous avez fini le labyrinthe, bravo!";


}


function supprimeMessageDimension() {//Permet à la balise <p id="dimension"> de n'avoir aucun contenu.
	
    var message = document.getElementById("dimension");

    message.innerHTML = " ";


}

function supprimeMessageFinJeu() {//Permet à la balise <p id="messageFinjeu"> de n'avoir aucun contenu.
	
    var message1 = document.getElementById("messageFinjeu");

    message1.innerHTML = " ";


}


function ChangeBordure() {//Permet d'appliquer au bordure du tableau (labyrinthe) une couleur aléatoire.

    var table1 = document.getElementsByTagName("table")[0];
	
    var color1 = couleurAleat();

    if (color1 != "rgb(126,0,1)") {
        table1.style.borderColor =couleurAleat();
    }



}


function ChangeTailleBordure(x) {//Applique une taille de x px aux bordures du tableau (labyrinthe)
	
    var table1 = document.getElementsByTagName("table")[0];

    table1.style.borderWidth = x + "px";


}

function ParDefautLabi() {//Permet de remettre la forme et le style du labyrinthe à l'instant initiale.
	
    traceLabyrinthe();

}




var k = 0; // identifiant de la case 0 du tableau (labyrinthe)
tailleBordure = 1;banane(20,39);



document.getElementById(0).style.backgroundImage ='url("perso.png")';



document.getElementById("gauche").onclick =
    function() {
		
        gauche(k);

        if (etatPorte[porteEntre(k - 1,k)] == 1 && k - 1 >= 0 &&
            k - 1 < C * L && Math.floor((k - 1) / C) == Math.floor( k / C)) k--;
			
    }


document.getElementById("droite").onclick =
    function() {
		
        droite(k);

        if (etatPorte[porteEntre(k, k + 1)] == 1 && k + 1 >= 0 &&
            k + 1 < C * L && Math.floor((k + 1) / C) == Math.floor(k / C)) k++;

        if (k == (L * C - 1)){
			
			messageFinJeu();
			setTimeout(supprimeMessageFinJeu,5000);
		
		
		
		}


    }


document.getElementById("haut").onclick =
    function() {
		
        haut(k);

        if (etatPorte[porteEntre(k - C,k)] == 1 && k - C >= 0 && 
		k - C < C * L && (k - C) % C == k % C) k -= C;
			
    }


document.getElementById("bas").onclick =
    function() {
		
        bas(k);

        if (etatPorte[porteEntre(k, k + C)] == 1 && k + C >= 0 && k + C < C * L &&
		(k + C) % C == k % C) k += C;
			
		if (k == (L * C - 1)){
			
			messageFinJeu();
			setTimeout(supprimeMessageFinJeu,5000);
		
		}
   
   }


document.getElementById( "changecouleurmur").onclick =
    function() {changecouleurMur();
	
    }




document.getElementById("ParDefautLabi")
    .onclick = function() {ParDefautLabi();
    }
	
	
document.getElementById("changeBanane")
    .onclick = function() {SupprimeImageBanane(20, 39); banane(20, 39);document.getElementById(k).style.backgroundImage='url("perso.png")';
    }
	
	
document.getElementById("ConnaitreDimension").onclick =
    function() {messageDimension();setTimeout(supprimeMessageDimension,5000);
    }
	
	
document.getElementById("ChangeCouleurBordure").onclick =
    function() {ChangeBordure();
    }
	
	
document.getElementById("ChangeTailleBordureA").onclick =
    function() {
		
        if (tailleBordure <= 6)ChangeTailleBordure(tailleBordure); tailleBordure++;
		
    }
	
	
document.getElementById("ChangeTailleBordureD").onclick =
    function() {
        if (tailleBordure <= 6 && tailleBordure > 0)ChangeTailleBordure(tailleBordure); tailleBordure--;
    }
	

	