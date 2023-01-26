/**
 * Fill in the blanks to create a script
 * searches for products whose name contains the string that is passed as nameStr
 */

import "./qs.js";
async function searchProductByName(nameStr) {
  const query = qs.stringify({
    // searches for products whose name contains the string that is passed as nameStr
    fields: ["name"],
    sort: ["name:asc"],
    filters: {
      name: {
        $contains: nameStr,
      },
    },

    encodeValuesOnly: true,
  });
  console.log("The query string", query);

  const baseUrl = "http://localhost:1337/api/products";
  const response = await fetch(`${baseUrl}?${query}`);
  const result = await response.json();
  return result.data.map((product) => product.attributes.name);
}

async function test() {
  console.log("Products containing name", await searchProductByName("name"));
  console.log("Products containing prog", await searchProductByName("prog"));
  console.log("Products containing pro", await searchProductByName("pro"));
}

test();
