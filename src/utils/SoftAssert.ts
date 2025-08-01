import * as assert from 'assert';

export class SoftAssert<T = 'any'> {
    private errors: string[] = [];
    public strictEqual(actual: T, expected: T, message: string) {
        try {
            assert.strictEqual(actual, expected, message);
            console.log(`✅ ${message}`);

        }
        catch (err) {
            const msg = `${message}:${(err as assert.AssertionError).message}`;
            console.log(msg);
            this.errors.push(msg);
        }

    }

    public ok(condition: boolean, message: string) {
        try {
            assert.ok(condition, message);
            console.log(`✅ ${message}`);
        }
        catch (err) {
            const msg = `❌ $message:${(err as assert.AssertionError).message}`;
            console.log(msg);
            this.errors.push(msg);
        }

    }

    public getErrors(): string[] {
        return this.errors;
    }

    public assertAll() {
        if (this.errors.length > 0) {
            throw new Error(`assertion failures (${this.errors.length}) : \n - ${this.errors.join("\n -")}`);
        }
    }

}