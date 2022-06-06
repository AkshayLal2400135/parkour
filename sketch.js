  var gameState="play"
  var rows=0
  function preload(){
    bgImg=loadImage("bg1.jpg")
    fbImg=loadImage("fireblock.jpg")
    stoneImg=loadImage("stoneblock.png")
    playerImg=loadImage("player.png")
    bgpImg=loadImage("bgp.jpg")
  }
function setup() {
  createCanvas(windowWidth,windowHeight);

  blocksGroup=new Group()
  fireBlocksGroup=new Group()
  player=createSprite (width/2,height-200,50,50)
  player.depth=2
  player.addImage(playerImg)
  player.scale=0.2



}

function draw() {
  
  if (rows<15) {
    background(bgImg);
  } else {
    background(bgpImg);
  }  
  if(frameCount%60==0){
   createBlockRow() 
   rows=rows+1
  }


  if (keyWentDown("a")&&player.x>width/2-200){
    player.x=player.x-200

  }
  if (keyWentDown("d")&&player.x<width/2+200){
    player.x=player.x+200

  }

  if (player.isTouching(fireBlocksGroup)){
    gameState="end"
    gameOver()
  }

    if(gameState=="end"){
      blocksGroup.setVelocityYEach(0)
      fireBlocksGroup.setVelocityYEach(0)
    }
    

  drawSprites()
}

  function createBlockRow(){
   
     
    var r=Math.round(random(1,3))
    if (r==1) {
      var fb=createSprite(width/2-200,0,100,100)
      fb.velocityY=2
  
      var b1=createSprite(width/2,0,100,100)
      b1.velocityY=2
  
      var b2=createSprite(width/2+200,0,100,100)
      b2.velocityY=2 
    } else if(r==2) {
      var b1=createSprite(width/2-200,0,100,100)
    b1.velocityY=2

    var fb=createSprite(width/2,0,100,100)
    fb.velocityY=2

    var b2=createSprite(width/2+200,0,100,100)
    b2.velocityY=2
    } else{ 
      var b1=createSprite(width/2-200,0,100,100)
    b1.velocityY=2

    var b2=createSprite(width/2,0,100,100)
    b2.velocityY=2

    var fb=createSprite(width/2+200,0,100,100)
    fb.velocityY=2
      
    }
    fb.addImage(fbImg)
    b1.addImage(stoneImg)
    b2.addImage(stoneImg)
    fb.scale=0.15
    b1.scale=0.4
    b2.scale=0.4
    fb.shapeColor="red"
    fb.lifetime=250
    b1.lifetime=250
    b2.lifetime=250
    fireBlocksGroup.add(fb)
    blocksGroup.add(b1)
    blocksGroup.add(b2)
    fb.depth=1
    b1.depth=1
    b2.depth=1
  }
  function gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
    );
  }