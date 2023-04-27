const url = "https://api.adviceslip.com/advice";
const hashId = document.querySelector(".card-title span");
const btn = document.querySelector(".card-btn");
const cardTxt = document.querySelector(".card-para");
async function getAdvice() {
  try {
    const getRequst = await fetch(url);
    if (getRequst.status === 404) {
      throw new Error("Page not found");
    } else if (getRequst.status === 500) {
      throw new Error("Server error");
    } else if (!getRequst.ok) {
      throw new Error(`HTTP error! status: ${getRequst.status}`);
    }
    const getJson = await getRequst.json();
    setData(getJson.slip);
    //after getting the result, show the animation
    cardTxt.classList.remove("card-para--fadeOut");
    cardTxt.classList.add("card-para--fadeIn");
  } catch {
    (err) => console.log(err);
  }
}
getAdvice();
function setData(json) {
  hashId.textContent = json.id;
  cardTxt.textContent = `"${json.advice}"`;
  cardTxt.classList.remove("card-para--fadeIn");
}
btn.addEventListener("click", () => {
  //before gettting the result, fade out the old text
  cardTxt.classList.add("card-para--fadeOut");
  setTimeout(() => {
    getAdvice();
  }, 500); // wait for fade out animation to complete
});
