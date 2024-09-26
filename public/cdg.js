 // Function to handle form submission
 document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const productName = document.getElementById('product-name').value;
    const productModel = document.getElementById('product-model').value;
    const productRevision = document.getElementById('product-revision').value;
    const uploadBOM = document.getElementById('upload-bom').files[0];

    // Log the form values
    console.log("Form Values:");
    console.log("Product Name:", productName);
    console.log("Product Model No:", productModel);
    console.log("Product Revision:", productRevision);
    console.log("Upload BOM File:", uploadBOM);

    // Prepare the form data for submission
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productModel', productModel);
    formData.append('productRevision', productRevision);
    formData.append('uploadBOM', uploadBOM);

    try {
        // Send data to the backend using fetch
        const response = await fetch('/cdg/add-product', {
            method: 'POST',
            body: formData // Use FormData for file uploads
        });

        // Log the response status
        console.log(`Response received from server with status: ${response.status}`);

        // Handle the response from the server
        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
        } else {
            const result = await response.json();
            console.log("Server response:", result); // Log the response or handle it as needed
            alert(result.message); // Display the server message to the user
        }
    } catch (error) {
        // Log any errors that occur during submission
        console.error("Error during submission:", error);
        alert('An error occurred. Please try again.');
    }
});