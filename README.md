# nir-generator

A tool to generate a random NIR number (https://fr.wikipedia.org/wiki/Numéro_de_sécurité_sociale_en_France)

# Installation

```
npm install --save nir-generator
```

# Usage

```javascript
// import
const nirGenerator = require('nir-generator');


// use
let myNIR = nirGenerator.generateNir();

// following the wiki, there is 3 'type' of NIR number :

myNIR = nirGenerator.generateNirTypeA();

myNIR = nirGenerator.generateNirTypeB();

myNIR = nirGenerator.generateNirTypeC();

// You can validate a NIR using

if ( myNIR.match(nirGenerator.nirRegex) ) {
    // valid
}
```
