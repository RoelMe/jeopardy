const form = document.querySelector('form')
let catCount = 5
let qCount = 5
    
var currentTabParent = 0
var currentTabChild = 0

for (let c = 1; c <=catCount; c++) {
    let parent = document.createElement('div')
    parent.classList.add('tab', 'tab__parent')
    parent.innerHTML += `<div class="qa-wrapper">
                        <label class="block" for="cat${c}">Category ${c}</label>
                        <input type="text" name="cat${c}" class="block">
                        <p class="small">Error</p>
                    </div>`
    
    // console.log(parent)
    for (let q = 1; q <= qCount; q++) {
        n = q
        // console.log(`question ${q}`)
        let child = document.createElement('div')
        child.classList.add('tab', 'tab__child')
        child.innerHTML += `
        <div class="qa-wrapper">
            <div class="qa-wrapper__item">
                <label class="block" for="cat${c}a${q}">Category ${c} Answer ${q}</label>
                <textarea name="cat${c}__a${q}" class="block"></textarea>
                <p class="small">Error</p>
            </div>
            <div class="qa-wrapper__item">
                <label class="block" for="cat${c}__q${q}">Cat ${c} Clue ${q}</label>
                <textarea name="cat${c}__q${q}" class="block"></textarea>
                <p class="small">Error</p>
            </div>
        </div>`
    parent.append(child)
    }
form.append(parent)
}   

const buttons = document.createElement('div')
    buttons.innerHTML += `<div class="buttons">
                <button type='button' id='prevBtn' class="prev-next" onclick="prevNext(-1)">Previous</button>
                <button type='button' id='nextBtn' class="prev-next" onclick="prevNext(1)">Next</button>
            </div>`
form.append(buttons)

var parentTabs = document.querySelectorAll('.tab__parent')
    var childTabs = document.querySelectorAll('.tab__child')
    // console.log(childTabs)
    for(let p of parentTabs) {
        clueCount = p.childElementCount - 1
}

//this code works
// function showTab(c) {
//     childTabs[c].style.display = 'block'
//     if(c == 0) {
//         document.querySelector('#prevBtn').style.display = 'none'
//     } else {
//         document.querySelector('#prevBtn').style.display = 'inline'
//     }
//     if(c == (childTabs.length -1)) {
//         document.querySelector('#nextBtn').innerHTML = 'Submit'
//         document.querySelector('#nextBtn').style.backgroundColor = 'rgb(102, 255, 0)'
        
//     } else {
//         document.querySelector('#nextBtn').innerHTML = 'Next'
//         document.querySelector('#nextBtn').style.backgroundColor = 'var(--clr-accent)'
//     }
//     childTabs[c].parentElement.style.display = 'block'
// }

function showTab(c) {
    childTabs[c].style.display = 'block'
    if(c == 0) {
        document.querySelector('#prevBtn').style.display = 'none'
    } else {
        document.querySelector('#prevBtn').style.display = 'inline'
    }
    if(c == (childTabs.length -1)) {
        document.querySelector('#nextBtn').innerHTML = 'Submit'
        document.querySelector('#nextBtn').style.backgroundColor = 'var(--clr-limegreen)'
        
    } else {
        document.querySelector('#nextBtn').innerHTML = 'Next'
        document.querySelector('#nextBtn').style.backgroundColor = 'var(--clr-accent)'
    }
    childTabs[c].parentElement.style.display = 'block'
}
showTab(currentTabChild)


function prevNext(c) {
    childTabs[currentTabChild].style.display = 'none'
    currentTabChild = currentTabChild + c
    // console.log(currentTabChild)
    if ((currentTabChild % clueCount == 0 && c > 0) || (currentTabChild - c) % clueCount ==0 && c < 0) {
        parentTabs[currentTabParent].style.display = 'none'
        currentTabParent = currentTabParent + c
    }
    if (currentTabChild >= childTabs.length) {
        form.submit()
    } else {
        showTab(currentTabChild)
    }
}