import test from 'ava';
const ng = require('../index');

test('testing length of random type', t => {
    t.is(ng().toString().length, 15);
});

test('testing length of type A', t => {
    t.is(ng.typeA().toString().length, 15);
});

test('testing length of type B', t => {
    t.is(ng.typeB().toString().length, 15);
});

test('testing length of type C', t => {
    t.is(ng.typeC().toString().length, 15);
});

test('testing validity of random type', t => {
    t.true(ng.validate(ng()));
});

test('testing validity of type A', t => {
    t.true(ng.validate(ng.typeA()));
});

test('testing validity of type B', t => {
    t.true(ng.validate(ng.typeB()));
});

test('testing validity of type C', t => {
    t.true(ng.validate(ng.typeC()));
});

