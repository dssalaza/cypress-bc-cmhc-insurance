import { CalculatorPage } from "../pages/calculator.page";
import { faker } from "@faker-js/faker";

describe("BC CMHC Insurance test suite", () => {
  const calculatorPage = new CalculatorPage();

  beforeEach(() => {
    cy.visit("/");
  });

  it.only("Test scenario 1 - Mortage calculation with a fixed asking amount", () => {
    calculatorPage.fillAskingPrice(450000);

    calculatorPage.getDownPaymentPercentByIndex(0).should("have.value", "5.0%");
    calculatorPage.getDownPaymentPercentByIndex(1).should("have.value", "10.0%");
    calculatorPage.getDownPaymentPercentByIndex(2).should("have.value", "15.0%");
    calculatorPage.getDownPaymentPercentByIndex(3).should("have.value", "20.0%");

    calculatorPage.getDownPaymentAmountByIndex(0).should("have.value", "$22,500");
    calculatorPage.getDownPaymentAmountByIndex(1).should("have.value", "$45,000");
    calculatorPage.getDownPaymentAmountByIndex(2).should("have.value", "$67,500");
    calculatorPage.getDownPaymentAmountByIndex(3).should("have.value", "$90,000");

    calculatorPage.getInsuranceByCol(0).should("have.text", "$17,100");
    calculatorPage.getInsuranceByCol(1).should("have.text", "$12,555");
    calculatorPage.getInsuranceByCol(2).should("have.text", "$10,710");
    calculatorPage.getInsuranceByCol(3).should("have.text", "$0");

    calculatorPage.getMortageByCol(0).should("have.text", "$444,600");
    calculatorPage.getMortageByCol(1).should("have.text", "$417,555");
    calculatorPage.getMortageByCol(2).should("have.text", "$393,210");
    calculatorPage.getMortageByCol(3).should("have.text", "$360,000");

  });

  it("Test scenario 2 - CMHC insurance with down payment less than 20% should be calculated. Insurance with DP over 20% is not calculated", () => {
    calculatorPage.fillAskingPrice(500000);

    calculatorPage.getInsuranceByCol(0).should("have.text", "$19,000");
    calculatorPage.getInsuranceByCol(1).should("have.text", "$13,950");
    calculatorPage.getInsuranceByCol(2).should("have.text", "$11,900");
    calculatorPage.getInsuranceByCol(3).should("have.text", "$0");
  });

  it("Test scenario 3 - CMHC insurance is not available for homes purchased for more than $1 million", () => {
    const askingPrice = faker.number.int({ min: 1000000, max: 10000000 }); // 57;

    calculatorPage.fillAskingPrice(askingPrice);

    calculatorPage.getDownPaymentPercentByIndex(0).should("have.value", "20.0%");
    calculatorPage.getDownPaymentPercentByIndex(1).should("have.value", "25.0%");
    calculatorPage.getDownPaymentPercentByIndex(2).should("have.value", "30.0%");
    calculatorPage.getDownPaymentPercentByIndex(3).should("have.value", "35.0%");

    calculatorPage.getInsuranceByCol(0).should("have.text", "$0");
    calculatorPage.getInsuranceByCol(1).should("have.text", "$0");
    calculatorPage.getInsuranceByCol(2).should("have.text", "$0");
    calculatorPage.getInsuranceByCol(3).should("have.text", "$0");
  });

  it("Test scenario 4 - The new minimum down payment is 5% of the first $500,000", () => {
    const askingPrice = faker.number.int({ min: 100000, max: 500000 });

    calculatorPage.fillAskingPrice(askingPrice);

    calculatorPage.getDownPaymentPercentByIndex(0).should("have.value", "5.0%");
  });

  it("Test scenario 5 - Homes sold over $500,000 can no longer be purchased with a 5% down payment.", () => {
    const askingPrice = faker.number.int({ min: 500001, max: 1000000 });

    calculatorPage.fillAskingPrice(askingPrice);

    calculatorPage.isDPPercentGTByIndex(0, 5.0);
  });

  it("Test scenario 6 - User can change the down payment percentage  ", () => {
    const askingPrice = 700000;

    calculatorPage.fillAskingPrice(askingPrice);
    calculatorPage.fillDownPaymentPercentByIndex(0, 7.5);

    calculatorPage.getDownPaymentAmountByIndex(0).should("have.value", "$52,500");
    calculatorPage.getInsuranceByCol(0).should("have.text", "$25,900");
    calculatorPage.getMortageByCol(0).should("have.text", "$673,400");
  });

  it("Test scenario 6a - User can change the down payment percentage  ", () => {});

  it("Test scenario 7 - Error message when asking price field is left blank", () => {
    calculatorPage.focusOutAskingPrice();

    calculatorPage.getAskingPriceErrorMsg().should("have.text", "Please enter a whole number");
  });
});