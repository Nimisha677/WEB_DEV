document.getElementById('scan-button').addEventListener('click', function () {
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
    
    scanner.render(
        (decodedText, decodedResult) => {
            console.log("Scanned result:", decodedText);
            alert(`Scanned: ${decodedText}`);
        },
        (errorMessage) => {
            // optional: console.log("Scan error:", errorMessage);
        }
    );
    
});
