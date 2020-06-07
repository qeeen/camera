var cam;
var length;
var found;

function setup() {
	createCanvas(1600, 1000);
	cam = createCapture(VIDEO);
	cam.size(1600, 1000);
	cam.hide();

	length = 40;
	found = [];
	for(let i = 0; i < cam.width/length; i++){
		found[i] = [];
	}
}

function draw() {
	background(0);
	let img = cam.get(0, 0, cam.width, cam.height);

	if (cam.loadedmetadata) {
		img.loadPixels();
		for (let i = 0; i < img.width; i += length) {
			for (let k = 0; k < img.height; k += length) {
				curpix = (i + k * img.width) * 4;

				let r = img.pixels[curpix];
				let g = img.pixels[curpix + 1];
				let b = img.pixels[curpix + 2];

				fill(r, g, b);

				let greyscale = (r + g + b) / 3;

				stroke(10);
				rect(i, k, length, length);

				if
				(greyscale > 130 && b > 40 && i > img.width / 3 && 
				i < img.width * (2 / 3) && k > img.height / 3 && k < img.height * (2 / 3)) {
					fill(255, 0, 0);
					noStroke();
					rect(i, k, length, length);
					
					found[i/length][k/length] = 1;
				}
				else
					found[i/length][k/length] = 0;
			}
		}
		for(let i = 0; i < found.length; i++){
			for(let k = 0; k < found[0].length; k++){
				if(!found[i][k])
					continue;
				let req = 9;
				let amount = 1;
				
				if(i != 0)
					if(found[i-1][k])
						amount++;
				if(i != 0 && k != 0)
					if(found[i-1][k-1])
						amount++;
				if(k != 0)
					if(found[i][k-1])
						amount++;
				if(i < found.length && k != 0)
					if(found[i+1][k-1])
						amount++;
				if(i < found.length)
					if(found[i+1][k])
						amount++;
				if(i < found.length && k < found[0].length)
					if(found[i+1][k+1])
						amount++;
				if(k < found[0].length)
					if(found[i][k+1])
						amount++;
				if(i != 0 && k < found[0].length)
					if(found[i-1][k+1])
						amount++;

				if(amount == req){
					for(let j = i-1; j < i+1; j++){
						for(let m = k-1; m < k+1; m++){
							found[j][m] = 2;
						}
					}
				}
			}
		}
		for(let i = 0; i < found.length; i++){
			for(let k = 0; k < found[0].length; k++){
				if(found[i][k] != 2)
					continue;
				fill(0, 255, 0);
				rect(i*length, k*length, length, length);
			}
		}
	}
}

function keyPressed(){
	if(keyCode === RIGHT_ARROW){
		console.log(found);
	}
}














