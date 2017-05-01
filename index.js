'use strict';

const random = require('lodash.random');
const sample = require('lodash.sample');
const union = require('lodash.union');
const range = require('lodash.range');

const regex = /^([1-4]|7|8)[\s.\-]?([0-9]{2})[\s.\-]?(0[0-9]|[2-35-9][0-9]|[14][0-2])[\s.\-]?(0[1-9]|[1-8][0-9]|9[0-57-9]|2[ab])[\s.\-]?(00[1-9]|0[1-9][0-9]|[1-8][0-9]{2}|9[0-8][0-9]|990)[\s.\-]?([0-9]{3})[\s.\-]?([0-8][0-9]|9[0-7])$/gi;

/**
 * Caching method, avoid creating arrays each times.
 */
const arrayMonths = union(range(1, 12), [62, 63]);
const arrayStates = union(range(1, 19), range(21, 95), range(96,99), ['2A', '2B']);

/**
 * Used to generate the first part (5 first characters) of a NIR number.
 *
 * @internal
 *
 * @return String[5]
 */
const generateFirstPart = () => (
    [
        random(1, 4, false), // gender
        ('0' + random(0, 99, false)).slice(-2), // year of birth
        ('0' + sample(arrayMonths)).slice(-2) // month of birth (could be > 12 too but not generated with that kind of feature)
    ].join('')
);

/**
 * Used to generate the second part (from 6th to 10th characters) of a NIR number following the type A.
 *
 * @internal
 *
 * @return String[5]
 */
const generateTypeA = () => (
    [
        ('0' + sample(arrayStates)).slice(-2), // state of birth
        ('00' + random(1, 990, false)).slice(-3) // city of birth
    ].join('')
);

/**
 * Used to generate the second part (from 6th to 10th characters) of a NIR number following the type B.
 *
 * @internal
 *
 * @return String[5]
 */
const generateTypeB = () => (
    [
        random(970, 989, false), // state of birth
        ('0' + random(1, 90, false)).slice(-2) // city of birth
    ].join('')
);

/**
 * Used to generate the second part (from 6th to 10th characters) of a NIR number following the type C.
 *
 * @internal
 *
 * @return String[5]
 */
const generateTypeC = () => (
    [
        99, // birth outside france
        ('00' + random(1, 990, false)).slice(-3) // country of birth
    ].join('')
);

/**
 * Used to generate the last part (before the validation key, so from 11th to 13th characters) of a NIR number.
 *
 * @internal
 *
 * @return String[3]
 */
const generateLastPart = () => ( ('00' + random(1, 999, false)).slice(-3) ); // order of birth of the month);

/**
 * Given a 13 characters long NIR (so without the verification key) it'll calculate the verification key to make it valid.
 *
 * @param {String} string nir number without the verification key
 *
 * @return {String} full nir number
 *
 * @internal
 */
const generateVerificationKey = string => {
    let number = 0;

    if (string.indexOf('A') !== -1) { // 2A french department/state
        number = parseInt(string.replace('A', '0'));
        number -= 1000000;
    } else if (string.indexOf('B') !== -1) { // 2B french department/state
        number = parseInt(string.replace('B', '0'));
        number -= 2000000;
    } else {
        number = parseInt(string);
    }

    return string + ('0' + (97 - ( ( number ) % 97 ))).slice(-2);
};

/**
 * Return a Type A NIR Number.
 *
 * @return String
 */
const typeA = () => ( generateVerificationKey('' + generateFirstPart() + generateTypeA() + generateLastPart()) );

/**
 * Return a Type B NIR Number.
 *
 * @return String
 */
const typeB = () => ( generateVerificationKey('' + generateFirstPart() + generateTypeB() + generateLastPart()) );

/**
 * Return a Type C NIR Number.
 *
 * @return String
 */
const typeC = () => ( generateVerificationKey('' + generateFirstPart() + generateTypeC() + generateLastPart()) );

/**
 * Return a random NIR number.
 *
 * @return String
 */
const nir = () => ( sample([typeA, typeB, typeC])() );

/**
 * Check if a NIR number is valid.
 *
 * @param {String} nir
 *
 * @return {Boolean} validity of the number
 */
const validate = (nir) => ( regex.test(nir) );

// exports

module.exports = nir;

module.exports.regex = regex;

module.exports.typeA = typeA;

module.exports.typeB = typeB;

module.exports.typeC = typeC;

module.exports.validate = validate;