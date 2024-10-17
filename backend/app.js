require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Initialize express
const app = express();
app.use(bodyParser.json());

// MySQL Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Define the rule data structure (AST node)
class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type;
        this.left = left;
        this.right = right;
        this.value = value;
    }
}

// Helper function to parse rule strings into AST
const parseRuleString = (ruleString) => {
    // Example parsing logic for a simple rule, you can improve it for complex rules
    let rootNode = new Node('AND');
    rootNode.left = new Node('operand', null, null, { key: 'age', comparison: '>', value: 30 });
    rootNode.right = new Node('operand', null, null, { key: 'salary', comparison: '>', value: 50000 });
    return rootNode;
};

// Helper function to evaluate AST
const evaluateAST = (node, data) => {
    if (!node) return false;

    if (node.type === 'operand') {
        const { key, comparison, value } = node.value;
        switch (comparison) {
            case '>': return data[key] > value;
            case '<': return data[key] < value;
            case '=': return data[key] === value;
            default: return false;
        }
    }

    const leftEval = evaluateAST(node.left, data);
    const rightEval = evaluateAST(node.right, data);

    if (node.type === 'AND') return leftEval && rightEval;
    if (node.type === 'OR') return leftEval || rightEval;
    return false;
};

console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);


// API to create a rule and store it in the database
app.post('/api/rules/create', (req, res) => {
    const ruleString = req.body.ruleString;
    const ast = parseRuleString(ruleString);

    const query = 'INSERT INTO rules (ruleString, ast) VALUES (?, ?)';
    db.query(query, [ruleString, JSON.stringify(ast)], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create rule' });
        }
        res.status(201).json({ message: 'Rule created successfully', ruleId: result.insertId });
    });
});

// API to evaluate a rule based on provided data
app.post('/api/rules/evaluate', (req, res) => {
    const { ruleId, data } = req.body;

    const query = 'SELECT ast FROM rules WHERE id = ?';
    db.query(query, [ruleId], (err, result) => {
        if (err || result.length === 0) {
            return res.status(500).json({ error: 'Rule not found or failed to evaluate' });
        }

        const ruleAst = JSON.parse(result[0].ast);
        const isEligible = evaluateAST(ruleAst, data);

        res.status(200).json({ eligible: isEligible });
    });
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
