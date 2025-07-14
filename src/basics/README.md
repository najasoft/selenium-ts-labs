# Most Common Daily Activities - Selenium Automation Labs

## Objective

Learn how to deal with the most common scenarios in automation. Everything must be solved using the **testing page** : http://uitestingplayground.com/home.

## Scenarios

### 1. Class Attribute Verification

**Scenario:** Open Class Attribute section and create script that verify that the blue button is visible.

### 2. Class Attribute Interaction

**Scenario:** Open Class Attribute section and click the blue button and validate the popup message.

### 3. Client-Side Delay Testing

**Scenario:** Open Client-Side Delay section and click the blue button, then validate the green label.

### 4. Load Delay Verification

**Scenario:** Open Load Delay section and verify the "Button Appearing After Delay" button is visible.

**Bonus Requirements:**

- Do not use Explicit/Implicit wait, instead first verify that the page is fully loaded
- Verify that the spinner element turns visible and wait for it to disappear

### 5. Overlapped Element Handling

**Scenario:** Open Overlapped Element section and set a random Id and Name, then validate the form retains the information.

### 6. Dynamic Table Data Validation

**Scenario:** Open Dynamic Table section and take chrome process value of CPU load (value is in the table), then compare it with the value in the yellow label and verify both values match.

## Lab Structure

```
labs/
├── basics/          # Basic automation examples and exercises
├── image.png        # Reference image with scenarios
└── README.md        # This file
```

## Getting Started

1. Navigate to the testing page
2. Complete each scenario in order
3. Ensure all bonus requirements are met where specified
4. Validate all assertions and verifications as described

## Notes

- Focus on real-world automation scenarios
- Practice proper element identification techniques
- Implement robust waiting strategies
- Validate dynamic content handling
- Repository url: https://github.com/inflectra/ui-test-automation-playground
