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
      
            try {
              const response = await fetch("http://localhost:3000/api12/scan/ak", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ code: decodedText })
              });
             
              const result = await response.json();
              console.log("Server response:", result);
              
              // Display product information
            const productInfoDiv = document.getElementById('product-info');
            productInfoDiv.innerHTML = `
            <h2>AI Analysis</h2>
            <p>${result.answer}</p>`;
        //     productInfoDiv.innerHTML = `
        //   <h2>${result.name}</h2>
        //   <p><strong>Ingredients:</strong> ${result.ingredients}</p>
        //   <p><strong>Nutri-Score:</strong> ${result.nutriscore}</p>
        //   <h3>Nutritional Information:</h3>
        //   <ul>
        //     ${Object.entries(result.nutriments).map(([key, value]) => `<li>${key}: ${value}</li>`).join('')}
        //   </ul>
        // `;
            } catch (error) {
              console.error("Failed to send to server:", error);
            }
          },
        (errorMessage) => {
            // optional: console.log("Scan error:", errorMessage);
        }
    );
console.log("Render ends");  
console.log("Render ends2");   
});
