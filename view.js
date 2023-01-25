function colorDown(y){
	for (; y >= 0; y--){
		for (let x = 0; x < 10; x++){
			let block = document.getElementById(y+","+x);
			if (block.getAttribute("color") === "true"){
				let color = block.classList[block.classList.length - 1];
				block.classList.remove(color);
				block.classList.add("bg-light");
				block.setAttribute("color", "false");
				let downBlock = document.getElementById((y+1)+","+x);
				downBlock.classList.remove("bg-light");
				downBlock.classList.add(color);
				downBlock.setAttribute("color", "true");
			}
		}
	}
}

function clearLine(y){
	for (let x = 0; x < 10; x++){
		let block = document.getElementById(y+","+x);
		let color = block.classList[block.classList.length - 1];
		block.classList.remove(color);
		block.classList.add("bg-light");
		block.setAttribute("color", "false");
	}
	colorDown(--y);
}

function isColorLine(){
	for (let y = 19; y >= 0; y--){
		for (let x = 0; x < 10; x++){
			let block = document.getElementById(y+","+x);
			if (block.getAttribute("color") === "false")
				break;
			if (x == 9)
				clearLine(y);
		}
	}
}

function changeColor(minBlock){
	let pos = minBlock.y + "," + minBlock.x;
	let block = document.getElementById(pos);
	let color = block.classList[block.classList.length - 1];
	block.classList.remove(color);
	block.classList.add(minBlock.color);
	block.setAttribute("color", "true");
}

function grid(){
	let grid = document.getElementById("grid");
	for (let y = 0; y < 20; y++){
		for (let x = 0; x < 10; x++){
			let block = document.createElement("div");
			block.setAttribute("id", y+","+x);
			block.setAttribute("color", "false");
			block.classList.add("block", "border", "bg-light");
			grid.append(block);
		}
	}
	let nextBlock = document.getElementById("next-block");
	for (let y = 0; y < 4; y++){
		for (let x = 0; x < 4; x++){
			let block = document.createElement("div");
			block.setAttribute("id", y+","+x);
			block.classList.add("block", "border", "bg-light");
			nextBlock.append(block);
		}
	}
}

grid();
