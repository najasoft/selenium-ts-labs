import { IValidationStrategy } from './IValidationStrategy';

export class NewUserValidationStrategy implements IValidationStrategy {
    validate(): void {
        console.log("New user validation: checking restricted access.");
    }
}