/**
 * Fill in the blanks to create a script
 * that prints the total cost if someone would buy one of every item
 * taking into consideration that it's impossible to buy items that are out of stuck,
 * and taking the discount rates into account
 */

import "./qs.js";

async function ex6() {
  // Add query parameters for stock status and discount rate
  const query = qs.stringify(
    {
      filter: {
        stock: {
          $gt: 0,
        },

        discount: {
          $exists: true,
        },

        price: {
          $gt: 0,
        },
      },
    },

    {
      encodeValuesOnly: true,
    }
  );
  console.log("The query string", query);

  const baseUrl = "http://localhost:1337/api/products";
  const response = await fetch(`${baseUrl}?${query}`);
  const result = await response.json();

  // Initialize a variable to store the total cost
  var totalCost = 0;

  // Iterate through the result data and add up the cost of in-stock items with discount
  result.data.forEach(function (item) {
    if (item.attributes.stock > 0) {
      totalCost += item.attributes.price * (1 - query.discount);
    } else {
      // If the item is out of stock, print a message
      console.log(
        `The item ${item.attributes.name} is out of stock and cannot be bought`
      );
    }

    // If the item has a discount, print a message
    if (item.attributes.discount) {
      console.log(
        `The item ${item.attributes.name} has a discount of ${item.attributes.discount}`
      );
    }
  });

  // Print the total cost
  console.log(`The total cost is ${totalCost}`);
}
ex6();
