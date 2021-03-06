const csvWriter = require("csv-write-stream");
const fs = require("fs");
const shortid = require("shortid");

mockData = {
  brands: ["nike", "Nike", "Adidas", "Puma", "Under Armour", "New Balance"],
  names: [
    "ankle boot",
    "army boots",
    "athletic shoes",
    "ballet shoes",
    "beach shoes",
    "boat shoes",
    "boots",
    "bowling shoes",
    "brogues",
    "cleats",
    "climbing shoes",
    "clogs",
    "court shoes",
    "cowboy boots",
    "cycling shoes",
    "deck shoes",
    "dress shoes",
    "elevator shoes",
    "espadrilles",
    "figure skates",
    "flip-flops",
    "galoshes",
    "golf shoes",
    "gumboots",
    "heels",
    "high heels",
    "high-top sneakers",
    "hiking boots",
    "ice skates",
    "inline skates",
    "jackboots",
    "jump boots",
    "kamiks",
    "loafers",
    "Mary Janes",
    "moccasins",
    "mukluks",
    "mules",
    "open-toe shoes",
    "Oxfords",
    "penny loafers",
    "platform shoes",
    "pointe shoes",
    "pumps",
    "rain boots",
    "riding boots",
    "roller skates",
    "rollerblades",
    "running shoes",
    "saddle shoes",
    "sandals",
    "shoes",
    "skate shoes",
    "skates",
    "ski boots",
    "slides",
    "sling-backs",
    "slippers",
    "sneakers",
    "steel-toe boots",
    "stiletto heels",
    "swim fins",
    "tap shoes",
    "tennis shoes",
    "toe shoes",
    "track shoes",
    "valenki",
    "waders",
    "wedge shoes",
    "Wellington boots",
    "wingtip shoes",
    "work boots",
    "zoris",
  ],
};

function getRandomValue(numRandom) {
  return Math.floor(Math.random() * numRandom);
}

function randomArrayVal(arr) {
  return arr[getRandomValue(arr.length)];
}

// return a price like $XX.XX
function getRandomPrice() {
  return `$${getRandomValue(100)}.${getRandomValue(100)}`;
}

const maxQuantity = 500;
let writer = csvWriter();
writer.pipe(fs.createWriteStream("./product_catalog.csv"));
// iterate over the iterables
mockData.names.forEach(function (name) {
  mockData.brands.forEach(function (brand) {
    const price = getRandomPrice();
    writer.write({
      name,
      brand,
      sku: shortid.generate(),
      retail_price: price,
      current_price: price,
      quantity: getRandomValue(maxQuantity),
    });
  });
});
writer.end();
