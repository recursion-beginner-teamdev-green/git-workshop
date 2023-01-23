function grid(){
	let grid = document.getElementById("grid");
	for (let y = 0; y < 20; y++){
		for (let x = 0; x < 10; x++){
			let block = document.createElement("div");
			block.setAttribute("id", y+","+x);
			block.classList.add("block", "border", "border-secondary");
			grid.append(block);
		}
	}
	let nextBlock = document.getElementById("next-block");
	for (let y = 0; y < 4; y++){
		for (let x = 0; x < 4; x++){
			let block = document.createElement("div");
			block.setAttribute("id", y+","+x);
			block.classList.add("block");
			nextBlock.append(block);
		}
	}
}

grid();
