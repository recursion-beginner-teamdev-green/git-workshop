
export function score(block_arr)
{
    let score_counter = 0 ;  
    let res = 0 ;
    const is_empty = (value) => value != "empty";

    for (let i = 0; i < Object.keys(block_arr).length; i++)
    {   
        //　配列の中に"empty"が１つ以上あるか確認
        if(block_arr[i].every(is_empty))
        {
        		console.log(block_arr[i]);
            score_counter++
            // 配列の要素をemptyに更新
            removed_horizon_block(block_arr[i])
        }
    }
    res = score_counter * 10;
    return res; 
}


/*
input = {
    0: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    1: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    10: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    11: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    12: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    13: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    14: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    15: ["empty", "red", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    16: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    17: ["empty", "blue", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    18: ["red", "red", "red", "red", "block", "red", "red", "red", "red", "red"],
    19: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    2: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    3: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    4: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    5: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    6: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    7: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    8: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    9: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"]
  };

output = 10
*/
