Feature: Ecommerce validations
    @ErrorValidations
    Scenario Outline: Placing an order
        Given a login to Ecommerce2 application with "<userName>" and "<password>"
        Then verify error message is displayed

        Examples:
        | userName            | password |
        | johnDoe@example.com | Password123 |
        | johnDo@example.com  | Password123 |
