
/*
The function toFixed utilize string manipulation in order to give the correct decimal value required.
In order to round the decimal correctly, the function moves the decimal point to the right with the given number of precision. 
In my case, If no precision is given it will be given a value of 2.
After rounding, which will result in a  whole number the function will again put the decimal point starting from the
rightmost part to the left with the given number of precision.
*/

function toFixed (value, precision) {	
  var dotIndex = precision;
  var stringifiedValue = value.toString();
  var splittedValue = stringifiedValue.split('.');
  var dotToRight = '';
  var correctedValue = '';
  // this block of code checks if the given value is over 1e+21, if value is over/equal to 1e+21 it will just return the stringified value.
  if (value > 1e+21) {
    return stringifiedValue;
  }
  // this block of code is the one responsible for checking if precision is given, if not assigns it to 2.
  if (!dotIndex) {
    dotIndex = 2;
  }
  // this code deals with the second element of the resulting array for the splitted string. 
  if (splittedValue[1]) {
    // this line of code is the one responsible of moving the decimal point to the right.
    dotToRight = splittedValue[0] + splittedValue[1].substring(0,dotIndex) + '.' + splittedValue[1].substring(dotIndex);
    // after moving the decimal point to the right it will round it resulting to a whole number.
    correctedValue = Math.round(dotToRight).toFixed();
    // the return value will be responsible moving the decimal point from the rightmost part to the left with the given number of precision.
    return correctedValue.substring(0,correctedValue.length - dotIndex) + '.' + correctedValue.substring(correctedValue.length - dotIndex);
  }
  // the final line of the code is responsible for adding padding to the right of the decimal point.
  // this will only run if the given value is a whole number. e.g toFixed(10) --> 10.00
  return Number(splittedValue[0]).toFixed(dotIndex);
};

tests ( {
  'It should return a string representation of the value given.': function () {
    var roundedValue = toFixed(1.2);
    var test =  typeof roundedValue;
    eq(test, 'string');
  },
  'It should have precision number of digits after the decimal point.': function () {
    var precision = 3;
    var roundedValue = toFixed(10.1234,precision);
    var test = roundedValue.split('.');
    eq(test[1].length,precision);
  },
  'It should round the number correctly for the specified number of precision.': function () {
    var roundedValue = toFixed(1.005,2);
    eq(roundedValue,1.01);

    roundedValue = toFixed(10.235,2);
    eq(roundedValue,10.24);

    roundedValue = toFixed(0.615,2);
    eq(roundedValue,0.62);
  },
  'It should pad the fractional part with precision number of zeros.': function () {
    var precision = 3;
    var roundedValue = toFixed(10.1,3);
    var test = roundedValue.split('.');
    eq(test[1].length,precision);
  },
  'It should return the value in exponential notation if it is greater than 1e+21.': function () {
    var roundedValue = toFixed(1000000000000000000000);
    eq(roundedValue,1e+21);
  }
} );

