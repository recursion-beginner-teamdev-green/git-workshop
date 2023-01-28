export const setTopscore = (score_val) => {
    localStorage.setItem("top_score", score_val);
};

export const getTopScore = () => localStorage.getItem("top_score")

export const isTopscore = (score_val) => {
  let current_score = parseInt(getTopScore());
  if (current_score < score_val) {
    return true;
  }
  return false;
};

/* test

store_score(40);
console.log(localStorage.getItem("top_score")) -> 40

store_score(20);
console.log(localStorage.getItem("top_score")); -> 40

*/
