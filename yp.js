<!DOCTYPE html>

	<html>
		<head>
			<meta charset="UTF-8">
			<title>HTML lesson 1- 9 LINES OF EVERY HTML PAGE</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Audiowide">
			
		</head>
		
		<body>
		<canvas id="myCanvas"></canvas>
            <script>
                //Create a canvas
const canvas = document.getElementById("myCanvas");
canvas.height = innerHeight;
canvas.width = innerWidth;
//Create a context for the canvas
const context = canvas.getContext("2d");


//Create a class for our player
//What is a class???
class Sprite{
    constructor(position, radius, color){
        this.position = position;
        this.radius = radius;
        this.color = color;
    }
   
   
    //Create a function to draw our shapes
    draw(){

        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 
                    0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    }

    update(){
        this.draw();
    }
}


class Projectile extends Sprite{
    
    constructor(position, radius, color, speed){
        super(position, radius, color);
        this.speed = speed;
    }

    update(){
        this.draw();
        this.position.x = (this.position.x + this.speed.x);
        this.position.y = (this.position.y + this.speed.y);
    }
    
     
}


//Create variables to keep track of different information
const playerX = canvas.width/2;
const playerY = canvas.height/2;
const playerRadius = 50;

//We instantiate a player variable using our Sprite class
//What does instantiate mean??
const player = new Sprite({x: playerX, y: playerY}, playerRadius, "blue");

const hearts = [];

healthBarX = 500;


const projectiles = [];
const enemies = [];

canvas.addEventListener('mousemove', (e)=> {
    console.log(e.clientX + " " + e.clientY);
}); 

function spawnEnemies(){
    setInterval(()=>{
        const enemyX = Math.random() * canvas.width;
        const enemyY = Math.random() * canvas.height;
        const enemyRadius = 40;

        const angle = Math.atan2(
            playerY - enemyY,
            playerX - enemyX
        )
        const enemySpeed = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Projectile({x: enemyX, y: enemyY}, enemyRadius, "green", enemySpeed));
    }, 5000);
}


canvas.addEventListener('click', (e)=> {
    const angle = Math.atan2(
        e.clientY - playerY,
        e.clientX - playerX
    )

    const speed = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    projectiles.push(new Projectile({x: playerX, y: playerY}, 20, "black", speed));
}); 

spawnEnemies();

    for(var i = 0; i < 10; i++){
        hearts.push(new Sprite({x: healthBarX += 50, y: 50}, 30, "red"));
    }

function animate(){

    context.clearRect(0,0, canvas.width,canvas.height);
    player.draw();

    projectiles.forEach(projectile => {
        projectile.update();
      });
    enemies.forEach((enemy) => {
        enemy.update();
    });

    hearts.forEach((heart) => {
        heart.update();
    });
    
  for(var i =0; i< projectiles.length; i++){
        for(var j = 0; j < enemies.length; j++){
            if(projectiles[i].position.x - projectiles[i].radius >= enemies[j].position.x - enemies[j].radius  && 
                projectiles[i].position.x + projectiles[i].radius <= enemies[j].position.x + enemies[j].radius &&
                projectiles[i].position.y - projectiles[i].radius >= enemies[j].position.y - enemies[j].radius && 
                projectiles[i].position.y - projectiles[i].radius <= enemies[j].position.y + enemies[j].radius){
                enemies.splice(j,1);
                projectiles.splice(i,1);
            }
    }
  }

for(var i = 0; i < enemies.length; i++){

    if(enemies[i].position.x - enemies[i].radius >= player.position.x - player.radius && 
        enemies[i].position.x + enemies[i].radius <= player.position.x + player.radius && 
        enemies[i].position.y - enemies[i].radius >= player.position.y -  player.radius && 
        enemies[i].position.y + enemies[i].radius <= player.position.y + player.radius ){
            
            //this takes the enemy off of the screen
            enemies[i].position.x = -1000;
            enemies[i].position.y = -1000;
            
            
            hearts.splice(0 , 1);
            
            enemies.splice(i , 1);
            console.log(hearts.length);
        
            if(hearts.length == 0){
                alert("GAME OVER");

            }
    }
}

    requestAnimationFrame(animate);

}

animate();

            </script>
		
		</body>
		
	</html>
