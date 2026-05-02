// Fetch from JSON file
fetch("travel_recommendation_api.json")
  .then(res => res.json())
  .then(data => {
      document.getElementById("searchBtn").addEventListener("click", () => {
          const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
          handleSearch(keyword, data);
      });

      document.getElementById("resetBtn").addEventListener("click", clearResults);
  })
  .catch(err => console.error("Error loading JSON:", err));


//Search main
function handleSearch(keyword, data) {
    let results = [];

    if (keyword === "beach" || keyword === "beaches") {
        results = data.beaches;
    }
    else if (keyword === "temple" || keyword === "temples") {
        results = data.temples;
    }
    else if (keyword === "country" || keyword === "countries") {
        data.countries.forEach(country => {
            country.cities.forEach(city => results.push(city));
        });
    }
    else {
        results = []; 
    }

    displayResults(results);
}

// Display the results in a grid
function displayResults(results) {
    const container = document.getElementById("searchedResults");
    container.innerHTML = "<h1>Seach Results...</h1>";
    container.style.textAlign = "center";
    container.style.color = "white";
    const home_content = document.getElementById("homeContent");
    home_content.style.display = "none";

    if (results.length === 0) {
        container.innerHTML = "<p>No results were found.</p>";
        return;
    }

    container.style.display = "grid";container.style.gap = "20px";
    container.style.width = "75%";
    container.style.margin = "0 auto";

    results.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("result-card");

        card.innerHTML = `
            <h3>${item.name}</h3>
            <img src="${item.imageUrl}" alt="${item.name}" style="width:100%; height:180px; object-fit:cover;">
            <p>${item.description}</p>
        `;

        container.appendChild(card);
    });
}


//Clearing our results and removing HTML from page
function clearResults() {
    document.getElementById("searchInput").value = "";
    document.getElementById("searchedResults").innerHTML = "";
    document.getElementById("homeContent").style.display = "flex";
}
