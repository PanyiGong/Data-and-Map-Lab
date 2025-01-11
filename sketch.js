let car = []
let lowestCar = Infinity
let highestCar = -Infinity
let avgHighCar = 0
let avgLowCar = 0

function setup() {
  createCanvas(600, 600);
  for( let i = 0; i < 12; i++ ) {
    //These lines create fake temperature data using
    //   fancy math. You could just use random and a 
    //   given range if you like. 
    let h = randomGaussian(50, 12)
    let l = randomGaussian(20, 7)
    
    // it is possible for the low to be greater than
    //   the high. This flips it.
    if( h < l ) {
      let car = h
      h = l
      l = car
    }
    
    if( h > highestCar ) {
      highestCar = h
    }
    
    if( l < lowestCar ) {
      lowestCar = l
    }
    
    avgHighCar += h
    avgLowCar += l
    
    car.push({h,l})
  }
  avgHighCar /= car.length
  avgLowCar /= car.length
}

function draw() {
  

  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(
    "Number of Cars parked on New York City streets, in millions",
    width / 2,
    50
  );
  
  let dx = width/(car.length+2)
  // line(0,height/2,width,height/2)
  for( let i = 0; i < car.length; i++ ) {
    
    stroke("red")
    const yAvgHigh = map(avgHighCar,lowestCar,highestCar,0.3*height,0.7*height)
    line(0,yAvgHigh, width,yAvgHigh)
    const yAvgLow = map(avgLowCar,lowestCar,highestCar,0.3*height,0.7*height)
    stroke("blue")
    line(0,yAvgLow, width,yAvgLow)
    const x = (i+1)*dx
    const yHigh = map(car[i].h,lowestCar,highestCar,0.3*height,0.7*height)
    const yLow = map(car[i].l,lowestCar,highestCar,0.3*height,0.7*height)
    stroke("black")
    line(x,yHigh,x,yLow)
    noStroke()
    fill("black")
    if( car[i].h === highestCar ) {
      text(int(car[i].h),x,yHigh-10)
    }
    fill("red")
    circle(x,yHigh,10)
    fill("black")
    if( car[i].l === lowestCar ) {
      text(int(car[i].l),x,yLow+15)
    }    
    fill("blue")
    circle(x,yLow,10)
  }
  
  
}
