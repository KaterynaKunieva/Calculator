const btns = document.querySelector('.btns');
const result = document.querySelector('.result');
const textarea = document.createElement('textarea'); 
textarea.classList.add('result-textarea'); 
textarea.setAttribute('readonly', 'true'); 
result.appendChild(textarea); 

function createModules() {
    const nums = document.createElement('div'); 
    const signs = document.createElement('div')
    nums.classList.add('nums'); 
    signs.classList.add('signs'); 
}
function printOperations(value, separator="") {
    textarea.innerHTML += `${separator}${value}${separator}`; 
}
function deleteOperations() {
    textarea.innerHTML = ''; 
}
function add(first, second) {
    return Number(first) + Number(second); 
}
function subtract(first, second) {
    return Number(first) - Number(second); 
}
function multiply(first, second) {
    return Number(first) * Number(second); 
}
function divide(first, second) {
    return Number(first) / Number(second); 
}
function selectOperation(first, sign, second) {
    let subtotal; 
    if(isNaN(first) && isNaN(second)) {
        alert('Expression was entered incorrectly. Fix it or rewrite.'); 
    }else if (sign === '+') {
        subtotal = add(first, second);
    }else if(sign === '−') {
        subtotal = subtract(first, second);
    } /* else if(sign === '×') {
        subtotal = multiply(first, second);
    }else if(sign === '÷') {
        subtotal = divide(first, second);
    } */
    return subtotal; 
}
function getResults() {
    let additions = textarea.textContent.trim().split(" "); 
    additions.pop();
    // For multiplying and dividing (new part)
    for (let i = 0; i < additions.length; i++) {
        if (additions[i] === '×') {
            additions[i - 1] = multiply(additions[i - 1], additions[i + 1]);
            additions.splice(i, i+1)
        }
        else if(additions[i] === '÷') {
            additions[i-1] = divide(additions[i - 1], additions[i + 1]);
            additions.splice(i, i+1)
        }
    }
    // For adding and subtracting (old part)
    while (additions.length > 1) {
        additions[0] = selectOperation(additions[0], additions[1], additions[2])
        additions.splice(1, 2); 
    }
    return additions; 
}
function createNums() {
    for (let i = 0; i < 10; i++) {
        const btn = document.createElement('div')
        btn.classList.add('btn'); 
        btn.classList.add('num'); 
        btn.innerText = i; 
        btn.addEventListener('click', e => {
            printOperations(e.target.textContent)
        })
        btns.appendChild(btn); 
    }   
    const signs = ['&#43', '&#8722', '&#215', '&#247']; 
    for (let i = 0; i < signs.length; i++) {
        const btn = document.createElement('div')
        btn.classList.add('btn'); 
        btn.classList.add('sign'); 
        btn.innerHTML = `${signs[i]}`; 
        btn.addEventListener('click', e => {
            printOperations(e.target.textContent, " "); 
        })
        btns.appendChild(btn);         
    }
    let btn = document.createElement('div')
    btn.classList.add('btn'); 
    btn.classList.add('sign'); 
    btn.classList.add('equal'); 
    btn.innerHTML = `&#61`; 
    btn.addEventListener('click', e => {
        printOperations(e.target.textContent, " ")
        printOperations(getResults()); 
    })
    btns.appendChild(btn); 
    btn = document.createElement('div')
    btn.classList.add('btn'); 
    btn.classList.add('sign'); 
    btn.classList.add('del'); 
    btn.innerHTML = `C`; 
    btn.addEventListener('click', e => {
        deleteOperations(); 
    })
    btns.appendChild(btn);       
}

createModules(); 
createNums(); 