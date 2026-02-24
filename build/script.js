// class example assisted by coding tutor to better understand rules

// Similar to before, setting up variables.
let dialog = document.querySelector('#dialog') // The thing we’re clicking.
// let modalDialog = document.querySelector('#dialog') // Now one for our `dialog`.
let closeButton = dialog.querySelector('button') // Only looking within `modalDialog`.

document.querySelector('#content-grid').addEventListener('click', (event) => { // “Listen” for clicks.
    // https://adactio.medium.com/event-target-closest-536c7498a897
    let block = event.target.closest('.content-block') // Find the closest `.content-block` to the click, if there is one.
    if (!block) return

    let title = block.querySelector('.block-title').textContent // grab title FROM that block
    let img = block.querySelector('img')?.src
    let textContent = block.querySelector('.text-content')?.innerHTML
    let iframe = block.querySelector('iframe')?.src // video was not working so trying to pull from iframe instead
    let audio = block.querySelector('audio')?.src // for audio and odd remaining videos
    let video = block.querySelector('video')?.src // for video
    let id = block.getAttribute('data-id') // // grabbing Are.na id reference https://www.are.na/developers/explore/block/block so I am able to have my content link directly back to my Are.na board


    document.getElementById('modal-link').href = `https://www.are.na/block/${id}` 	// prof example channelLink.href = `https://www.are.na/channel/${channelSlug}`
    document.getElementById('modal-title').textContent = title || 'Untitled' // textContent https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
    document.getElementById('modal-image').innerHTML = img  ? `<img src="${img}" class="modal-img">` : textContent ? `<div class="modal-text">${textContent}</div>` : iframe ? `<iframe src="${iframe}" style="width:100%; height:300px" frameborder="0" allowfullscreen></iframe>` : audio ? `<audio controls src="${audio}" style="width:100%"></audio>` : video ? `<video controls src="${video}" style="width:100%"></video>` : '' // ? = "if true use this", :  = "otherwise use this". '' = empty string (nothing)
    // if image exists, show image, if no image but text exists, show text, if no image or text but iframe exists, show iframe, if no image or text or iframe exists, show audio, ... show video etc. if none of the above exist, show nothing,

    dialog.showModal() // This opens it up.
})

closeButton.addEventListener('click', () => {
	dialog.close() // And this closes it!
})

// Listen to *all* clicks, now including the `event` parameter…
document.addEventListener('click', (event) => {
	// Only clicks on the page itself behind the `dialog`.
	if (event.target == document.documentElement) {
		dialog.close() // Close it too then.
	}
})