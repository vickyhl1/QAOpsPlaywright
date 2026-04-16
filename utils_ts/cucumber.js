// Default profile: no Cucumber Reports publish (same idea as --publish-quiet).
export default {
    publish: false,
  };

  //npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumbre-report.html
  //npx cucumber-js --tags \"@Regression\" --retry 1 --exit --format html:cucumbre-report.html
  //npx cucumber-js --tags "@ErrorValidations" --exit