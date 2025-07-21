import { JSDOM } from "jsdom";


async function getDocumentFromUrl(url: string): Promise<Document> {
    const response: Response = await fetch(url);
    const html: string = await response.text();
    // const parser: DOMParser = new DOMParser();
    //const doc: Document = parser.parseFromString(html, "text/html");
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    return doc;
}

getDocumentFromUrl('https://www.example.com').then(
    (doc) => {
        console.log(doc.title);
        const elt = doc.getElementsByTagName('a');
        console.log(elt.item(0)?.innerHTML);

    }
);

// Closure

function initialzeCounter() {
    let index = 0;
    return () => {
        index++;
        console.log(index);
    }

}



const counter = initialzeCounter();
counter();
counter();
counter();

class Vehicle {


    constructor(public type: string = "car", public wheels: number = 4, private engine: string = "4 cylinder") {

    }
}

const v: Vehicle = new Vehicle("Bus", 8, "16 cylinder");
const { type, wheels } = v;
console.log(wheels);