export default class PathFinding {

    constructor() {
        console.log('PathFinding');
    }

    private directions: Point[] = [
        new Point(0, 1), // right
        new Point(1, 0), // down
        new Point(0, -1), // left
        new Point(-1, 0) // up
    ];

    private walk(maze: string[][], current: Point, end: Point, wall: string, visited: boolean[][], path: Point[]): boolean {
        if (current.x < 0 || current.x >= maze.length || current.y < 0 || current.y >= maze[0].length) {
            return false;
        }

        if (visited[current.x][current.y]) {
            return false;
        }

        if (maze[current.x][current.y] === wall) {
            return false;
        }

         // pre
         path.push(current);
         visited[current.x][current.y] = true;

         if (current.x === end.x && current.y === end.y) {
            return true;
        }

        // recurse
        for (const direction of this.directions) {
            const next = new Point(current.x + direction.x, current.y + direction.y);
            if (this.walk(maze, next, end, wall, visited, path)) {
                return true;
            }
        }

        // post
        path.pop();
        return false;
    }

    public solve(maze: string[][], start: Point, end: Point, wall: string): Point[] {
        const path: Point[] = [];
        const visited: boolean[][] = [];
        for (let i = 0; i < maze.length; i++) {
            // visited.push([]);
            visited[i] = [];
            for (let j = 0; j < maze[i].length; j++) {
                // visited[i].push(false);
                visited[i][j] = false;
            }
        }

        this.walk(maze, start, end, wall, visited, path);
        return path;
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

// npx tsx Algorithms/Recursion/PathFinding
function main() {
    const pathFinding = new PathFinding();
    const maze = [
        ['S', '#', '#', '#', '#'],
        ['0', '0', '0', '#', '#'],
        ['0', '#', '0', '0', '#'],
        ['0', '0', '#', '0', '#'],
        ['#', '0', '#', '0', 'E']
    ];
    const start = new Point(0, 0);
    const end = new Point(4, 4);
    const wall = '#';

    console.log(pathFinding.solve(maze, start, end, wall));
}

main();
