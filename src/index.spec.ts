// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import rpn from "./index";

// Étend les assertions de Jest avec des matchers personnalisés.
expect.extend(matchers);

// Teste une soustraction basique avec l'opérateur binaire '-'.
test("RPN: 10 3 2 - - doit retourner 9", () => {
    expect(rpn("10 3 2 - -")).toEqual(9);
});

// Teste une soustraction avec deux opérateurs binaires '-'.
test("RPN: 10 3 - 2 - doit retourner 5", () => {
    expect(rpn("10 3 - 2 -")).toEqual(5);
});

// Teste l'utilisation de l'opérateur 'MOD' pour calculer le modulo.
test("RPN: 4 3 MOD doit retourner 1", () => {
    expect(rpn("4 3 MOD")).toEqual(1);
});

// Teste l'utilisation de l'opérateur unaire 'NEGATE'.
test("RPN: 1 NEGATE doit retourner -1", () => {
    expect(rpn("1 NEGATE")).toEqual(-1);
});

// Teste le cas où une division par zéro se produit.
test("RPN: Division par zéro doit lancer une exception", () => {
    expect(() => rpn("1 0 /")).toThrowError("Division par zéro");
});

// Teste une expression invalide contenant trop peu d'opérandes.
test("RPN: Expression invalide doit lancer une exception", () => {
    expect(() => rpn("1 +")).toThrowError("Expression invalide");
});

// Teste une expression avec l'opérateur de multiplication.
test("RPN: 3 4 * doit retourner 12", () => {
    expect(rpn("3 4 *")).toEqual(12);
});

// Teste une expression avec un nombre négatif.
test("RPN: 3 -4 + doit retourner -1", () => {
    expect(rpn("3 -4 +")).toEqual(-1);
});

// Teste une expression plus complexe.
test("RPN: 5 1 2 + 4 * + 3 - doit retourner 14", () => {
    expect(rpn("5 1 2 + 4 * + 3 -")).toEqual(14);
});

// Teste une expression invalide avec trop d'opérateurs.
test("RPN: 1 2 + + doit lancer une exception", () => {
    expect(() => rpn("1 2 + +")).toThrowError("Expression invalide");
});

// Teste une expression invalide avec un token inconnu.
test("RPN: 1 2 & doit lancer une exception", () => {
    expect(() => rpn("1 2 &")).toThrowError("Token invalide");
});

// Teste une expression avec un opérateur unaire et binaire mélangés.
test("RPN: 3 4 NEGATE * doit retourner -12", () => {
    expect(rpn("3 4 NEGATE *")).toEqual(-12);
});
