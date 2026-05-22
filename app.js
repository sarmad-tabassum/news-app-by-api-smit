let show = document.getElementById("show");
let loadMore = document.getElementById("loadMore");
let nextPg = null;

function render(data) {
  // console.log(data);
  data.forEach((article) => {
    let description = article.description || "No description available.";
    if (description.length > 150) {
      description = description.substring(0, 150) + "...";
    }

    show.innerHTML += `
          <div class="abc">
          <img src="${article.image_url || "https://techouse.com.pk/wp-content/themes/ryse/assets/images/no-image/No-Image-Found-400x264.png"}" />
          <div class='news-content'>
          <h2 class='news-title'>${article.title}</h2>
          <p class="news-description">${description}</p>
          <p class="author">${article.creator ? article.creator.join(", ") : "Unknown"}</p>
          <p class="date">${article.pubDate ? new Date(article.pubDate).toLocaleString() : "No date"}</p>
          <a class="read-more" href="${article.link}" target="_blank">Read More</a>
          </div>
          </div>
          `;
  });
}

loadMore.addEventListener("click", () => {
  fetch(
    `https://newsdata.io/api/1/news?apikey=pub_271291cdafdf43cda9cc5cf01f786f24&language=en&page=${nextPg}`,
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.results || data.results.length == 0) {
        loadMore.style.display = "none";
        return;
      }

      // console.log(data);
      nextPg = data.nextPage || null;
      render(data.results);
    })

    .catch((err) => {
      console.error("Load more error:", err);
    });
});

function searchNews(defaultQ = "tesla") {
  let getInp = document.getElementById("inp");
  let query = getInp.value.trim() || defaultQ; // trim() start or end ki extra spaces khatam karta h

  show.innerHTML = "";
  loadMore.style.display = "block";

  fetch(
    `https://newsdata.io/api/1/news?apikey=pub_271291cdafdf43cda9cc5cf01f786f24&q=${query}&language=en`,
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data.nextPage);
      if (!data.results || data.results.length == 0) {
        show.innerHTML = "<p>No news found for this topic.</p>";
        return;
      }

    //   console.log(data);

      nextPg = data.nextPage;
      render(data.results);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      show.innerHTML = "<p>Error fetching news. Try again later.</p>";
    });
}

window.onload = () => {
  searchNews();
};

document.getElementById("inp").addEventListener("keypress", (e) => {
  // console.log(e.key == 'Enter');
  if (e.key == "Enter") {
    searchNews();
  }
});
