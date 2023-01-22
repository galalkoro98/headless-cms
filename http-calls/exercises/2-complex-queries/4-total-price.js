/**
 * Fill in the blanks to create a script
 * that prints the total cost if someone would buy one of every item
 * (ignoring whether it is in stock or not and not applying any discount)
 */

import "./qs.js";
async function ex4() {
  const query = qs.stringify(
    {
      // that prints the total cost if someone would buy one of every item

      fields: ["price"],
      sort: ["price:asc"],
      filter: {
        price: {
          gt: 0,
        },
        aggregate: {
          total: {
            sum: "price",
          },

          groupBy: ["price"],

          page: {
            limit: 100,
          },

          // ignoring whether it is in stock or not and not applying any discount
          filter: {
            price: {
              gt: 0,
            },

            outOfStock: {
              eq: false,
            },

            discount: {
              eq: null,
            },

            aggregate: {
              total: {
                sum: "price",
              },
            },

            page: {
              limit: 100,
            },

            groupBy: ["price"],
            sort: ["price:asc"],
          },
        },
      },
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
  });

  // print the total cost

  console.log("The total cost is", totalCost);
}
ex4();
