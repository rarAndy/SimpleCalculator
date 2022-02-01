const numberButtons = document.querySelectorAll(".numbers button")
const output = document.querySelector(".output")

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {button.addEventListener('click', () => {
    console.log(button.textContent)
    addToOutput(button.textContent)
})
    
});

function addToOutput(input) {
    if (input == "=") {
        //console.log(output.textContent);
        evaluateOutput(output.textContent);
    }
    else {output.textContent += `${input} `};
}

function multiply (a, b) {
    return a * b
}

function findWholeNumbers (input) {
    input = input.replace(/\s/g, "");
    if (input.includes("+") == true) {
        /* let temp = input.slice(input.indexOf("+")-1,input.indexOf("+")+2);
        let newNum = parseFloat(temp[0]) + parseFloat(temp[2]);
        x = evaluateOutput(input.replace(temp, newNum));
        return x */
        num1=[]
        num2=[]
        operator = input.indexOf("+")
        console.log(operator)
        i = 1
        console.log(input.charAt(operator-i))
        console.log(parseInt(input.charAt(operator-i)))
        while (parseInt(input.charAt(operator-i)) != "NaN") { 
            if (input.indexOf(parseInt(input.charAt(operator-i))) == 0) {return}     
            num1 += input.charAt(operator-i)
            console.log(num1)
            i += 1            
        }
        
    }
        
    
}

function evaluateOutput(input) {
    input = input.replace(/\s/g, ""); // removes whitespace
    
    //locates first parenthesis, returns value without parenthesis and loops
    if (input.includes("(") == true) {
        let temp = input.slice(input.indexOf("(")+1,input.indexOf(")"));
        let temp1 = input.slice(input.indexOf("("),input.indexOf(")")+1);
        let tempOut = evaluateOutput(temp)
        evaluateOutput(input.replace(temp1, tempOut));
        return
        }
    if (input.includes("x") == true) {
        nums = returnNums(input)
        let newExp = `${nums[1]}x${nums[2]}`
        //let temp = input.slice(input.indexOf("x")-1,input.indexOf("x")+2);
        let newNum = nums[1] * nums[2];
        x = evaluateOutput(input.replace(newExp, newNum));
        return x
        }
    if (input.includes("/") == true) {
        let temp = input.slice(input.indexOf("/")-1,input.indexOf("/")+2);
        console.log(temp);
        console.log(temp[0] / temp[2]);
        let newNum = parseFloat(temp[0] / temp[2]);
        Math.round(newNum * 1000000) / 1000000
        console.log(newNum)
        //console.log(input.replace(temp, newNum))
        evaluateOutput(input.replace(temp, newNum));
        return
        }
    if (input.includes("+") == true) {
        let operator = input.indexOf("+");
        i = 1
        num1=[]
        num2=[]
        console.log(input.charAt(operator-i))
        console.log(parseInt(input.charAt(operator-i)))
        while (parseInt(input.charAt(operator-i)) != "NaN") { 
                 
            num1 += input.charAt(operator-i)
            console.log(num1)
            i += 1      
            //if (input.indexOf(parseInt(input.charAt(operator-i))) == 0) {return}      
        }
        let newNum = parseFloat(temp[0]) + parseFloat(temp[2]);
        x = evaluateOutput(input.replace(temp, newNum));
        return x
        }
    if (input.includes("-") == true) {
        let temp = input.slice(input.indexOf("-")-1,input.indexOf("-")+2);
        let newNum = parseFloat(temp[0]) - parseFloat(temp[2]);
        x = evaluateOutput(input.replace(temp, newNum));
        return x
        }
    
    else {
        output.textContent = input;
        console.log("returning", input)
        return input
    }
}



function returnNums(input) {
    let operator = input.indexOf("x");
    let str1 = input.slice(0,operator)
    let str2 = input.slice(operator+1)
    console.log(str2)
    str1 = str1.split("").reverse().join("")
    console.log(str1)

    num1=""
    num2=""
    operators = ["+","-","/","x"]
    for (let i = 0; i < str1.length; i++) {
        console.log(typeof(parseInt(str1.charAt(i))))
        if (isNaN(parseInt(str1.charAt(i))) == false) {
            num1 += str1.charAt(i)
        } else {
            break
        }; 
    }

    num1 = num1.split("").reverse().join("")

    for (let i = 0; i < str2.length; i++) {
        console.log(typeof(parseInt(str2.charAt(i))))
        if (isNaN(parseInt(str2.charAt(i))) == false) {
            num2 += str2.charAt(i)
        } else {
            break
        }; 
    }

    return {num1, num2}
}
