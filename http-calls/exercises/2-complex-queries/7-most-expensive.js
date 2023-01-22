/**
 * Fill in the blanks to create a script
 * that prints the name of the most expensive item that someone can buy (after applying any discounts,
 * and not including any items that are out of stock)
 */

import "./qs.js";
async function searchProductByName(nameStr) {
  const query = qs.stringify(
    {
      _where: [
        {
          name_contains: nameStr,
        },

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

          discount: null,

          name_contains: nameStr,

          _sort: "price:desc",

          _limit: 1,

          _start: 0,
        },
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );
  console.log("The query string", query);

  const baseUrl = "http://localhost:1337/api/products";
  const response = await fetch(`${baseUrl}?${query}`);
  const result = await response.json();

  // Extract the name of the most expensive item
  if (result.data.length > 0) {
    const mostExpensive = result.data[0];
    console.log(
      "The name of the most expensive item: " + mostExpensive.attributes.name
    );
    return mostExpensive.attributes.name;
  } else {
    console.log("No Product found");
  }
}

async function test() {
  console.log("Products containing name", await searchProductByName("name"));
  console.log("Products containing prog", await searchProductByName("prog"));
  console.log("Products containing pro", await searchProductByName("pro"));
}

test();
