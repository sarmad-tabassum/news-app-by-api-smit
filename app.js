let getDiv = document.getElementById("show");

function searchNews() {
  let getInp = document.getElementById("inp");
  let query = getInp.value.trim(); // trim() start or end ki extra spaces khatam karta h

  if (!query) {
    alert("Please enter a keyword to search.");
    return;
  }

  getDiv.innerHTML = "";

  fetch(
    `https://newsdata.io/api/1/news?apikey=pub_77c17324d7e34f22b8244737585f02ac&q=${encodeURIComponent(query)}&language=en`,
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //   console.log(data.results);
      if (!data.results || data.results.length == 0) {
        getDiv.innerHTML = "<p>No news found for this topic.</p>";
        return;
      }

      data.results.forEach((article) => {
        console.log(article.pubDate);
        
        let description = article.description || "No description available.";
        if (description.length > 150) {
          description = description.substring(0, 150) + "...";
        }

        getDiv.innerHTML += `
    <div class="abc">
        <img src="${article.image_url || "https://techouse.com.pk/wp-content/themes/ryse/assets/images/no-image/No-Image-Found-400x264.png"}" alt="news-img" />
        <div class='news-content'>
            <h2 class='news-title'>${article.title}</h2>
            <p class="news-description">${description}</p>
            <p class="author">${
              article.creator ? article.creator.join(", ") : "Unknown Author"
            }</p>
            <p class="date">${
              article.pubDate
                ? new Date(article.pubDate).toLocaleString()
                : "No date"
            }</p>
            <a class="read-more" href="${article.link}" target="_blank">Read More</a>
        </div> 
    </div>
  `;
      });
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      getDiv.innerHTML = "<p>Error fetching news. Try again later.</p>";
    });
}
