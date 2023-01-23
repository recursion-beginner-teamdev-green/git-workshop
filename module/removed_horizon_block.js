
export function removed_horizon_block(block_arr)
{
    for(let i=0; i<block_arr.length; i++)
    {
        block_arr[i] = "empty";
    }
    return block_arr;
    
}

