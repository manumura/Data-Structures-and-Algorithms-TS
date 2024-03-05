export default class NumberOfIslands {

    // https://myinterview.guru/leetcode-200-number-of-islands-63b59ffa547f
    constructor() {
        console.log('NumberOfIslands');
    }

    private directions: Point[] = [
        new Point(0, 1), // right
        new Point(1, 0), // down
        new Point(0, -1), // left
        new Point(-1, 0) // up
    ];

    private walk(grid: string[][], current: Point, visited: boolean[][]): number {
        // console.log('current', current);
        if (current.x < 0 || current.x >= grid.length || current.y < 0 || current.y >= grid[0].length) {
            return 0;
        }

        if (visited[current.x][current.y]) {
            return 0;
        }

        if (grid[current.x][current.y] === '0') {
            return 0;
        }

        // pre
        visited[current.x][current.y] = true;

        // recurse
        for (const direction of this.directions) {
            const next = new Point(current.x + direction.x, current.y + direction.y);
            this.walk(grid, next, visited);
        }

        // post
        return 1;
    }

    public solve(maze: string[][]): number {
        const visited: boolean[][] = [];
        for (let i = 0; i < maze.length; i++) {
            // visited.push([]);
            visited[i] = [];
            for (let j = 0; j < maze[i].length; j++) {
                // visited[i].push(false);
                visited[i][j] = false;
            }
        }

        let numberOfIslands = 0;
        for (let i = 0; i < maze.length; i++) {
            for (let j = 0; j < maze[i].length; j++) {
                const current = new Point(i, j);
                numberOfIslands += this.walk(maze, current, visited);
            }
        }

        return numberOfIslands;
    }
}

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

// npx tsx Algorithms/Recursion/NumberOfIslands
function main() {
    const numberOfIslands = new NumberOfIslands();
    const grid1 = [
        ["1","1","1","1","0"],
        ["1","1","0","1","0"],
        ["1","1","0","0","0"],
        ["0","0","0","0","0"]
    ];
    console.log(numberOfIslands.solve(grid1)); // 1

    const grid2 = [
        ["1","1","0","0","0"],
        ["1","1","0","0","0"],
        ["0","0","1","0","0"],
        ["0","0","0","1","1"]
    ];
    console.log(numberOfIslands.solve(grid2)); // 3

    const grid3 = [
        ["1","0","0","1","1"],
        ["0","1","0","0","1"],
        ["1","0","0","1","0"],
        ["1","1","0","0","1"]
    ];
    console.log(numberOfIslands.solve(grid3)); // 6
}

main();
