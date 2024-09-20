document.addEventListener("DOMContentLoaded", () => {
    checkStockAndExpiration();
});



function checkStockAndExpiration() {
    const products = document.querySelectorAll('.product');
    const today = new Date();

    products.forEach(product => {
        const stock = parseInt(product.getAttribute('data-stock'));
        const expirationDate = new Date(product.getAttribute('data-expiration'));
        const stockInfo = product.querySelector('.stock-info');

        if ( stock > 0 && stock< 5 ) {
            stockInfo.textContent = `Low stock: Only ${stock} left`;
            stockInfo.style.color = 'red';
        } 

        if(stock == 0) {
            stockInfo.textContent = `Out of stock`;
            stockInfo.style.color = 'red';
        }
        /*else {
            stockInfo.textContent = `In stock: ${stock}`;
        }*/

        const timeDiff = expirationDate - today;
        const daysToExpire = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysToExpire <= 7 && daysToExpire > 0) {
           // alert(`Product "${product.querySelector('h2').textContent}" is expiring in ${daysToExpire} days.`);
        }

        else if (daysToExpire <= 0) {
           // alert(`Product "${product.querySelector('h2').textContent}" has expired.`);
           // product.style.display = 'none';
        }
    });
}


 // Get the elements
 const sidebar = document.getElementById('sidebar');
 const overlay = document.getElementById('overlay');
 const mainContent = document.getElementById('main-content');
 const barmenu = document.getElementById('hamburger-menu');
 const barmenulogo = document.getElementById('logo');

 // Function to open the sidebar
 function openSidebar() {
     sidebar.classList.add('open');
     overlay.style.display = 'block';
     mainContent.classList.add('blurred');
     
 }

 // Function to close the sidebar
 function closeSidebar() {
     sidebar.classList.remove('open');
     overlay.style.display = 'none';
     mainContent.classList.remove('blurred');
     
 }

 // Event listener for the overlay
 overlay.addEventListener('click', closeSidebar);
 overlay.addEventListener('click', closeBtn.onclick = function (){
    detail.style.display='none';
    
    //confirmModal.style.display = "none";  Hide the modal
    overlay.style.display = 'none';
    mainContent.classList.remove('blurred');
})
overlay.addEventListener('click', function(){
    confirmModal.style.display = "none";
})
overlay.addEventListener('click',closBtn.onclick = function (){
    pdform.style.display = 'none'
    overlay.style.display = 'none';
    mainContent.classList.remove('blurred');
})
 

 // Add event listener to open sidebar button
 document.getElementById('hamburger-menu').addEventListener('click', openSidebar);

// JavaScript to handle the active tab highlighting
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});



function viewDetails(button) {
    var product = button.closest('.product');
    const productName = product.querySelector('h2').textContent;
    const stock = product.getAttribute('data-stock');
    const unit = product.getAttribute('data-unit');
    const expirationDate = product.getAttribute('data-expiration');
    barcode = product.getAttribute('barcode');
    const Price = product.getAttribute('price');
    const Priceper = product.getAttribute('priceper');
    const img = product.querySelector('img').src;


    

    var exDate = document.getElementById('exDate');
    var pdName = document.getElementById('pdName');
    var pdstock = document.getElementById('pdstock');
    var pdunit = document.getElementById('pdunit');
    var brcode = document.getElementById('bcode');
    var detimg = document.querySelector('#info img');
    var price = document.getElementById('price');
    var pricerper = document.getElementById('pdpriceper');

    detail.style.display='block';
    exDate.textContent = expirationDate;
    pdName.textContent = productName;
    pdstock.textContent = `${stock} `;
    pdunit.textContent = unit;
    brcode.textContent = barcode;
    price.textContent = `ETB ${Price}.00`;
    pricerper.textContent =`/ ${Priceper}`;
    detimg.src = img;
    overlay.style.display = 'block';
    mainContent.classList.add('blurred');

    console.log(brcode.textContent);
    //alert(`Product: ${productName}\nStock: ${stock}\nExpiration Date: ${expirationDate}`);

    
 


    /*
    document.getElementById("deletebtn").addEventListener("click", function() {
        if (confirm("Are you sure you want to delete this item?")) {
            // If the user clicks "OK"
            if(product){
                product.remove();
                console.log("Item deleted.");
               // alert(`the item ${productName} was deleted `);
                detail.style.display='none'
                overlay.style.display = 'none';
                mainContent.classList.remove('blurred');
            }
            else{
                console.log("Div not found.");
                //alert(`the item ${productName} was not found `);
            }

            
            // Proceed with your delete action, like making an API call or redirecting
        } else {
            // If the user clicks "Cancel"
            console.log("Action cancelled.");
        }
    });


}*/


    // Get references to elements
    const deleteButton = document.getElementById("deletebtn");
    const confirmModal = document.getElementById("confirmModal");
    const confirmYes = document.getElementById("confirmYes");
    const confirmNo = document.getElementById("confirmNo");


    // Show the confirmation modal when the delete button is clicked
        deleteButton.addEventListener("click", function() {
        confirmModal.style.display = "flex"; // Show the modal
    });

    // When the user clicks "Yes"
    confirmYes.addEventListener("click", function() {
        if (product) {
        product.remove(); // Delete the div
        detail.style.display='none';
        overlay.style.display = 'none';
        mainContent.classList.remove('blurred');
        console.log("Div deleted.");
        }
        confirmModal.style.display = "none"; // Hide the modal
    });

    // When the user clicks "No"
    confirmNo.addEventListener("click", function() {
        confirmModal.style.display = "none"; // Hide the modal
    });

    // Optionally: Close modal if clicked outside
    window.onclick = function(event) {
        if (event.target == confirmModal) {
            confirmModal.style.display = "none";
        }
    };

}

//get user input
    const images_in = document.getElementById('edit-image-input').files;
    const name_in = document.getElementById('edit-product-name-input');
    const stock_in = document.getElementById('edit-quantity-input');
    const unit_in = document.getElementById('edit-Unit');
    const exdate_in = document.getElementById('edit-expirationDate-input');
    const price_in = document.getElementById("edit-price-input");
    const barcode_in = document.getElementById("edit-barcode");
    const priceper_in = document.getElementById("edit-priceper");

 function editinfo(){
    /*
    const pdName = document.getElementById('pdName');
    const pdstock = document.getElementById('pdstock');
    const exDate = document.getElementById('exDate');
    const brcode = document.getElementById('bcode');
    const detimg = document.querySelector('#info img');
    const price = document.getElementById('price');

    const product = button.closest('.product');
    const productName = product.querySelector('h2').textContent;
    const stock = product.getAttribute('data-stock');
    const expirationDate = product.getAttribute('data-expiration');
    const barcode = product.getAttribute('barcode');
    const Price = product.getAttribute('price');
    const img = product.querySelector('img').src;

    exDate.textContent = expirationDate;
    pdName.textContent = productName;
    pdstock.textContent = stock;
    brcode.textContent = barcode;
    price.textContent = `ETB ${Price}.00`;
    detimg.src = img;*/

    

    
   console.log(barcode);
    name_in.placeholder = pdName.textContent;
    stock_in.placeholder = pdstock.textContent;
    unit_in.placeholder = pdunit.textContent;
   // exdate_in.placeholder = exDate.textContent;
    price_in.placeholder = price.textContent;
    barcode_in.placeholder = barcode  ;



    
} 







// Get Elements for the edit button and form
    const editButton = document.getElementById('editbtn');
    const editForm = document.getElementById('editform');
    const detail = document.getElementById('detail');
    const editmodal = document.getElementById('editModal');
    const editclose = document.getElementById('editcloseBtn');
    const editconfirmYes = document.getElementById("editconfirmYes");
    const editconfirmNo = document.getElementById("editconfirmNo");

    editButton.addEventListener('click', function(){
    // alert('hahaha');
        editForm.style.display = 'flex';
        detail.style.display = 'none';
        editinfo();
        console.log('hahaha')
    });

    editclose.addEventListener('click', function(){
        editmodal.style.display = 'flex';
    });


document.getElementById('editform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    //alert(`hahahahahahah`);
    //editForm.style.display = 'flex';
    editForm.style.display = 'none';
    detail.style.display = 'block';

    console.log(name_in);
    if(name_in.value){
        pdName.textContent = `${name_in.value}`;
        alert('the name has been chaged');
    }

    if(stock_in.value){
        pdstock.textContent = `${stock_in.value}`;
        //product.setAttribute('data-stock', stock_in.value);
        console.log('the stock has been chaged');
    }

    if(unit_in.value){
        pdunit.textContent = `${unit_in.value}`;
        console.log('the measuring unit has been chaged');
    }

    if(exdate_in.value){
        exDate.textContent = `${exdate_in.value}`;
        console.log('the expiration date has been chaged');
    }

    if(price_in.value){
        price.textContent = `${price_in.value}`;
        console.log('the price has been chaged');
    }
    
    //if(barcode_in.value){
    //    brcode.textContent = `${barcode_in.value}`;
    //    console.log('the barcode has been chaged');
    //}

    if(priceper_in.value){
        priceper.textContent = `${priceper_in.value}`;
        console.log('the priceper has been chaged');
    }
    //alert(`hahahahahahah`);
    
});
    
/*
 pdName , pdstock,  exDate, barcode, detimg, price*/
  
   

editconfirmYes.addEventListener('click', function(){
    editForm.style.display = 'none';
    editmodal.style.display = 'none';
    detail.style.display = 'block';
    console.log('change has been discarded');
});
editconfirmNo.onclick = function(){
    editmodal.style.display = 'none';
    console.log('changes are pending');
}
window.onclick = function(event) {
    if (event.target == editmodal) {
        editmodal.style.display = "none";
    }
};





addBtn.onclick = function (){
    pdform.style.display = 'block' ;
    overlay.style.display = 'block';
    mainContent.classList.add('blurred');
}

closeBtn.onclick = function closeBtn(){
    detail.style.display='none'
    overlay.style.display = 'none';
    mainContent.classList.remove('blurred');
   
}

closBtn.onclick = function (){
    pdform.style.display = 'none'
    overlay.style.display = 'none';
    mainContent.classList.remove('blurred');
}

function searchProducts() {
    const searchBar = document.querySelector('.search-bar input');
    const searchTerm = searchBar.value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Add event listener for keypress on the search input
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission
        searchProducts(); // Call the search function
    }
});














// script.js
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    const product = document.getElementById('main-content');
    const images = document.getElementById('image-input').files;
    const name = document.getElementById('product-name-input').value;
    const stock = document.getElementById('quantity-input').value;
    const exdate = document.getElementById('expirationDate-input').value;
    const price = document.getElementById("price-input").value;
    const barcode = document.getElementById("barcode").value;
    const priceper = document.getElementById("priceper").value;

    const loader = document.getElementById('loader');

    // Loop through the selected images (if any)
    for (let i = 0; i < images.length; i++) {
        const file = images[i];

        // Check if the file is an image
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            // Load the image
            reader.onload = function(e) {
                // Create a new div for the data entry
                const dataEntry = document.createElement('div');
                dataEntry.className = 'product';

                // Create an image element and set the source
                const img = document.createElement('img');
                img.src = e.target.result;
                dataEntry.appendChild(img);

                // Create and append the name data
                if (name) {
                    const textData = document.createElement('h2');
                    textData.className = 'pdname';
                    textData.textContent = `${name}`;
                    dataEntry.appendChild(textData);
                }

                // Create and append the stock data
                

                if (barcode) {
                    dataEntry.setAttribute('barcode', barcode);
                }
                else{
                    dataEntry.setAttribute('barcode', '0000000000000');
                }

                if(priceper) {
                    dataEntry.setAttribute('priceper', priceper);
                }

                if (price) {
                    const priceinfo = document.createElement('p');
                    dataEntry.setAttribute('Price', price);
                    
                    priceinfo.className = 'price-info';
                    priceinfo.textContent = `ETB ${price}.00/${priceper}`;
                    dataEntry.appendChild(priceinfo);
                }

                // Create and append the exdate data
                if (exdate) {
                    dataEntry.setAttribute('data-expiration', exdate);
                    
                   // 
                }
                const viewBtn = document.createElement('button');
                viewBtn.setAttribute('onclick', 'viewDetails(this)');
                viewBtn.textContent='View Detail';
                dataEntry.appendChild(viewBtn);

                if (stock) {
                    dataEntry.setAttribute('data-stock', stock);
                
                    const stockinfo = document.createElement('p');
                    stockinfo.className = 'stock-info';
                    dataEntry.appendChild(stockinfo);
                    
                }

                // Append the data entry to the grid container
                product.appendChild(dataEntry);
            }

            // Read the file as a data URL
            reader.readAsDataURL(file);


             // Show the loader
             loader.style.display = 'flex';

             
             // After 3 seconds, hide the loader and show the content
             setTimeout(function() {
                 loader.style.display = 'none';
                 product.style.display = 'flex';
 
                 // Scroll to the bottom of the content
                 product.scrollIntoView({ behavior: 'smooth', block: 'end' });
             }, 2500);  // 2500 milliseconds = 2.5 seconds
        }
    }
    function close(){
        pdform.style.display = 'none'
        overlay.style.display = 'none';
        mainContent.classList.remove('blurred');
    }
    close();
});



document.addEventListener("DOMContentLoaded", () => {
    checkStockAndExpiration();
    observeProductList();  // Call the function to start observing changes
});

function observeProductList() {
    const productContainer = document.getElementById('main-content');  // The container for the products

    const config = { childList: true, subtree: true };  // Watch for added/removed child elements

    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Re-run the stock and expiration check whenever a new product is added
                checkStockAndExpiration();
            }
        }
    });

    // Start observing the product container
    observer.observe(productContainer, config);
}


