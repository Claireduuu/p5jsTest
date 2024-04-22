

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  rect (50, 100, 100, 100);
  
  let dia1;
  let pos1;
  let pos2;
  
  
  if(mouseX>50 &&
    mouseX<150 &&
    mouseY>100 &&
    mouseY<200){
     dia1 = 20;
     }else{dia1 =40;}
  
   if(mouseX>100 &&
    mouseX<200 &&
    mouseY>150 &&
    mouseY<175){
     pos1 = 220;
     }else{pos1 =50;}

    
   if(mouseX>150 &&
    mouseX<200 &&
    mouseY>50 &&
    mouseY<75){
     pos2 = 220;
     }else{pos2 =140;}
  
  circle (pos1, pos2, dia1);
  
  console.log([mouseX, mouseY]);
}