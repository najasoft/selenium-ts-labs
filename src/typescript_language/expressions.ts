let var1 = /(?<mot>hello)/ // named group es2018
console.log(var1.test("hello world!"));

console.log(var1.exec('hello world ! , hello '));
let var2 = /(?<mot>hello)/g; //modifiers i,m,g, u (unicode) , s dotAll, y sticky 
let result = var2.exec('hello world ! , hello ');
console.log(var2.exec('hello world ! , hello '));
console.log(var2.exec('hello world ! , hello '));
console.log(result?.groups);


// +- (lookahead, lookbehind) non capturing group >=es2018 (es9)
const texte1 = "fichier:rapport_final_OK.pdf fichier:test_brouillon.txt fichier:resume_OK.doc";
const regex = /(?<=fichier:)(?:\w+_OK)(?=\.\w+)/g;

const results = texte1.match(regex);
console.log(results); // [ 'rapport_final_OK', 'resume_OK' ] 

// m modifier
const texte: string = `;ligne1
abc
ligne3`;

const regex1 = /^abc$/;       // without m
const regex2 = /^abc$/m;      // with m

console.log(regex1.test(texte)); // ❌ false → don't match
console.log(regex2.test(texte)); // ✅ true → line 2 match

// named groups example

console.log('named groups example:');
const regex3 = /(?<firstName>\w+)\s(?<lastName>\w+)/;
const result3: RegExpExecArray | null = regex3.exec("Alice Martin"); // ✅ ici on utilise regex3

console.log(result3);

if (result3?.groups) {
    console.log('Name:' + result3.groups.lastName);
    const { firstName, lastName } = result3.groups as {
        firstName: string;
        lastName: string;
    };

    console.log(firstName); // ✅ Alice
    console.log(lastName);    // ✅ Martin
}


// date example
console.log("date example !***********************");
const regex4 = /(?<day>\d{2})-(?<month>\d{2})-(?<year>\d{4})/;

const result4 = regex4.exec("21-07-2025");
if (result4?.groups) {
    const { day, month, year } = result4.groups as {
        day: string;
        month: string;
        year: string;
    };
    console.log(day, month, year); // 21 07 2025
}


// matchAll
console.log('matchAll example!*************************');
const list = "name: Jean, name: Alice";
const regex5 = /name: (?<name>\w+)/g;
for (const match of list.matchAll(regex5)) {
    console.log(match.groups?.name); // Jean, Alice
}