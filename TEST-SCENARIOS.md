## Testing a Mortgage Calculator

### Test scenario 1: Mortage calculation with a fixed asking amount
```
GIVEN I am a calculator user  
WHEN "asking price" is $450,000  
THEN the Down payment percents an amounts should be calculated 
AND the CMHC insurance amounts should be calculated for each Down Payment
AND the Total Mortage should be calculated for each Down Payment and CMHC insurance
```

### Test scenario 2: Insurance with down payment less than 20% should be calculated. If more than 20% the CMHC is 0
```
GIVEN I am a calculator user
WHEN "asking price" is $500,000
THEN the insurance for more than 20% of down payment should not be calculated
AND the insurance for less than 20% of down payment should be calculated
```

### Test scenario 3: CMHC insurance is not available for homes purchased for more than $1 million and minimun DP percentage starts at 20%
```
GIVEN I am a calculator user
WHEN "asking price" is more than $1,000,000
THEN the insurance should not be calculated
AND down payment percentage should be as follows: 20%, 25%, 30%, 35%
```

### Test scenario 4: The minimum down payment is 5% of the first $500,000
```
GIVEN I am a calculator user
WHEN "asking price" is less than $500,000
THEN the minimum down payment is 5%
```

### Test scenario 5: Homes sold over $500,000 can no longer be purchased with a 5% down payment
```
GIVEN I am a calculator user
WHEN "asking price" is more than $500,000
THEN the minimum down payment is greater than 5%
```

### Test scenario 6: User can change the down payment percentage
```
GIVEN I am a calculator user
WHEN "asking price" is $700,000
AND the down payment percentage is changed to 7.5%
THEN the down payment amount should be $52,500
AND the CMHC should be $25,900
ANd the mortgage should be $673,400
```

### Test scenario 7: User can change the down payment amount
```
GIVEN I am a calculator user
WHEN "asking price" is $900,000
AND the down payment amount is changed to $70,200
THEN the down payment percentage should be 7.8%
AND the CMHC should be $33,192
ANd the mortgage should be $862,992
```

### Test scenario 8: "Asking price" field is blank
```
GIVEN I am calculator user
WHEN I "asking price" field is in blank
THEN an error message stating "Please enter a whole number" should appear
```