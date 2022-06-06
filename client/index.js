const submitBtn = document.getElementById('add-item');
const getPriceBtn = document.getElementById('get-prices')
const inputArea = document.getElementById('item-input');
const getInput = ()=>{
    const input = inputArea.value;
    return input
}

const clearInputBox = ()=>{
    inputArea.value = ""
}


const getList = ()=>{
    let list = document.getElementById('list');
    return list
}

const addItems = ()=>{
    let list = getList();
    let listItem = document.createElement('li');
    let item = getInput()
    clearInputBox()
    listItem.innerText = item
    list.appendChild(listItem)    
}

const submitList = ()=>{
    // send data to the server
    const item = getList().innerText
    fetch('http://127.0.0.1:5000/',{
        method: 'POST',
    
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({item})
    })

}

submitBtn.addEventListener('click',addItems)

getPriceBtn.addEventListener('click',submitList)
