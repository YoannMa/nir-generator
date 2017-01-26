'use strict';

const _ = require('lodash');

const nirRegex = /^([1-4])[\s.\-]?([0-9]{2})[\s.\-]?(0[0-9]|[2-35-9][0-9]|[14][0-2])[\s.\-]?(0[1-9]|[1-8][0-9]|9[0-57-9]|2[ab])[\s.\-]?(00[1-9]|0[1-9][0-9]|[1-8][0-9]{2}|9[0-8][0-9]|990)[\s.\-]?([0-9]{3})[\s.\-]?([0-8][0-9]|9[0-7])$/gi;


const generateFirstPart = () => {
    return [
        _.random(1, 4, false), // gender
        ('0' + _.random(0, 99, false)).slice(-2), // year of birth
        ('0' + _.sample(_.union(_.range(1, 12), [ 62, 63 ]))).slice(-2) // month of birth (could be > 12 too but not generated with that kind of feature)
    ].join('');
};

const generateAType = () => {
    return [
        ('0' + _.sample(_.union(_.range(1, 19), [ 21, 99, '2A', '2B' ]))).slice(-2), // state of birth
        ('00' + _.random(1, 990, false)).slice(-3) // city of birth
    ].join('')
};

const generateBType = () => {
    return [
        _.random(970, 989, false), // state of birth
        ('0' + _.random(1, 90, false)).slice(-2) // city of birth
    ].join('')
};

const generateCType = () => {
    return [
        99, // birth outside france
        ('00' + _.random(1, 990, false)).slice(-3) // country of birth
    ].join('')
};

const generateLastPart = () => {
    return ('00' + _.random(1, 999, false)).slice(-3); // order of birth of the month
};

const generateVerificationKey = string => {
    let number = 0;
    
    if ( string.indexOf('A') !== -1 ) {
        number = parseInt(string.replace('A', '0'));
        number -= 1000000;
    } else if ( string.indexOf('B') !== -1 ) {
        number = parseInt(string.replace('B', '0'));
        number -= 2000000;
    } else {
        number = parseInt(string);
    }
    
    return string + ('0' + (97 - ( ( number ) % 97 ))).slice(-2);
};

const generateNir = () => {
    return _.sample([ generateNirTypeA, generateNirTypeB, generateNirTypeB ])();
};

const generateNirTypeA = () => {
    return generateVerificationKey('' + generateFirstPart() + generateAType() + generateLastPart());
};

const generateNirTypeB = () => {
    return generateVerificationKey('' + generateFirstPart() + generateBType() + generateLastPart());
};

const generateNirTypeC = () => {
    return generateVerificationKey('' + generateFirstPart() + generateCType() + generateLastPart());
};

module.exports = {
    generateNir,
    generateNirTypeA,
    generateNirTypeB,
    generateNirTypeC,
    nirRegex
};