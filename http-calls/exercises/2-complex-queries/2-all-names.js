/**
 * Fill in the blanks to create a script that prints the name of all products sorted alphabetically
 */

import "./qs.js";
async function ex1() {
  const query = qs.stringify(
    {
      fields: ["name"],
      sort: ["name:asc"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  console.log("The query string", query);

  const baseUrl = "http://localhost:1337/api/products";
  const response = await fetch(`${baseUrl}?${query}`);
  const result = await response.json();
  console.log(result.data.map((product) => product.attributes.name).join("\n"));
}
ex1();
