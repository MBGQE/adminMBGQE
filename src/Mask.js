import React from 'react';

export const phoneMask = value => {
    return value
        .replace(/\D/g, '') //substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{1})(\d)/, '($1$2)') //captura 2 grupos de numeros e coloca () entre eles
        .replace(/(\d{5})(\d{1,2})/, '$1-$2') //captura a sequencia dos 5 numeros e coloca -
        .replace(/(-\d{4})\d+?$/, '$1') //captura os 4 ultimos digitos e nao deixa ser digitado mais nada
}

export const phoneSCMask = value => {
    return value
        .replace(/\D/g, '') //substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{1})(\d)/, '($1$2)') //captura 2 grupos de numeros e coloca () entre eles
        .replace(/(\d{4})(\d{1,2})/, '$1-$2') //captura a sequencia dos 4 numeros e coloca -
        .replace(/(-\d{4})\d+?$/, '$1') //captura os 4 ultimos digitos e nao deixa ser digitado mais nada
}

export const cepMask = value => {
    return value
        .replace(/\D/g, '') //substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{5})(\d{1,2})/, '$1-$2') //captura a sequencia dos 4 numeros e coloca -
        .replace(/(-\d{3})\d+?$/, '$1') //captura os 4 ultimos digitos e nao deixa ser digitado mais nada
}

export const cpfMask = value => {
    return value
        .replace(/\D/g, '') //substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') //captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') //captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}