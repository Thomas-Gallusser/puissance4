let troues = new Array(5); // La liste des troues du plateau
for (let tbl = 0; tbl < 5; tbl++) troues[tbl] = new Array(5);
// troues[horizontal][vertical]

let tour = 0;
let nbrPlayer = 2; // Nombre de joueurs

// Je créer mon fond de jeu
let backg = document.createElement("div");
backg.style.width = "600px";
backg.style.height = "600px";
backg.style.position = "relative";
backg.style.margin = "0 auto";
backg.style.backgroundColor = "#5588ff";
backg.style.zIndex = 0;
document.body.appendChild(backg);

// Je créer mon fond de plateau
let board = document.createElement("div");
board.style.width = "500px";
board.style.height = "500px";
board.style.position = "absolute";
board.style.left = "50px";
board.style.top = "50px";
board.style.backgroundColor = "#000044";
board.style.borderRadius = "15px";
backg.style.zIndex = 1;
backg.appendChild(board);

// Je génère les troues du plateau de taille 5x5
for (let col = 70; col < 500; col+=96) {
  for (let line = 70; line < 500; line+=96) {
    let newTroue = document.createElement("div");
    newTroue.style.width = "76px";
    newTroue.style.height = "76px";
    newTroue.style.position = "absolute";
    newTroue.style.left = col + "px";
    switch ((col-70)/96) {
      case 0:
          newTroue.addEventListener("mouseover", event => { select(0); }, false);
          newTroue.addEventListener("mouseout", event => { de_select(0); }, false);
          newTroue.addEventListener("click", event => { poser(0); }, false);
        break;
      case 1:
        newTroue.addEventListener("mouseover", event => { select(1); }, false);
        newTroue.addEventListener("mouseout", event => { de_select(1); }, false);
        newTroue.addEventListener("click", event => { poser(1); }, false);
        break;
      case 2:
        newTroue.addEventListener("mouseover", event => { select(2); }, false);
        newTroue.addEventListener("mouseout", event => { de_select(2); }, false);
        newTroue.addEventListener("click", event => { poser(2); }, false);
        break;
      case 3:
        newTroue.addEventListener("mouseover", event => { select(3); }, false);
        newTroue.addEventListener("mouseout", event => { de_select(3); }, false);
        newTroue.addEventListener("click", event => { poser(3); }, false);
        break;
      case 4:
        newTroue.addEventListener("mouseover", event => { select(4); }, false);
        newTroue.addEventListener("mouseout", event => { de_select(4); }, false);
        newTroue.addEventListener("click", event => { poser(4); }, false);
        break;
    }
    newTroue.style.top = line + "px";
    newTroue.style.backgroundColor = "#000000";
    newTroue.style.borderRadius = "50px";
    newTroue.style.zIndex = 2;
    backg.appendChild(newTroue);
    troues[(col-70)/96][(line-70)/96] = newTroue;
  }
}

function de_select(col) {
   if (tour != 2) {
    for (let line = 4; line >=0; line--){
      if (troues[col][line].style.backgroundColor == "rgb(254, 203, 0)" || troues[col][line].style.backgroundColor == "rgb(254, 0, 0)") {
        troues[col][line].style.backgroundColor = "rgb(0, 0, 0)";
        break;
      }
    }
  }
}

function select(col) {
 if (tour != 2) {
   for (let line = 4; line >= 0; line--){
     if (troues[col][line].style.backgroundColor == "rgb(0, 0, 0)") {
       if (tour == 0) {
         troues[col][line].style.backgroundColor = "rgb(254, 203, 0)";
       } else {
         troues[col][line].style.backgroundColor = "rgb(254, 0 ,0)";
       }
       break;
     }
   }
 }
}

function poser(col) {
   if (tour != 2) {
    for (let line = 4; line >=0; line--){
      if (troues[col][line].style.backgroundColor == "rgb(254, 203, 0)") {
        troues[col][line].style.backgroundColor = "rgb(255, 203, 0)";
        if (nbrPlayer == 2) {
          tour = 1;
        } else {
          tour = 2;
          botPlay();
        }
        break;
      } else if (troues[col][line].style.backgroundColor == "rgb(254, 0, 0)") {
        troues[col][line].style.backgroundColor = "rgb(255, 0, 0)";
        tour = 0;
        break;
      }
    }
  }
  verifFin();
}

function botPlay() {
  let search = true;
  for (let col = 4; col >= 0; col--) { // Pour chaque colonnes
    for (let line = 4; line >= 0; line--) { // Pour chaque lignes

      if (troues[col][line].style.backgroundColor == "rgb(0, 0, 0)") { // Si le troue est vide

        let pions = 0;
        for (let bcl = clamp(col+1,0,5); bcl <= clamp(col+3,0,4); bcl++) { // vérification à droite
          if (troues[bcl][line].style.backgroundColor == "rgb(255, 203, 0)") pions++;
        }
        if (pions == 3) {
          search = false;
          troues[col][line].style.backgroundColor = "rgb(255, 0, 0)";
          break;
        }

        pions = 0;
        for (let bcl = clamp(col-1,-1,4); bcl >= clamp(col-3,0,4); bcl--) { // vérification à gauche
          if (troues[bcl][line].style.backgroundColor == "rgb(255, 203, 0)") pions++;
        }
        if (pions == 3) {
          search = false;
          troues[col][line].style.backgroundColor = "rgb(255, 0, 0)";
          break;
        }

        pions = 0;
        for (let bcl = clamp(line+1,0,5); bcl <= clamp(line+3,0,4); bcl++) { // vérification à droite
          if (troues[col][bcl].style.backgroundColor == "rgb(255, 203, 0)") pions++;
        }
        if (pions == 3) {
          search = false;
          troues[col][line].style.backgroundColor = "rgb(255, 0, 0)";
          break;
        }

        // vérifier droite 2 + gauche 1
        // vérifier gauche 2 + droite 1
        // Diagonal bas droite 3
        // Diagonal bas gauche 3
        // Diagonal haut gauche 3
        // Diagonal haut droite 3
        // Digonal bas droite 1 haut gauche 2
        // Digonal bas droite 2 haut gauche 1
        // Digonal haut droite 1 bas gauche 2
        // Digonal haut droite 2 bas gauche 1

        break;
      }
      if (!search) break;
    }
    if (!search) {
      tour = 0;
      break;
    }
  }
  if (search) botPose();
}


function botPose() {
  let allCol = new Array(5);
  let selectable = [];
  let posCol;
  let posLine;
  let search = true;
  for (let col = 4; col >= 0; col--) { // Pour chaque colonnes
    for (let line = 4; line >= 0; line--) { // Pour chaque lignes

      if (troues[col][line].style.backgroundColor == "rgb(0, 0, 0)") { // Si le troue est vide
        selectable.push(col);
        allCol[col] = line;
        let lastPions = 0;
        let pions = 0;
        for (let bcl = clamp(col+1,0,5); bcl <= clamp(col+3,0,4); bcl++) { // vérification à droite
          if (troues[bcl][line].style.backgroundColor == "rgb(255, 203, 0)") pions++;
        }
        if (pions > lastPions) {
          lastPions = pions;
          posCol = col;
          posLine = line;
        }

        pions = 0;
        for (let bcl = clamp(col-1,-1,4); bcl >= clamp(col-3,0,4); bcl--) { // vérification à gauche
          if (troues[bcl][line].style.backgroundColor == "rgb(255, 203, 0)") pions++;
        }
        if (pions > lastPions) {
          lastPions = pions;
          posCol = col;
          posLine = line;
        }

        pions = 0;
        for (let bcl = clamp(line+1,0,5); bcl <= clamp(line+3,0,4); bcl++) { // vérification à droite
          if (troues[col][bcl].style.backgroundColor == "rgb(255, 203, 0)") pions++;
        }
        if (pions > lastPions) {
          lastPions = pions;
          posCol = col;
          posLine = line;
        }

        break;
      }
      if (!search) break;
    }
    if (!search) break;
  }
  if (search){
    let rndCol = rnd(selectable.length);
    serach = true;
    troues[selectable[rndCol]][allCol[selectable[rndCol]]].style.backgroundColor = "rgb(255, 0, 0)";
    tour = 0;
  }
}

function clamp(val,min,max) {
  return Math.max(min,Math.min(max,val));
}

function rnd(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function verifFin() {
 // idem que le bot
}
