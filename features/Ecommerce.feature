Feature: Ecommerce validations
    @Regression
    Scenario: Placing an order
        Given a login to Ecommerce application with "johnDoe@example.com" and "Password123"
        When Add "ZARA COAT 3" to cart
        Then verify "ZARA COAT 3" is displayed in the cart
        When Enter valid details and Place the order
        Then Verify order is present in orders history


    @ErrorValidations
    Scenario Outline: Placing an order
        Given a login to Ecommerce2 application with "<userName>" and "<password>"
        Then verify error message is displayed

        Examples:
        | userName            | password |
        | johnDoe@example.com | Password123 |
        | johnDo@example.com  | Password123 |
