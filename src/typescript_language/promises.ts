

// Promise in javascript

import { time } from "console";

function waitOneSecond(): Promise<string> {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("I was no: 1 and I take one second");
        }, 1000);
    });

}

async function waitTenSeconds(callBack: () => Promise<string>): Promise<string> {
    return new Promise(resolve => {
        setTimeout(() => {
            callBack().then(
                result => {
                    console.log(result);
                }
            );
            resolve("I was no: 2 and I take ten seconds");
        }, 10000);
    })

}
waitTenSeconds(waitOneSecond).then(result => {
    console.log(result);
});

const timerId: NodeJS.Timeout = setInterval(() => {
    const now = new Date()
    const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    console.log(`Bonjour ${time}`);
}, 1000);


setTimeout(() => {
    clearInterval(timerId);
    console.log(`Timer terminé:${timerId}`);
}, 50000);
