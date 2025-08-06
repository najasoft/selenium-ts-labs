import { AdminValidationStrategy } from "./AdminValidationStrategy";
import { NewUserValidationStrategy } from "./NewUserValidationStrategy";
import { UserValidationContext } from "./UserValidationContext";

async function runValidationTests(): Promise<void> {
    const context: UserValidationContext = new UserValidationContext(new AdminValidationStrategy());

    context.executeValidation();

    context.setStrategy(new NewUserValidationStrategy());
    context.executeValidation();


}


runValidationTests().catch(err => console.log(err));