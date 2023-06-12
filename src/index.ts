// Définition des types pour les opérateurs binaires.
type BinaryOperator = '+' | '-' | '*' | '/' | 'MOD';
// Définition des types pour les opérateurs unaires.
type UnaryOperator = 'NEGATE';

// Fonction pour vérifier si un token est un opérateur binaire.
const isBinaryOperator = (token: string): token is BinaryOperator => {
    return ['+', '-', '*', '/', 'MOD'].includes(token);
};

// Fonction pour vérifier si un token est un opérateur unaire.
const isUnaryOperator = (token: string): token is UnaryOperator => {
    return ['NEGATE'].includes(token);
};

// Fonction pour effectuer une opération binaire sur deux nombres.
const performBinaryOperation = (operator: BinaryOperator, a: number, b: number): number => {
    switch (operator) {
        case '+':
            return b + a;
        case '-':
            return b - a;
        case '*':
            return b * a;
        case '/':
            // Gestion du cas de division par zéro.
            if (a === 0) {
                throw new Error("Division par zéro");
            }
            return b / a;
        case 'MOD':
            return b % a;
    }
};

// Fonction pour effectuer une opération unaire sur un nombre.
const performUnaryOperation = (operator: UnaryOperator, a: number): number => {
    switch (operator) {
        case 'NEGATE':
            return -a;
    }
};

// Fonction principale pour évaluer une expression en notation polonaise inversée.
const rpn = (expression: string): number => {
    // Division de l'expression en tokens.
    const tokens = expression.split(' ');
    // Utilisation d'une pile pour stocker les nombres en attente.
    const stack: number[] = [];

    // Parcours de chaque token de l'expression.
    for (const token of tokens) {
        const num = parseFloat(token);

        // Si le token est un nombre, on le pousse dans la pile.
        if (!isNaN(num)) {
            stack.push(num);
        } else if (isBinaryOperator(token)) {
            // Si le token est un opérateur binaire, on vérifie qu'il y a au moins deux éléments dans la pile.
            if (stack.length < 2) {
                throw new Error("Expression invalide");
            }
            const a = stack.pop() as number;
            const b = stack.pop() as number;
            stack.push(performBinaryOperation(token, a, b));
        } else if (isUnaryOperator(token)) {
            // Si le token est un opérateur unaire, on vérifie qu'il y a au moins un élément dans la pile.
            if (stack.length < 1) {
                throw new Error("Expression invalide");
            }
            const a = stack.pop() as number;
            stack.push(performUnaryOperation(token, a));
        } else {
            // Si le token n'est ni un nombre, ni un opérateur binaire, ni un opérateur unaire, on lance une erreur.
            throw new Error("Token invalide");
        }
    }

    // Si la pile ne contient pas exactement un élément, l'expression est invalide.
    if (stack.length !== 1) {
        throw new Error("Expression invalide");
    }

    // Retourne le résultat final.
    return stack.pop() as number;
};

export default rpn;
