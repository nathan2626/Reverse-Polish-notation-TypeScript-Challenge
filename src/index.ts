// Type pour représenter les opérateurs binaires possibles
type BinaryOperator = '+' | '-' | '*' | '/' | 'MOD';


const isBinaryOperator = (token: string): token is BinaryOperator => {
    // Liste des opérateurs binaires valides
    const validOperators = ['+', '-', '*', '/', 'MOD'];
    
    // Vérifie si le token est dans la liste des opérateurs binaires valides
    return validOperators.includes(token);
};

// Exporte la fonction pour qu'elle puisse être utilisée dans d'autres fichiers
export default isBinaryOperator;
