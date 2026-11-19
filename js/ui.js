import { getCategories, getChannelsPerCategory } from "./app.js";
import { getData, updateChannel, DeleteChannel, addChannel } from "../data/data.js";

export async function AsideDom() {

    const categories = await getCategories();
    const button = document.getElementById('openAside');
    const aside = document.getElementById('aside');
    const channelAside = document.getElementById('channelAside')
    const closed = document.getElementById('close')
    const listCategory = document.getElementById('categoriList')
    const listChannel = document.getElementById('channelList')
    const closeChannel = document.getElementById('closeChannel')
    const IMAGE = document.getElementById('previewImage')
    const searchInput = document.getElementById('searchInput')
    const descriptionChannel = document.getElementById('descriptionChannel')
    const Addbtn = document.querySelector('.AddBnt')
    const popup = document.getElementById('popup')
    const closePopup = document.getElementById('closePopup')
    const SubmitChannel = document.querySelector('#channelForm')
    const channels = await getData()
        console.log(channels)

    let favorites = channels.filter(c => c.isFavorite == true && c.isBlacklisted == false)
    let blackList = channels.filter(c => c.isBlacklisted == true)

    categories.forEach(e => {
        listCategory.innerHTML += `
        <li><button  data-category="${e}" 
        class="w-full rounded-lg px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/10 categoryBnt">${e}</button></li>
    `
    })

    function renderChannels(channels) {
        listChannel.innerHTML = ""
        for (const channel of channels) {

            listChannel.innerHTML += `<li data-id='${channel.id}' class="channel w-full rounded-lg  px-4 py-3 text-left text-sm font-medium hover:bg-white/10">${channel.name} --  ${channel.channelNumber}  <span class="star p-2">${channel.isFavorite ? '★' : '☆'}</span> <span class="black-list  p-2">${channel.isBlacklisted ? '✓' : "⚠"}</span>   <span class=" delete  p-2">${channel.isBlacklisted ? 'X' : ""}</span></li>`

        }
    }

    renderChannels(channels.filter(c => { return !c.isBlacklisted }))
    let inputValue = ''
    searchInput.addEventListener('input', (e) => {
        inputValue = e.target.value.toLowerCase();
        filterPerChannelName(channels)
    })
    function filterPerChannelName(data) {
        const filtredChannels = data.filter(channel => {
            const name = channel.name.toLowerCase()
            return name.includes(inputValue)

        })
        renderChannels(filtredChannels)
    }

    const categoryBtns = document.querySelectorAll('.categoryBnt')
    categoryBtns.forEach(categoryBtn => {
        categoryBtn.addEventListener('click', async e => {
            channelAside.classList.remove('hidden')
            let cat = e.target.attributes[0].value
            console.log(cat)

            listChannel.innerHTML = ""
            if (cat == "Favoris") {
                renderChannels(favorites)
                return
            }

            if (cat == "BlackListe") {
                renderChannels(blackList)
                return
            }

            if (cat == "ALL") {
                renderChannels(channels.filter(c => { return !c.isBlacklisted }))
            }

            renderChannels(await getChannelsPerCategory(cat))


        })
    })

    button.addEventListener('click', () => {
        aside.classList.remove('-translate-x-full')

    })
    closeChannel.addEventListener('click', () => {
        channelAside.classList.add('hidden')
    })
    closed.addEventListener('click', () => {
        aside.classList.add('-translate-x-full')
    })

    // ===========================

    document.addEventListener('click', (e) => {
        descriptionChannel.innerHTML = ""
        if (e.target.classList.contains('channel')) {
            const id = e.target.dataset.id
            const image = channels.find((ch) =>
                ch.id == id
            ).previewImage
            IMAGE.src = image
            const numberChannel = channels.find((ch) =>
                ch.id == id
            ).channelNumber
            const name = channels.find((ch) =>
                ch.id == id
            ).name
            const category = channels.find((ch) =>
                ch.id == id
            ).category
            const infoChannel = document.createElement('div');
            infoChannel.classList.add('relative', 'ml-[80%]', '-top-[400px]')
            infoChannel.innerHTML = `${name}<br>numero de canal: ${numberChannel}<br>type: ${category}`
            descriptionChannel.append(infoChannel)

        }
    })

    listChannel.addEventListener('click', (e) => {
        if (e.target.classList.contains('star')) {
            let cChanelHTML = e.target.parentElement
            let id = cChanelHTML.attributes[0].value
            let current = channels.find(c => c.id == id)
            if (!current) {
                return
            }
            current.isFavorite = !current.isFavorite
            updateChannel(id, current)
            cChanelHTML.children[0].textContent = current.isFavorite ? '★' : '☆'
            favorites = channels.filter(c => c.isFavorite == true && c.isBlacklisted == false)
        }
        if (e.target.classList.contains('black-list')) {
            let cChanelHTML = e.target.parentElement
            console.log(cChanelHTML)
            let id = cChanelHTML.attributes[0].value
            let current = channels.find(c => c.id == id)
            current.isBlacklisted = !current.isBlacklisted
            cChanelHTML.remove()

            updateChannel(id, current)
            cChanelHTML.children[1].textContent = current.isBlacklisted ? '✓' : '⚠'
            blackList = channels.filter(c => c.isBlacklisted == true)

        }
        if (e.target.classList.contains('delete')) {
            let cChanelHTML = e.target.parentElement
            let id = cChanelHTML.attributes[0].value
            const confirmDelet = confirm("Voulez-vous supprimer definitivement")
            if (!confirmDelet)
                return;
            DeleteChannel(id)
            cChanelHTML.remove()

        }
    });
    Addbtn.addEventListener('click', () => {
        popup.classList.remove('hidden')
    })
    closePopup.addEventListener('click', () => {
        popup.classList.add('hidden')
    })
    // const channel={}
    SubmitChannel.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData.entries());
        console.log(values)
        // addChannel(values)
        popup.classList.add('hidden')

    })
}
