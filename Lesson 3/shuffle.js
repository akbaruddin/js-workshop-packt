function shuffle(arr) {
    let currentIndex = arr.length;

    while (currentIndex != 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }

    return arr;
}

const list = [
    "Wash Laundry",
    "Clean Silver",
    "Write Letters",
    "Purchase Groceries",
    "Retrieve Mail",
    "Prepare Dinner"
]

console.log(list);
console.log(shuffle(list));