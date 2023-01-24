
export function store_score(score_val)
{
	top_score = localStorage.getItem('top_score');
    if(istopscore(score_val))
    {
    	localStorage.setItem("top_score",score_val);
    }

}

function istopscore(score_val){
	current_score = parseInt(localStorage.getItem('top_score'));
    if (current_score < score_val)
    {
    	return true;
    }
    return false;
}

/* test

store_score(40);
console.log(localStorage.getItem("top_score")) -> 40

store_score(20);
console.log(localStorage.getItem("top_score")); -> 40

*/