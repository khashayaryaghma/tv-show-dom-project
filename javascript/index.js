const fetchUsers = async () => {
  try {
    const res = await fetch("https://api.tvmaze.com/shows/82/episodes");
    let data = await res.json();
    return data;
  } catch (error) {
    console.error("something went wrong", error);
  }
};
const main = document.querySelector("main");
const search = document.querySelector("input");
const select = document.querySelector("select");
fetchUsers()
  .then((data) => {
    for (const el of data) {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const h4 = document.createElement("h4");
      const anchor = document.createElement("a");
      const detail = document.createElement("details");
      const sum = document.createElement("summary");
      const rat = document.createElement("p");
      const opt = document.createElement("option");
      opt.textContent = `S0${el.season}E0${el.number}` + " - " + el.name;
      rat.textContent = "rating : " + el.rating.average;
      sum.textContent = "summary";
      detail.appendChild(sum);
      img.src = el.image.medium;
      h4.textContent = `S0${el.season}E0${el.number}` + " - " + el.name;
      div.classList.add("card");
      anchor.classList.add("links");
      anchor.href = el.url;
      anchor.appendChild(h4);
      div.append(img, rat, anchor, detail);
      main.appendChild(div);
      select.appendChild(opt);
      detail.innerHTML += el.summary;
      search.addEventListener("keyup", () => {
        let searchTerm = search.value;
        select.value = "All Episodes"
        if (
          el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          el.summary.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          div.classList.remove("hide");
        } else {
          div.classList.add("hide");
        }
      });
      select.addEventListener("change",()=>{
        search.value = ""
        if (!select.value.includes(h4.textContent)) {
          div.classList.add("hide")
        }else{
          div.classList.remove("hide")
        }
        if(select.value === "All Episodes"){
          div.classList.remove("hide")
        } 
      })
    }
  })
  .catch((er) => console.log(er));
