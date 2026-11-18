import { getData } from "../data/data.js";

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


export async function getChannelsPerCategory(selectedCategory) {

    const channels = await getData()

    if (selectedCategory === 'ALL') {
        return channels
    }

    let filtered  = []

    for (const channel of channels) {

        if(channel.category == selectedCategory && channel.isBlacklisted==false){
            filtered.push(channel)
        }

    }

    return filtered

}

