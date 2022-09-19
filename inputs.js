var parentTabs = document.querySelectorAll('.tab__parent')
var childTabs = document.querySelectorAll('.tab__child')
for(let p of parentTabs) {
    clueCount = p.childElementCount - 1
    console.log(`this category has ${clueCount} clues`)
}
const form = document.querySelector('form')
var currentTabParent = 0
var currentTabChild = 0
// showTabParent(currentTabParent)
// showTabChild(currentTabChild)
showTab(currentTabChild)

function showTab(c) {
    childTabs[c].style.display = 'block'
    if(c == 0) {
        document.querySelector('#prevBtn').style.display = 'none'
    } else {
        document.querySelector('#prevBtn').style.display = 'inline'
    }
    if(c == (childTabs.length -1)) {
        document.querySelector('#nextBtn').innerHTML = 'Submit'
        document.querySelector('#nextBtn').style.backgroundColor = 'rgb(102, 255, 0)'
        
    } else {
        document.querySelector('#nextBtn').innerHTML = 'Next'
        document.querySelector('#nextBtn').style.backgroundColor = 'var(--clr-accent)'
    }
    childTabs[c].parentElement.style.display = 'block'
}


function prevNext(c) {
    childTabs[currentTabChild].style.display = 'none'
    currentTabChild = currentTabChild + c
    console.log(currentTabChild)
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