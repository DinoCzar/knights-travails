function knightMoves(start, end) {
	// Define the game board size
	const boardSize = 8;

	// Define possible knight moves
	const moves = [
		[2, 1],
		[2, -1],
		[-2, 1],
		[-2, -1],
		[1, 2],
		[1, -2],
		[-1, 2],
		[-1, -2],
	];

	// Create a queue for BFS
	const queue = [];
	queue.push(start);

	// Initialize the visited map and parent map
	const visited = new Map();
	visited.set(start.join(','), true);
	const parent = new Map();
	parent.set(start.join(','), null);

	// Perform BFS
	while (queue.length > 0) {
		const currentSquare = queue.shift();

		if (currentSquare.join(',') === end.join(',')) {
			break;
		}

		const [row, col] = currentSquare;

		// Explore all possible moves from the current square
		for (const move of moves) {
			const [moveRow, moveCol] = move;
			const newRow = row + moveRow;
			const newCol = col + moveCol;
			const key = `${newRow},${newCol}`;

			// Check if the new square is within the board limits and not visited yet
			if (
				newRow >= 0 &&
				newRow < boardSize &&
				newCol >= 0 &&
				newCol < boardSize &&
				!visited.has(key)
			) {
				queue.push([newRow, newCol]);
				visited.set(key, true);
				parent.set(key, currentSquare.join(','));
			}
		}
	}

	// Reconstruct the shortest path
	const shortestPath = [];
	let currentSquare = end.join(',');
	while (currentSquare) {
		shortestPath.push(currentSquare.split(',').map(Number));
		currentSquare = parent.get(currentSquare);
	}

	shortestPath.reverse();

	// Output the shortest path
	const pathLength = shortestPath.length - 1;
	console.log(`You made it in ${pathLength} moves! Here's your path:`);
	for (const square of shortestPath) {
		console.log(square);
	}
}

// Test the knightMoves function
knightMoves([0, 7], [2, 5]);
