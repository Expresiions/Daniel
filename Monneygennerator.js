const etsyApiKey = "your_etsy_api_key";
const ebayApiKey = "your_ebay_api_key";
const paypalApiKey = "your_paypal_api_key";

// Etsy API URL for getting trending product listings
const etsyTrendingListingsUrl = "https://openapi.etsy.com/v2/listings/trending";

// eBay Inventory API URL for creating a new inventory item
const ebayInventoryItemUrl = "https://api.ebay.com/sell/inventory/v1/inventory_item";

// eBay Fulfillment API URL for creating a new fulfillment policy
const ebayFulfillmentPolicyUrl = "https://api.ebay.com/sell/fulfillment/v1/fulfillment_policy";

// eBay Account API URL for retrieving user information
const ebayUserUrl = "https://api.ebay.com/sell/account/v1/user";

// PayPal API URL for creating a payment
const paypalPaymentUrl = "https://api.paypal.com/v2/checkout/orders";

// function to get trending product listings from Etsy
function getTrendingListingsFromEtsy() {
  // make a GET request to the Etsy API to get trending listings
  return fetch(etsyTrendingListingsUrl, {
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": etsyApiKey
    }
  })
    .then(response => response.json())
    .then(data => data.results);
}

// function to create a new inventory item on eBay
function createInventoryItemOnEbay(listing) {
  // create a new inventory item object to be posted to eBay
  const inventoryItem = {
    sku: listing.sku,
    title: listing.title,
    description: listing.description,
    imageUrls: [listing.mainImage.url_fullxfull],
    availability: {
      shipToLocationAvailability: {
        quantity: listing.quantity
      }
    },
    price: {
      value: listing.price,
      currency: listing.currency_code
    },
    condition: "NEW",
    packageWeightAndSize: {
      packageWeight: {
        value: listing.shipping_weight,
        unit: "LB"
      },
      packageDimensions: {
        length: listing.shipping_length,
        width: listing.shipping_width,
        height: listing.shipping_height,
        unit: "IN"
      }
    }
  };

  // make a POST request to the eBay Inventory API to create the new inventory item
  return fetch(ebayInventoryItemUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ebayApiKey}`
    },
    body: JSON.stringify(inventoryItem)
  });
}

console.log("hello")
    getTrendingListingsFromEtsy()
