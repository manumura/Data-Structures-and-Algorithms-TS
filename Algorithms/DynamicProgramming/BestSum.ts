export default class BestSum {

    constructor() {
        console.log('BestSum');
    }

    solve(target: number, numbers: number[], memo: any = {}): number[] {
        if (target in memo) {
            return memo[target];
        }
        if (target === 0) {
            return [];
        }
        if (target < 0) {
            return null;
        }

        let shortestCombination: number[] = null;

        for (const number of numbers) {
            const remainder = target - number;
            const remainderResult = this.solve(remainder, numbers, memo);
            if (remainderResult !== null) {
                const combination = [...remainderResult, number];
                // return combination; // return here for the first combination found (howSum)
                if (shortestCombination === null || combination.length < shortestCombination.length) {
                    shortestCombination = combination;
                }
            }
        }

        memo[target] = shortestCombination;
        return shortestCombination;
    }

    solveTab(target: number, numbers: number[]): number[] {
        const table = Array(target + 1).fill(null);
        table[0] = [];

        for (let i = 0; i <= target; i++) {
            if (table[i] !== null) {
                for (const number of numbers) {
                    const combination = [...table[i], number];
                    // table[i + number] = combination;
                    // comment below for the first combination found (howSum)
                    if (!table[i + number] || combination.length < table[i + number].length) {
                        table[i + number] = combination;
                    }
                }
            }

        }

        return table[target];
    }
}

// npx tsx Algorithms/DynamicProgramming/BestSum
function main() {
    const bestSum = new BestSum();

    console.log(bestSum.solve(7, [5, 3, 4, 7])); // [7]
    console.log(bestSum.solve(7, [2, 4])); // null
    console.log(bestSum.solve(7, [2, 3])); // [3, 2, 2]
    console.log(bestSum.solve(8, [2, 3, 5])); // [5, 3]
    console.log(bestSum.solve(8, [1, 4, 5])); // [4, 4]
    console.log(bestSum.solve(100, [1, 2, 5, 25])); // [25, 25, 25, 25]
    console.log(bestSum.solve(100, [25, 1, 2, 5])); // [25, 25, 25, 25]
    console.log(bestSum.solve(300, [7, 14])); // null

    console.log(bestSum.solveTab(7, [5, 3, 4, 7])); // [7]
    console.log(bestSum.solveTab(7, [2, 4])); // null
    console.log(bestSum.solveTab(7, [2, 3])); // [3, 2, 2]
    console.log(bestSum.solveTab(8, [2, 3, 5])); // [5, 3]
    console.log(bestSum.solveTab(8, [1, 4, 5])); // [4, 4]
    console.log(bestSum.solveTab(100, [1, 2, 5, 25])); // [25, 25, 25, 25]
    console.log(bestSum.solveTab(100, [25, 1, 2, 5])); // [25, 25, 25, 25]
    console.log(bestSum.solveTab(300, [7, 14])); // null
}

main();
