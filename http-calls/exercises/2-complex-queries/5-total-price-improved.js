/**
 * Fill in the blanks to create a script
 * that prints the total cost if someone would buy one of every item
 * without applying any discount, but only count items that are currently in stock
 */

import "./qs.js";
async function ex4() {
  const query = qs.stringify(
    {
      // that prints the total cost if someone would buy one of every item
      // without applying any discount, but only count items that are currently in stock
      _where: [
        {
          outOfStock: false,
        },

        {
          discount: null,
        },

        {
          price: {
            _gte: 0,
          },

          outOfStock: false,
        },
      ],
    },

    {
      encodeValuesOnly: true,
    }
  );
  console.log("The query string", query);

  // call the matching endpoint and include the querystring after the ?
  const baseUrl = "http://localhost:1337/api/products";
  const response = await fetch(`${baseUrl}?${query}`);
  const result = await response.json();

  // calculate the total cost
  const totalCost = result.data.reduce((acc, item) => {
    return acc + item.attributes.price;
  }, 0);

  // print the total cost
  console.log("The total cost is", totalCost);
}
ex4();
