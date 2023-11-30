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

    // console.log(blockSizeInputValue, processSizeInputValue, "ssss")

    let blockSizeInputArray = blockSizeInputValue.split(',').map(function (item) {
        return parseInt(item);
    });

    let processSizeInputArray = processSizeInputValue.split(',').map(function (item) {
        return parseInt(item);
    });

    let blockSizeInputArrayLength = blockSizeInputArray.length

    let processSizeInputArrayLength = processSizeInputArray.length

    bestFit(blockSizeInputArray, blockSizeInputArrayLength, processSizeInputArray, processSizeInputArrayLength)


})

function bestFit(blockSize, m, processSize, n) {
    // Stores block id of the block allocated to a process 
    let allocation = new Array(n).fill(-1);

    // Pick each process and find suitable blocks according to its size and assign to it 
    for (let i = 0; i < n; i++) {
        // Find the best fit block for current process 
        let bestIdx = -1;
        for (let j = 0; j < m; j++) {
            if (blockSize[j] >= processSize[i]) {
                if (bestIdx === -1) {
                    bestIdx = j;
                } else if (blockSize[bestIdx] > blockSize[j]) {
                    bestIdx = j;
                }
            }
        }

        // If we could find a block for current process 
        if (bestIdx !== -1) {
            // Allocate block j to p[i] process 
            allocation[i] = bestIdx;

            // Reduce available memory in this block. 
            blockSize[bestIdx] -= processSize[i];
        }
    }

    console.log("Process No. Process Size     Block no.");
    for (let i = 0; i < n; i++) {
        console.log(`${i + 1}         ${processSize[i]}         ${allocation[i] !== -1 ? allocation[i] + 1 : "Not Allocated"}`);
    }
    // --------------
    for (let i = 0; i < n; i++) {
        tableContainer.insertAdjacentHTML("beforeend", `
        <tr>
        <td>${i + 1}</td>
        <td>${processSize[i]}</td>
        <td>${allocation[i] !== -1 ? allocation[i] + 1 : "Not Allocated"}</td>
        </tr>
       `)
    }
}

// Driver code
let blockSize = [100, 500, 200, 300, 600];
let processSize = [212, 417, 112, 426];
let m = blockSize.length;
let n = processSize.length;
bestFit(blockSize, m, processSize, n);

