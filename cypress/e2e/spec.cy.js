import { CalculatorPage } from "../pages/calculator.page";
import { faker } from "@faker-js/faker";

describe("BC CMHC Insurance test suite", () => {
  const calculatorPage = new CalculatorPage();

  beforeEach(() => {
    cy.visit("/");
  });

  it("Test scenario 1 - Mortage calculation with a fixed asking amount", () => {
    const downPaymentPercents = ["5.0%", "10.0%", "15.0%", "20.0%"];
    const downPaymentAmounts = ["$22,500", "$45,000", "$67,500", "$90,000"];
    const insuranceAmounts = ["$17,100", "$12,555", "$10,710", "$0"];
    const mortageAmounts = ["$444,600", "$417,555", "$393,210", "$360,000"];

    calculatorPage.fillAskingPrice(450000);

    calculatorPage.checkAllDPPercentCols(downPaymentPercents);
    calculatorPage.checkAllDPAmountCols(downPaymentAmounts);
    calculatorPage.checkAllInsuranceCols(insuranceAmounts);
    calculatorPage.checkAllMortageCols(mortageAmounts);
  });

  it("Test scenario 2 - CMHC insurance with down payment less than 20% should be calculated. Insurance with DP over 20% is not calculated", () => {
    const insuranceAmounts = ["$19,000", "$13,950", "$11,900", "$0"];

    calculatorPage.fillAskingPrice(500000);

    calculatorPage.checkAllInsuranceCols(insuranceAmounts);
  });

  it("Test scenario 3 - CMHC insurance is not available for homes purchased for more than $1 million and minimun DP percentage starts at 20%", () => {
    const downPaymentPercents = ["20.0%", "25.0%", "30.0%", "35.0%"];
    const insuranceAmounts = ["$0", "$0", "$0", "$0"];
    const askingPrice = faker.number.int({ min: 1000000, max: 10000000 });

    calculatorPage.fillAskingPrice(askingPrice);

    calculatorPage.checkAllDPPercentCols(downPaymentPercents);
    calculatorPage.checkAllInsuranceCols(insuranceAmounts);
  });

  it("Test scenario 4 - The minimum down payment is 5% of the first $500,000", () => {
    const askingPrice = faker.number.int({ min: 100000, max: 500000 });

    calculatorPage.fillAskingPrice(askingPrice);

    calculatorPage.getDownPaymentPercentByIndex(0).should("have.value", "5.0%");
  });

  it("Test scenario 5 - Homes sold over $500,000 can no longer be purchased with a 5% down payment", () => {
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

  it("Test scenario 7 - User can change the down payment amount", () => {
    const askingPrice = 900000;

    calculatorPage.fillAskingPrice(askingPrice);
    calculatorPage.fillDownPaymentAmountByIndex(0, 70200);

    calculatorPage.getDownPaymentPercentByIndex(0).should("have.value", "7.8%");
    calculatorPage.getInsuranceByCol(0).should("have.text", "$33,192");
    calculatorPage.getMortageByCol(0).should("have.text", "$862,992");
  });

  it("Test scenario 8 - Error message when asking price field is left blank", () => {
    calculatorPage.focusOutAskingPrice();

    calculatorPage.getAskingPriceErrorMsg().should("have.text", "Please enter a whole number");
  });
});
