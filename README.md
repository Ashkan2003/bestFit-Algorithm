# bestFit-Algorithm
## Best fit allocates the process to a partition which is the smallest sufficient partition among the free available partitions. <br/>
### The time complexity of Best-Fit algorithm is O(n2) as it requires two loops to process the memory blocks and processes. The outer loop is used to iterate through the processes and the inner loop is used to iterate through the blocks.
The space complexity of Best-Fit algorithm is O(n) as it requires an array of size n to store the block allocation for each process.
Is Best-Fit really best? 
Although, best fit minimizes the wastage space, it consumes a lot of processor time for searching the block which is close to required size. Also, Best-fit may perform poorer than other algorithms in some cases. For example, see below exercise.
Example: Consider the requests from processes in given order 300K, 25K, 125K and 50K. Let there be two blocks of memory available of size 150K followed by a block size 350K.
Best Fit: 
300K is allocated from block of size 350K. 50 is left in the block. 
25K is allocated from the remaining 50K block. 25K is left in the block. 
125K is allocated from 150 K block. 25K is left in this block also. 
50K can’t be allocated even if there is 25K + 25K space available.
First Fit: 
300K request is allocated from 350K block, 50K is left out. 
25K is be allocated from 150K block, 125K is left out. 
Then 125K and 50K are allocated to remaining left out partitions. 
So, first fit can handle requests.
