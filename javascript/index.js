const fetchUsers = async () => {
  try {
    const res = await fetch("https://api.tvmaze.com/shows/82/episodes");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("something went wrong", error);
  }
};

const main = document.querySelector("main");
const search = document.querySelector(".search");

fetchUsers().then((data)=>{
for (const el of data) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const h4 = document.createElement("h4");
  const anchor = document.createElement("a");
  const detail = document.createElement("details");
  const sum = document.createElement("summary");
  const rat = document.createElement("p");
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
  detail.innerHTML += el.summary;
}
}).then(()=>{});

// const results = document.querySelector(".results");
// let searchTerm = "";
// search.addEventListener("input" , (e)=>{
//   searchTerm = e.target.value.toLowerCase();
//   showList()
// });
// const showList =()=>{
//   data.filter((el)=>{
//     return el.name.toLowerCase().includes(searchTerm) || el.summary.toLowerCase().includes(searchTerm)
//   }).forEach((ele)=>{
//     console.log(ele);
//   })
// }


