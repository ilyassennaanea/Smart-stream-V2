export async function getCategories() {
    const data = await getData()
    const categories = [];
// console.log(data)
    data.forEach((channel) => {
        if (!categories.includes(channel.category)) {
            categories.push(channel.category);
        }
    });
    return categories;

}




export function getChannelsPerCategory(selectedCategory) {
    const channels = JSON.parse(localStorage.getItem("channels"))
    console.log(selectedCategory)
    if (selectedCategory === 'ALL') {
        return channels
    }
    let filtered  = []
    for (const channel of channels) {
        if(channel.category == selectedCategory){
            filtered.push(channel)
        }
    }

    return filtered

}

