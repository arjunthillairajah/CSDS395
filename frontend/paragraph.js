document.addEventListener("DOMContentLoaded", function() {
    // Get all links with the class 'link'
    const links = document.querySelectorAll('.link');
  
    // Create an array of promises to fetch content for all links in parallel
    const fetchPromises = Array.from(links).map(async (link) => {
      const url = link.getAttribute('href');
      const contentDiv = link.closest('.link-container').querySelector('.content');
  
      // Clear any existing content and show "Loading..." text
      contentDiv.innerHTML = "Loading...";
  
      // Use a CORS proxy to bypass the CORS restrictions
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  
      try {
        const response = await fetch(proxyUrl);
        const data = await response.json();
        const html = data.contents; // The actual HTML content of the page
  
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
  
        // Select only the first paragraph <p>
        const firstParagraph = doc.querySelector('p');
  
        // Clear loading text and add the first paragraph
        contentDiv.innerHTML = ""; // Clear loading text
        if (firstParagraph) {
          const paragraph = document.createElement('p');
          paragraph.textContent = firstParagraph.textContent;
          contentDiv.appendChild(paragraph);
        } else {
          contentDiv.innerHTML = "No paragraph found.";
        }
      } catch (error) {
        contentDiv.innerHTML = "Error loading content.";
        console.error("Error fetching content:", error);
      }
    });
  
    // Run all fetch operations in parallel using Promise.all
    Promise.all(fetchPromises)
      .then(() => {
        console.log("All content loaded");
      })
      .catch(error => {
        console.error("Error loading one or more pieces of content", error);
      });
  });