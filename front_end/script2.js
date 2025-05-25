window.console.log(document.body);
console.dir(document.body);

document.getElementById('scan-button').addEventListener('click', () => {
    const formatsToSupport = [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.CODE_128
    ];
    
    const scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: 250,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        formatsToSupport: formatsToSupport
    }, false);

    console.log("Render begin");

    scanner.render(
        async function (decodedText) {
            console.log("Scanned result:", decodedText);
            alert(`Scanned: ${decodedText}`);
            const url = `https://world.openfoodfacts.net/api/v2/product/${decodedText}`;
            try {
              const response = await fetch(url);
              const data = await response.json();

              if (data.status === 1) {
                console.log("Product name:", data.product.product_name);
                console.log(data.product); // View full data

                const result = data.product;
                //console.log("Server response:", result);
                
                // Display product information
                const productInfoDiv = document.getElementById('product-info');
                productInfoDiv.innerHTML = `
                <h2>${result.product_name}</h2>
                <p><strong>Ingredients:</strong> ${result.ingredients_text}</p>
                <p><strong>Nutri-Score:</strong> ${result.nutriscore_grade}</p>
                <h3>Nutritional Information:</h3>
                <ul>
                  ${Object.entries(result.nutriments).map(([key, value]) => `<li>${key}: ${value}</li>`).join('')}
                </ul>
                `;

              } else {
                console.log("Product not found");
              }
            } 
            catch (error) {
              console.error("Fetch error:", error);
            }
            }
          ,
        (errorMessage) => {
            // optional: console.log("Scan error:", errorMessage);
        }
    );
console.log("Render ends");  
console.log("Render ends2");
  }
);
