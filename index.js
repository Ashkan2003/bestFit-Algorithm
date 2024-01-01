let $ = document

const blockSizeInput = $.querySelector('#block-size-input')
const processSizeInput = $.querySelector('#process-size-input')
const tableContainer = $.querySelector('#table-body')
const runBtn = $.querySelector('#run-btn')

let blockSizeInputValue;
let processSizeInputValue;

runBtn.addEventListener('click', function (event) {
    tableContainer.innerHTML = ""
    event.preventDefault()

    blockSizeInputValue = blockSizeInput.value
    processSizeInputValue = processSizeInput.value


    let blockSizeInputArray = blockSizeInputValue.split(',').map(function (item) {
        return parseInt(item);
    });

    let processSizeInputArray = processSizeInputValue.split(',').map(function (item) {
        return parseInt(item);
    });

    let blockSizeInputArrayLength = blockSizeInputArray.length

    let processSizeInputArrayLength = processSizeInputArray.length

    console.log(blockSizeInputArray, blockSizeInputArrayLength, processSizeInputArray, processSizeInputArrayLength)
    bestFit(blockSizeInputArray, blockSizeInputArrayLength, processSizeInputArray, processSizeInputArrayLength)


})

function bestFit(blockArray, blockArrayLength, processArray, processArrayLength) {
    // Stores block id of the block allocated to a process 
    let allocation = new Array(processArrayLength).fill(-1); // create a array of length of processArrayLength and fill its items with "-1" like [-1, -1, -1, -1]
    
    // Pick each process and find suitable blocks according to its size and assign to it 
    for (let i = 0; i < processArrayLength; i++) {
        // Find the best fit block for current process 
        let bestIdx = -1;
        for (let j = 0; j < blockArrayLength; j++) {
            if (blockArray[j] >= processArray[i]) {
                if (bestIdx === -1) {
                    bestIdx = j;
                } else if (blockArray[bestIdx] > blockArray[j]) {
                    bestIdx = j;
                }
            }
        }

        // If we could find a block for current process 
        if (bestIdx !== -1) {
            // Allocate block j to p[i] process 
            allocation[i] = bestIdx;
            // Reduce available memory in this block. 
            blockArray[bestIdx] -= processArray[i];
        }
    }
    console.log(allocation,"aaa")
    console.log("Process No. Process Size  Block no. blockLeftOver");
    for (let i = 0; i < processArrayLength; i++) {
        console.log(`${i + 1}         ${processArray[i]}         ${allocation[i] !== -1 ? allocation[i] + 1 : "Not Allocated"}         ${blockArray[allocation[i]]}`);
    }
    // --------------
    for (let i = 0; i < processArrayLength; i++) {
        tableContainer.insertAdjacentHTML("beforeend", `
        <tr>
        <td>${i + 1}</td>
        <td>${processArray[i]}</td>
        <td>${allocation[i] !== -1 ? allocation[i] + 1 : "Not Allocated"}</td>
        <td>${blockArray[allocation[i]]}</td>
        </tr>
       `)
    }
}

// Driver code
let blockArray = [100, 500, 200, 300, 600];
let processArray = [212, 417, 112, 426];
let blockArrayLength = blockArray.length;
let processArrayLength = processArray.length;
bestFit(blockArray, blockArrayLength, processArray, processArrayLength);

