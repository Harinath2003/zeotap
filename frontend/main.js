document.getElementById('createRuleBtn').addEventListener('click', () => {
    const ruleString = document.getElementById('ruleInput').value;

    fetch('http://localhost:3000/api/rules/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruleString }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('createRuleResponse').innerText = JSON.stringify(data);
    })
    .catch(error => {
        document.getElementById('createRuleResponse').innerText = 'Error: ' + error;
    });
});

document.getElementById('evaluateRuleBtn').addEventListener('click', () => {
    const ruleId = document.getElementById('ruleIdInput').value;
    const dataInput = document.getElementById('dataInput').value;

    let data;
    try {
        data = JSON.parse(dataInput);
    } catch (e) {
        document.getElementById('evaluateRuleResponse').innerText = 'Invalid JSON format in data input.';
        return;
    }

    fetch('http://localhost:3000/api/rules/evaluate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruleId, data }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('evaluateRuleResponse').innerText = JSON.stringify(data);
    })
    .catch(error => {
        document.getElementById('evaluateRuleResponse').innerText = 'Error: ' + error;
    });
});
