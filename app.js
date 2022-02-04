const numberButtons = document.querySelectorAll(".numbers button");
const calcWindow = document.querySelector(".calc-window");
const line1 = document.querySelector("#line1");
const inputline = document.querySelector(".input-line")
const outputline = document.querySelector(".output-line")
const buttons = document.querySelectorAll("button");
const line = document.querySelectorAll(".line");

let ans = 0
buttons.forEach(button => {button.addEventListener('click', () => {
    console.log(button.textContent);
    addToOutput(button.textContent);
    }); 
});

function addToOutput(input) {
    if (input == "=") {
        calc(inputline.textContent);
    }   else if (input == "Clear") {
            inputline.textContent = '';
    }   else if (input == "Clear All") {
            inputline.textContent = '';
            ans = 0;
            for (let i = 5; i > 0; i--) {
                line[i].children[0].textContent = ""
                line[i].children[1].textContent = ""}
    }   else if (input == "ans") {
            inputline.textContent += 'ans';
    }   else if ((input == "+" || input == "-" || input == "x" || input == "/" || input == "^" || input == "mod") && (line[0].children[0].firstChild == null)) {
            inputline.textContent += `ans ${input} `;
    }   else if ((input == "+" || input == "-" || input == "x" || input == "/" || input == "^" || input == "mod")) {
            inputline.textContent += ` ${input} `;
    }   else if (input == "(-)") {
            inputline.textContent += `-`;
    }   else {inputline.textContent += `${input}`};
}

function parseNumsAndOps(input){
    input = input.replace("ans", ans)
    input = input.replace(/\s/g, "");
    console.log(input);
    let regex = /(-?\d*\.?\d+)|mod|./g;
    newArr = input.match(regex);
    for (let i = 0; i < newArr.length-1 ; i++) {
        if ((parseFloat(newArr[i]) && parseFloat(newArr[i+1])) ||
            newArr[i] == ")" && parseFloat(newArr[i+1])) {
            newArr.splice(i+1, 0, "+");
            newArr.join();
        };
    }
    return newArr;
}

function parSearch (array) {
    par1 = 0;
    par2 = 0;
    for (let i = 0; i < array.length ; i++) {
        
        if (array[i] == "(") {
            par1 = i;
        };
        if (array[i] == ")") {
            par2 = i;
            break;
        };
    }
    parIndex = [par1, par2];
    parExp = array.slice(par1, par2+1);
    return {parExp, parIndex};
}

function operations(array) {
    console.log(array);
    let math = {
        "+": function(x, y) {return parseFloat(x) + parseFloat(y)},
        "-": function(x, y) {return x - y},
        "x": function(x, y) {return x * y},
        "/": function(x, y) {return x / y},
        "^": function(x, y) {return Math.pow(x, y)},
        "mod": function(x,y) {return x % y}        
    };
    if (array.includes("^")) {
        num = math["^"](array[array.indexOf("^")-1], array[array.indexOf("^")+1]);
        array.splice(array.indexOf("^")-1, 3, num);
        operations(array);
    };
    if (array.includes("mod")) {
        num = math["mod"](array[array.indexOf("mod")-1], array[array.indexOf("mod")+1]);
        array.splice(array.indexOf("mod")-1, 3, num);
        operations(array);
    };
    if (array.includes("/")) {
        num = math["/"](array[array.indexOf("/")-1], array[array.indexOf("/")+1]);
        array.splice(array.indexOf("/")-1, 3, num);
        operations(array);
    };
    if (array.includes("x")) {
        num = math["x"](array[array.indexOf("x")-1], array[array.indexOf("x")+1]);
        array.splice(array.indexOf("x")-1, 3, num);
        operations(array);
    };
    if (array.includes("+")) {
        num = math["+"](array[array.indexOf("+")-1], array[array.indexOf("+")+1]);
        array.splice(array.indexOf("+")-1, 3, num);
        operations(array);
    };
    return array;
}

function calc(input) {
    expr = parseNumsAndOps(input);

    while (expr.includes("(")) {
        parExp = parSearch(expr).parExp;
        parIndex = parSearch(expr).parIndex;
        parInitExp = parExp.length;
        parEval = operations(parExp);
        expr.splice(parIndex[0], parInitExp, parEval[1]);
    } 

    operations(expr);
    outputline.textContent = expr;
    ans = expr;
    changeTextContent();
    return ans;
}

function changeTextContent() {
    for (let i = 5; i > 0; i--) {
        line[i].children[0].textContent = line[i-1].children[0].textContent
        line[i].children[1].textContent = line[i-1].children[1].textContent
    }
    inputline.textContent = '';
    outputline.textContent = '';
}

