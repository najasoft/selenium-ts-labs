import { IValidationStrategy } from "./IValidationStrategy";

export class AdminValidationStrategy implements IValidationStrategy {
    validate(): void {
        console.log("Admin validation: verifying access and privileges.");
    }

}