

//  let input = '';
//  let keywords ='';
//  let filteredItemsContainer='';

// //  takeInput();
// //  function takeInput(){
// //  setTimeout(()=>{
// //   input =prompt("Enter keywords to filter:", "")
// //   keywords =input.split(' ').filter(Boolean);  
// //   console.log(keywords);
// //   filterItems();
// // }, 2000);
// // }


// function filterItems(){

//   setTimeout(() => {

//     input =prompt("Enter keywords to filter:", "")
    
//   keywords =input.split(' ').filter(Boolean);
//   console.log(keywords);
//   filteredItemsContainer = document.querySelector('.mn-invitation-list__container');

//     // const keywords =input.split(' ').filter(Boolean);  
//     const items = document.getElementsByClassName('invitation-card artdeco-list__item');
    // for (let i = 0; i < items.length; i++) {
    //   items[i].style.display = 'none'; // Hide all invitations
    // }
//     arr=[];let c=0;
//     for(let i=0;i<items.length;i++){
//     const res=items[i];
//     const subtitle = res.getElementsByClassName ('invitation-card__subtitle')[0].innerText;
//     if (subtitle && filterByKeyword(subtitle, keywords)) {
//        console.log('Matching Item:', subtitle); 
//      arr[c]=res;c++;
//     }
    
    
//   }
//   for(let i=0;i<arr.length;i++){
//     arr[i].style.display =''
//   }

//   }, 10000);
// }

//   function filterByKeyword(text, keywords) {
//     const lowerText = text.toLowerCase();
//     return keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
//   }
//   // Detect URL changes and trigger the filter function
// let currentUrl = window.location.href; // Store the initial URL

// // Override the pushState method to detect page URL changes
// const originalPushState = history.pushState;
// history.pushState = function(...args) {
//   originalPushState.apply(history, args); // Call the original pushState method
//   console.log('URL changed via pushState, applying filter...');
//   filterItems();
// };


// const originalReplaceState = history.replaceState;
// history.replaceState = function(...args) {
//   originalReplaceState.apply(history, args); // Call the original replaceState method
//   console.log('URL changed via replaceState, applying filter...');
//   filterItems(); // Call the filtering function after URL change
// };

// // Use setInterval to monitor the URL for changes periodically
// setInterval(() => {
//   if (window.location.href !== currentUrl) {
//     console.log('URL changed, applying filter...');
//     currentUrl = window.location.href; // Update the current URL
//     filterItems(); // Apply the filter when the URL changes
//   }
// }, 500); // Check every second

// // Wait for the page to load and invoke the filter function
// window.onload = function() {
//   setTimeout(function() {
//     filterItems(); // Apply initial filtering when page loads
//   }, 500); // Delay to allow dynamic content to load
// };
 
let input = '';
let keywords = '';
let filteredItemsContainer = '';

function filterItems() {
  setTimeout(() => {
    input = prompt("Enter keywords to filter:", "");
    keywords = input.split(' ').filter(Boolean);

    filteredItemsContainer = document.getElementsByClassName('.artdeco-list mn-invitation-list');

    const items = document.getElementsByClassName('invitation-card artdeco-list__item');
    for (let i = 0; i < items.length; i++) {
      items[i].style.display = 'none'; // Hide all invitations
    }
    const itemArr = []; 
    for (let i = 0; i < items.length; i++) {
      const res = items[i];
      const subtitle = res.getElementsByClassName('invitation-card__subtitle')[0].innerText;

      if (subtitle) {
        const matchCount = calculateMatchCount(subtitle, keywords);

        if (matchCount > 0) {
          // Store item and its match count
          itemArr.push({ element: res, matchCount: matchCount });
        }
      }
    }

    // Sort the items by match count in descending order
    itemArr.sort((a, b) => b.matchCount - a.matchCount);
  arr=[];let c=0;
    // Display sorted items based on match count
    filteredItemsContainer.innerHTML = 'none';
    itemArr.forEach(item => {
      console.log(item.element.getElementsByClassName('invitation-card__subtitle')[0].innerText+" "+item.matchCount);
    
      arr[c]=item.element;
      c++;
    });
    
    for (let i = 0; i < arr.length; i++) {
      
      arr[i].style.display='';
    }
  }, 8000);  
}


function calculateMatchCount(text, keywords) {
  const lowerText = text.toLowerCase();
  let matchCount = 0;

  // Loop through each keyword and check if it matches in the text
  keywords.forEach(keyword => {
    if (lowerText.includes(keyword.toLowerCase())) {
      matchCount++;  // Increment match count for each matched keyword
    }
  });

  return matchCount;
}

function filterByKeyword(text, keywords) {
  const lowerText = text.toLowerCase();
  return keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
}

let currentUrl = window.location.href; // Store the initial URL

const originalPushState = history.pushState;
history.pushState = function(...args) {
  originalPushState.apply(history, args); // Call the original pushState method
  console.log('URL changed via pushState, applying filter...');
  filterItems();
};

const originalReplaceState = history.replaceState;
history.replaceState = function(...args) {
  originalReplaceState.apply(history, args); 
  console.log('URL changed via replaceState, applying filter...');
  filterItems();
};

setInterval(() => {
  if (window.location.href !== currentUrl) {
    console.log('URL changed, applying filter...');
    currentUrl = window.location.href; 
    filterItems(); 
  }
}, 500); 
window.onload = function() {
  setTimeout(function() {
    filterItems(); 
  }, 500); 
};
