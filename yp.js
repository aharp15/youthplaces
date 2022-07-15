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



const projectiles = [];
const enemies = [];

canvas.addEventListener('mousemove', (e)=> {
    console.log(e.clientX + " " + e.clientY);
}); 

function spawnEnemies(){
    setInterval(()=>{
        const enemyX = Math.random() * canvas.width;
        const enemyY = Math.random() * canvas.height;
        const enemyRadius = 30;

        const angle = Math.atan2(
            playerY - enemyY,
            playerX - enemyX
        )
        const enemySpeed = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Projectile({x: enemyX, y: enemyY}, enemyRadius, "blue", enemySpeed));
        console.log("fuck");
    }, 500);
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

    projectiles.push(new Projectile({x: playerX, y: playerY}, 10, "green", speed));
}); 

function animate(){

    requestAnimationFrame(animate);
    context.clearRect(0,0, canvas.width,canvas.height);
    player.draw();
    projectiles.forEach(projectile => {
        projectile.update();
      });
    enemies.forEach((enemy) => {
        enemy.update();
    })
    

}

animate();
spawnEnemies();
