let display = document.querySelector('#panel h1');
let num1 = '';
let num2 = '';
let currentOperation = '';
let num2Waiting = false;

fetch('https://calculator-api.onrender.com/api/calculator/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ num1: 1, num2: 1, operation: '+' })
}).catch(() => {});

//Buttons

document.querySelectorAll('#num_panel button').forEach(btn => {
    btn.addEventListener('click', () => {
        if (num2Waiting) {
            num2 += btn.textContent;
            display.textContent = num2;
        } else {
            num1 += btn.textContent;
            display.textContent = num1;
        }
    }

    )
});

//Operation buttons

document.querySelectorAll('#operation_panel button:not(#result)').forEach(btn => {
    btn.addEventListener('click', () => {
        currentOperation = btn.textContent;
        display.textContent = display.textContent + btn.textContent ;
        num2Waiting = true;
    });
})

//Result button

document.querySelector('#result').addEventListener('click', async () => {
    
    if(!num1 || !num2 || !currentOperation) return;

    display.textContent = "Loading...";

    try{

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000)

    const response = await fetch('calculator-production-4150.up.railway.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            num1: parseFloat(num1),
            num2: parseFloat(num2),
            operation: currentOperation
        }),
        signal: controller.signal
    });

    clearTimeout(timeout);

    if(!response.ok){
        throw new Error("API error");
    }

    const result = await response.text();
    display.textContent = result;

    //Next operation
    num1 = String(result);
    num2 = '';
    currentOperation = '';
    num2Waiting = false;

}catch(error){
    console.log(error);
    display.textContent = "Erro";

}

})

//Clear all values

document.querySelector('#clear_all').addEventListener('click', () => {
    num1 = '';
    num2 = '';
    currentOperation = '';
    num2Waiting = false;
    display.textContent = 0;
}
);

//Clear unit

document.querySelector("#clear_unit").addEventListener('click', () => {
    if (num2Waiting) {
        num2 = num2.slice(0, -1);
        display.textContent = num2 || '0';
    } else {
        num1 = num1.slice(0, -1);
        display.textContent = num1 || '0';
    }
}
);