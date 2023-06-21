export class CalculatorPage {
  fillAskingPrice(askingPrice) {
    cy.get("[id=askingPrice]").clear().type(askingPrice);
  }

  focusOutAskingPrice() {
    cy.get("[id=askingPrice]").trigger("focusout");
  }

  getAskingPriceErrorMsg() {
    return cy.get(".error-message");
  }

  fillDownPaymentPercentByIndex(index, downPaymentPercent) {
    cy.get(`[id="scenarios\\[${index}\\].downPaymentPercent"]`)
      .clear()
      .type(downPaymentPercent);
  }

  fillDownPaymentAmountByIndex(index, downPaymentAmount) {
    cy.get(`[id="scenarios\\[${index}\\].downPaymentDollars"]`)
      .clear()
      .type(downPaymentAmount);
  }

  getInsuranceByCol(col) {
    return cy.get(`[data-name="cmhcInsurance-col-${col}"]`);
  }

  getMortageByCol(col) {
    return cy.get(`[data-name="totalMortgage-col-${col}"]`);
  }

  getDownPaymentPercentByIndex(index) {
    return cy.get(`[id="scenarios\\[${index}\\].downPaymentPercent"]`);
  }

  isDPPercentGTByIndex(index, percent) {
    this.getDownPaymentPercentByIndex(index)
      .invoke("attr", "value")
      .then((downPaymentPercent) => {
        const numericPart = parseFloat(downPaymentPercent);
        expect(numericPart).to.be.greaterThan(percent);
      });
  }

  getDownPaymentAmountByIndex(index) {
    return cy.get(`[id="scenarios\\[${index}\\].downPaymentDollars"]`);
  }
}