// class example assisted by coding tutor to better understand rules

// Similar to before, setting up variables.
let dialog = document.querySelector('#dialog') // The thing we’re clicking.
// let modalDialog = document.querySelector('#dialog') // Now one for our `dialog`.
let closeButton = dialog.querySelector('button') // Only looking within `modalDialog`.

document.querySelector('#content-grid').addEventListener('click', (event) => { // “Listen” for clicks.
    // https://adactio.medium.com/event-target-closest-536c7498a897
    let block = event.target.closest('.content-block') // Find the closest `.content-block` to the click, if there is one.

    let title = block.querySelector('.block-title').textContent // grab title FROM that block
    let img = block.querySelector('img')?.src

    document.getElementById('modal-title').textContent = title || 'Untitled' // textContent https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
    document.getElementById('modal-image').innerHTML = img ? `<img src="${img}" class="modal-img">` : '' // ? = "if true use this", :  = "otherwise use this". '' = empty string (nothing)
    
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