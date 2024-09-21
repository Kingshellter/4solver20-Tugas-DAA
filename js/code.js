function solve() {
    const nums = [1, 2, 3, 4].map(i => parseInt(document.getElementById(`num${i}`).value));
    const operators = ["+", "-", "*", "/"];
    const target = 20;
    let solutions = [];

    function generateExpressions(nums, ops) {
        const patterns = [
            "((a b) c) d", "(a b) (c d)", "a ((b c) d)", "a (b (c d))",
            "(a (b c)) d", "a (b c) d", "(a b c) d", "a b c d"
        ];

        return patterns.flatMap(pattern => 
            ops.flatMap(op1 => ops.flatMap(op2 => ops.map(op3 => {
                const expr = pattern
                    .replace("a", nums[0]).replace("b", nums[1])
                    .replace("c", nums[2]).replace("d", nums[3])
                    .replace(" ", op1).replace(" ", op2).replace(" ", op3);
                return expr;
            })))
        );
    }

    function permute(arr) {
        if (arr.length <= 1) return [arr];
        return arr.flatMap((v, i) => 
            permute(arr.slice(0, i).concat(arr.slice(i + 1)))
                .map(p => [v].concat(p))
        );
    }

    permute(nums).forEach(numPerm => {
        generateExpressions(numPerm, operators).forEach(expr => {
            try {
                if (Math.abs(eval(expr) - target) < 1e-10) {
                    solutions.push(expr);
                }
            } catch (e) {
            }
        });
    });

    document.getElementById("result").innerHTML = solutions.length > 0
        ? solutions.map((sol, i) => `${i + 1}. ${sol} = ${target}`).join('<br>')
        : "Ini Gak Mungkin";
}