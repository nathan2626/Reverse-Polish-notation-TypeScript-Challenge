// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import isBinaryOperator from "./index";

// Étend les assertions de Jest avec des matchers personnalisés.
expect.extend(matchers);

// Teste si la fonction isBinaryOperator identifie correctement un opérateur binaire.
test("isBinaryOperator doit retourner vrai pour '+'", () => {
    expect(isBinaryOperator("+")).toEqual(true);
});

test("isBinaryOperator doit retourner faux pour un nombre", () => {
    expect(isBinaryOperator("10")).toEqual(false);
});
