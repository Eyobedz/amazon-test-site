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

    
} 

addBtn.onclick = function (){
    alert(`YOU ARE NOT AN ADMIN USER YOU CAN NOT ADD PRODUCTS`);
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
            // Add event listener for keypress on the search input
            const searchInput = document.querySelector('.search-bar input');
            searchInput.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    event.preventDefault(); // Prevent the default form submission
                    searchProducts(); // Call the search function
                }
            });
        }
    });
}

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


