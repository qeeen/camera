var cam;

function setup(){
	createCanvas(768, 768);
	cam = createCapture(VIDEO);
	cam.size(768, 768);
	cam.hide();
}

function draw(){
	background(0);
	let img = cam.get(0, 0, cam.width, cam.height);
	if(cam.loadedmetadata){
		img.loadPixels();
		for(let i = 0; i < img.width; i += 20){
			for(let k = 0; k < img.height; k += 20){
				curpix = (i + k*img.width)*4;
				fill(img.pixels[curpix], img.pixels[curpix+1], img.pixels[curpix+2]);
				rect(i, k, 20, 20);
			}
		}
	}
}
