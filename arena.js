let channelSlug = 'sustainable-architecture-living-spaces' // The “slug” is just the end of the URL.
let myUsername = 'lucy-trepanier' // For linking to your profile.


// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (channelData) => {
	// Target some elements in your HTML:
	let channelTitle = document.querySelector('#channel-title')
	let channelDescription = document.querySelector('#channel-description')
	let channelCount = document.querySelector('#channel-count')
	let channelLink = document.querySelector('#channel-link')

	// Then set their content/attributes to our data:
	channelTitle.innerHTML = channelData.title
	channelDescription.innerHTML = channelData.description.html
	channelCount.innerHTML = channelData.counts.blocks
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
}



// Then our big function for specific-block-type rendering:
let renderBlock = (blockData) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.querySelector('#content-grid')

    /* This part displays Link blocks from the channel. It builds the image and text, and links to the original source. */
    /* Resource is MDN Template literals https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals + Are.na block shape */
    /* Learned I can use template literals in other sections too, like image, text, and video blocks. */
	// Links!
	if (blockData.type == 'Link') {
       
        let small = blockData.image?.small?.src || ''
        let medium = blockData.image?.medium?.src || ''
        let large = blockData.image?.large?.src || ''
        let alt = blockData.image?.alt_text || blockData.title || ''

		// Declares a “template literal” of the dynamic HTML we want.
		let linkItem = 

        `
            <article class="content-block" data-category="other houses">
            <a href="${ (blockData.source && blockData.source.url) || '#' }" target="_blank" class="block-image">
                <picture>
                    <source media="(max-width: 500px)" srcset="${ small }">
                    <source media="(max-width: 1000px)" srcset="${ medium }">
                    <img alt="${ alt }" src="${ large }">
                </picture>
            </a>
            <div class="block-info">
                <h2 class="block-title">${ truncateTitle(blockData.title || 'Link') }</h2>
                <p class="block-type">Link</p>
                <p class="block-date">January 2026</p>
            </div>
        </article>
        `

		// And puts it into the page!
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)

		// More on template literals:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
	}

    /* This part displays Image blocks with a responsive picture and the same title, type, and date layout. */
    /* Are.na image block data + MDN Optional chaining https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining */
    /* Learned how to safely load images in different sizes so the page doesn’t break if something is missing. */
	// Images!
    else if (blockData.type == 'Image') {

        let imgSrcs = (img) => {
            if (!img) return { small: '', medium: '', large: '', alt: '' }
            return {
                small: (img.small && (img.small.src_2x || img.small.src)) || '',
                medium: (img.medium && (img.medium.src_2x || img.medium.src)) || '',
                large: (img.large && (img.large.src_2x || img.large.src)) || '',
                alt: img.alt_text || img.title || ''
            }
        }

        // Get URLs for this block
        let { small, medium, large, alt } = imgSrcs(blockData.image)

        // Build HTML (same file convention + date as other blocks)
        let imageDate = blockData.updated_at ? new Date(blockData.updated_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''
        
        let imageItem =
        `
            <article class="content-block" data-category="${ (blockData.metadata && blockData.metadata[0]) || '' }">
                <div class="block-image">
                    <picture>
                        <source media="(max-width: 500px)" srcset="${ small }">
                        <source media="(max-width: 1000px)" srcset="${ medium }">
                        <img alt="${ alt }" src="${ large }">
                    </picture>
                </div>
                <div class="block-info">
                    <h2 class="block-title">${ truncateTitle(blockData.title || '') }</h2>
                    <p class="block-type">Image</p>
                    <p class="block-date">${ imageDate }</p>
                </div>
            </article>
        `

        // Insert into the page
        channelBlocks.insertAdjacentHTML('beforeend', imageItem)
    }


    /* This part displays Text blocks by pulling the text content and placing it into the layout. I was having a hard time with getting this to work.*/
    /* Are.na text block data + help from ChatGPT. */
    /* Learned how to check multiple text fields and use fallbacks so the text still shows if one is missing. */
    // Text!
    else if (blockData.type === 'Text') {

        // Safe extraction: Try different possible properties
        let textHtml = blockData.content_html || 
                    (blockData.content && blockData.content.html) || 
                    (blockData.content && blockData.content.text) || ''

        let textDate = blockData.updated_at ? new Date(blockData.updated_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''

        let textItem =
       
        `
            <article class="content-block">
                <div class="block-image block-text">
                    <div class="text-content">
                        ${ textHtml }
                    </div>
                </div>
                <div class="block-info">
                    <h2 class="block-title">${ truncateTitle(blockData.title || 'Untitled') }</h2>
                    <p class="block-type">Text</p>
                    <p class="block-date">${ textDate }</p>
                </div>
            </article>
        `

        channelBlocks.insertAdjacentHTML('beforeend', textItem)
    }

	// Uploaded (not linked) media…
	else if (blockData.type == 'Attachment' || blockData.class == 'Attachment' || blockData.type == 'Media' || blockData.class == 'Media') {
		// v2 API uses top-level url/content_type; v3 may nest under attachment
		let attachment = blockData.attachment || blockData
		let fileUrl = attachment.url || blockData.url || ''
		let contentType = (attachment.content_type || blockData.content_type || '').toLowerCase()
		let filename = attachment.filename || blockData.filename || ''

		// Uploaded videos!
		if (contentType.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
        let videoItem =

        // <video controls src="${ videoUrl }"></video>//
        
        `
            <article class="content-block" data-category="">
                <div class="block-image block-video">
                   <video controls src="${ fileUrl }"></video>
                </div>
                <div class="block-info">
                    <h2 class="block-title">${ truncateTitle(blockData.title || 'Video') }</h2>
                    <p class="block-type">Video</p>
                </div>
            </article>
         `
            channelBlocks.insertAdjacentHTML('beforeend', videoItem)
        }


        /* Render PDF attachments same card layout as other media, link opens PDF in new tab */
        /* Are.na API (attachment content_type e.g. application/pdf) */
        /* Learned that guard attachment/content_type; treat as PDF if content_type includes 'pdf' or url/filename ends with .pdf. */
        // Uploaded PDFs!
        else if (contentType.includes('pdf') || (fileUrl && fileUrl.toLowerCase().endsWith('.pdf')) || (filename && filename.toLowerCase().endsWith('.pdf'))) {

            let pdfUrl = fileUrl || '#'
            let pdfDate = blockData.updated_at ? new Date(blockData.updated_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''

            let pdfItem =
            `
                <article class="content-block" data-category="">
                    <a href="${ pdfUrl }" target="_blank" class="block-image" rel="noopener noreferrer">
                        <div class="pdf-preview">
                            <span>PDF</span>
                        </div>
                    </a>
                    <div class="block-info">
                        <h2 class="block-title">${ truncateTitle(blockData.title || 'PDF Document') }</h2>
                        <p class="block-type">PDF</p>
                        <p class="block-date">${ pdfDate }</p>
                    </div>
                </article>
            `

            channelBlocks.insertAdjacentHTML('beforeend', pdfItem)
        }


		// Uploaded audio!
		else if (contentType.includes('audio')) {

			// …still up to you, but here’s an `audio` element:
            let audioDate = blockData.updated_at ? new Date(blockData.updated_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''
            let audioItem =
                
            `
                <article class="content-block" data-category="other">
                    <div class="block-image">
                        <audio controls src="${ fileUrl }"></audio>
                    </div>
                    <div class="block-info">
                        <h2 class="block-title">${ truncateTitle(blockData.title || 'Audio') }</h2>
                        <p class="block-type">Audio</p>
                        <p class="block-date">${ audioDate }</p>
                    </div>
                </article>
            `

            channelBlocks.insertAdjacentHTML('beforeend', audioItem)
        }

        // Any other attachment with a URL (e.g. PDF with missing/different content_type): show as file/PDF
        else if (fileUrl) {
            let pdfDate = blockData.updated_at ? new Date(blockData.updated_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''
            let pdfItem =
            `
                <article class="content-block" data-category="">
                    <a href="${ fileUrl }" target="_blank" class="block-image" rel="noopener noreferrer">
                        <div class="pdf-preview">
                            <span>PDF</span>
                        </div>
                    </a>
                    <div class="block-info">
                        <h2 class="block-title">${ truncateTitle(blockData.title || 'PDF Document') }</h2>
                        <p class="block-type">PDF</p>
                        <p class="block-date">${ pdfDate }</p>
                    </div>
                </article>
            `
            channelBlocks.insertAdjacentHTML('beforeend', pdfItem)
        }
    }

	// Linked (embedded) media…
	else if (blockData.type == 'Embed') {

		let embedType = blockData.embed.type

		// Linked video!
		if (embedType.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			let linkedVideoItem =
                
            `
                <article class="content-block" data-category="">
                    <div class="block-image block-video">
                        ${ blockData.embed && blockData.embed.html || '' }
                    </div>
                    <div class="block-info">
                        <h2 class="block-title">${ truncateTitle(blockData.title || 'Video') }</h2>
                        <p class="block-type">Video</p>
                        <p class="block-date">${ blockData.updated_at ? new Date(blockData.updated_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '' }</p>
                    </div>
                </article>
            `

            channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
        }

		// Linked audio!
		else if (embedType.includes('rich')) {
			// …up to you!
		}
	}
}


// A function to display the owner/collaborator info:
let renderUser = (userData) => {
	let channelUsers = document.querySelector('#channel-users') // Container.

	let userAddress =
		
    `
		<address>
			<img src="${ userData.avatar }">
			<h3>${ userData.name }</h3>
			<p><a href="https://are.na/${ userData.slug }">Are.na profile ↗</a></p>
		</address>
	`

	channelUsers.insertAdjacentHTML('beforeend', userAddress)
}


// Finally, a helper function to fetch data from the API, then run a callback function with it:
let fetchJson = (url, callback, pageResponses = []) => {
	fetch(url, { cache: 'no-store' })
		.then((response) => response.json())
		.then((json) => {
			// Add this page to our temporary “accumulator” list parameter (an array).
			pageResponses.push(json)

			// Are.na response includes this “there are more!” flag (a boolean):
			if (json.meta && json.meta.has_more_pages) { // If that exists and is `true`, keep going…
				// Fetch *another* page worth, passing along our previous/accumulated responses.
				fetchJson(`${url}&page=${pageResponses.length + 1}`, callback, pageResponses)
			} else { // If it is `false`, there are no more pages…
				// “Flattens” them all together as if they were one page response.
				json.data = pageResponses.flatMap((page) => page.data)

				// Return the data to the callback!
				callback(json)
			}
	})
}

// Now that we have said all the things we *can* do, go get the channel data:
fetchJson(`https://api.are.na/v3/channels/${channelSlug}`, (json) => {
	console.log(json) // Always good to check your response!

	placeChannelInfo(json) // Pass all the data to the first function, above.
	renderUser(json.owner) // Pass just the nested object `.owner`.
})

// Get your info to put with the owner's:
fetchJson(`https://api.are.na/v3/users/${myUsername}/`, (json) => {
	console.log(json) // See what we get back.

	renderUser(json) // Pass this to the same function, no nesting.
})

// And the data for the blocks:
fetchJson(`https://api.are.na/v3/channels/${channelSlug}/contents?per=100&sort=position_desc`, (json) => {
	console.log(json) // See what we get back.

	let items = json.contents || json.data || []
	items.forEach((blockData) => {
		// console.log(blockData) // The data for a single block.

		try {
			renderBlock(blockData)
		} catch (err) {
			console.error('renderBlock error', blockData?.id, err)
		} // Pass the single block’s data to the render function.
	})
})
