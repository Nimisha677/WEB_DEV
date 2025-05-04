const express = require("express");
const path = require('path');
const app = express();
//const fetch = require('node-fetch');


// Middleware to parse JSON bodies
app.use(express.json());

// Specific route handler for GET /hello
app.use(express.static(path.join(__dirname, 'front_end')));

app.post("/api/scan", async (req, res) => {
    const { code } = req.body; // Extract 'code' from the request body
    console.log("Received scanned code:", code);
  
    // Perform any necessary processing with 'code' here
  
    /* res.json({ success: true, message: `Received: ${code}` }); */

    try {
        const response = await fetch(`https://world.openfoodfacts.net/api/v2/product/${code}`);
        const data = await response.json();
        if (data.status === 1) {
          const product = data.product;
          res.json({
            name: product.product_name,
            generic_name: product.generic_name,
            brands: product.brands,
            quantity: product.quantity,
            packaging: product.packaging,
            categories: product.categories,
            labels: product.labels,
            countries: product.countries,
            manufacturing_places: product.manufacturing_places,
            emb_codes: product.emb_codes,
            expiration_date: product.expiration_date,
            ingredients: product.ingredients_text,
            allergens: product.allergens,
            traces: product.traces,
            additives: product.additives_tags,
            ingredients_analysis: product.ingredients_analysis_tags,
            nutriments: product.nutriments,
            serving_size: product.serving_size,
            nutrition_score_fr: product.nutrition_score_fr_100g,
            nutrition_score_uk: product.nutrition_score_uk_100g,
            nova_group: product.nova_group,
            nutriscore: product.nutrition_grades,
            carbon_footprint_100g: product.carbon_footprint_100g,
            ecoscore_grade: product.ecoscore_grade,
            ecoscore_score: product.ecoscore_score,
            packaging_tags: product.packaging_tags,
            image_url: product.image_url,
            image_ingredients_url: product.image_ingredients_url,
            image_nutrition_url: product.image_nutrition_url,
            creator: product.creator,
            created_t: product.created_t,
            last_modified_t: product.last_modified_t,
            states_tags: product.states_tags
          });
          
        } else {
          res.status(404).json({ error: "Product not found." });
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        res.status(500).json({ error: "Internal server error." });
      }
  });

// Server setup
app.listen(3000, () => {
    console.log("Server is Running");
});
