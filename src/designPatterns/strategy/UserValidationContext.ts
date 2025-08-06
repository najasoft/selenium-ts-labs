import { IValidationStrategy } from './IValidationStrategy';

export class UserValidationContext {
    private strategy: IValidationStrategy;

    constructor(strategy: IValidationStrategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: IValidationStrategy): void {
        this.strategy = strategy;
    }

    public executeValidation(): void {
        this.strategy.validate();
    }
}