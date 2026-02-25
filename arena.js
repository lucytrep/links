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

	// slack reference - check description for category keyword aka detect keywords in the block description
	// check the text in each block to see if it contains certain keywords like "material" or "house" to categorize it
	// Professor, and tutor support + Claude to better understand minor details I had trouble with after session
	// also https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
	// How to safely check for a property deep in an object (blockData.description?.plain) without breaking if it’s missing
	let isMaterial = blockData.description?.plain.includes('material')
	let isHouse = blockData.description?.plain.includes('house')
	let isInspiration = blockData.description?.plain.includes('inspiration')
	let isResource = blockData.description?.plain.includes('resource')
	let isDetail = blockData.description?.plain.includes('detail')
	let isFinish = blockData.description?.plain.includes('finish')

	// Assign a category based on keywords using a ternary operator
	// This is a “ternary operator”: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
	// blockData.title ? blockData.title : 'Untitled'
    // does not include any of these, gets this class
	// how to chain multiple ternary operators to handle multiple conditions cleanly, and how to assign a default value if nothing matches
	let category = isMaterial ? 'materials' : isHouse ? 'houses' : isInspiration ? 'inspirations' : isResource ? 'resources' : isDetail ? 'details' : isFinish ? 'finishes' : 'resources'
	// if isMaterial is true use 'materials', otherwise if isHouse is true use 'houses', otherwise if isInspiration is true use 'inspirations', otherwise if isResource is true use 'resources', otherwise if isDetail is true use 'details', otherwise if isFinish is true use 'finishes', otherwise use 'resources' as default
	// uncategorized goes to resources page

	// only show blocks on pages that match their category, or show all blocks on home and build index
	// slack example includes() pattern applied to window.location.pathname to filter blocks by page
	// window.location.pathname returns the path and filename of the current page https://www.w3schools.com/js/js_window_location.asp
	// tutor helped extend this to add exceptions for home and build index pages
	// tutor suggested checking isHomePage and isBuildPage first using the same includes() and endsWith() methods already in the code
	// endsWith() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
	// logical OR and AND operators he was showing me https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR
	const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')
	const isBuildPage = window.location.pathname.includes('build/index.html')
	if (!isHomePage && !isBuildPage && !window.location.pathname.includes(category)) return
	// if it is NOT the home page AND it is NOT the build page AND the URL does NOT include the category, then skip this block and return to next


	// Links!
	if (blockData.type == 'Link') {
		// Declares a “template literal” of the dynamic HTML we want.
		let linkItem =
			
		`
		<article class="content-block" data-id="${ blockData.id }"> 
			<a href="${ blockData.source.url }" target="_blank" class="block-image">
				<img src="${ blockData.image.medium.src_2x}" alt="${blockData.title || 'Untitled' }">
			</a>
			<div class="block-info">
				<h2 class="block-title">
				${ blockData.title ? blockData.title : 'Untitled' }
				</h2>
				<div class="block-type"> ${ blockData.description ? blockData.description.html : 'Untitled'} </div>
				<button class="view-btn">VIEW</button>
			</div>
		</article>
		`

		// And puts it into the page!
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)


		// More on template literals:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
	}

	// Images!
	else if (blockData.type == 'Image') {
		// Image blocks from Are.na, same card layout as links
		let imageItem =
			
            `
			<article class="content-block" data-id="${ blockData.id }">
				<div class="block-image">
					<img src="${ blockData.image.medium.src_2x}" alt="${blockData.title || 'Untitled' }">
				</div>
				<div class="block-info">
					<h2 class="block-title">
						${ blockData.title ? blockData.title : 'Untitled' }
					</h2>
					<div class="block-type"> ${ blockData.description ? blockData.description.html : 'Untitled' } </div>
					<button class="view-btn">VIEW</button>
				</div>
			</article>
			`

		channelBlocks.insertAdjacentHTML('beforeend', imageItem)
	}
	// Text!
	else if (blockData.type == 'Text') {
		// Build a card that uses the Are.na description HTML when present
		let textItem =
			
            `
			<article class="content-block" data-id="${ blockData.id }">
				<div class="block-image block-text">
					<div class="text-content">
						${ blockData.content?.html || '' }
					</div>
				</div>
				<div class="block-info">
					<h2 class="block-title">
						${ blockData.title || 'Untitled' }
					</h2>
					<div class="block-type"> ${ blockData.description ? blockData.description.html : 'Untitled' } </div>
					<button class="view-btn">VIEW</button>
				</div>
			</article>
			`
			
		channelBlocks.insertAdjacentHTML('beforeend', textItem)
	}

	// // Uploaded (not linked) media…
	else if (blockData.type == 'Attachment') {
		let contentType = blockData.attachment.content_type // Save us some repetition.

		// Uploaded videos!
		if (contentType.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
			let videoItem =
				
			`
			<article class="content-block" data-id="${ blockData.id }">
				<div class="block-image block-video">
					<video controls src="${ blockData.attachment.url }"></video>
				</div>
				<div class="block-info">
					<h2 class="block-title">${ blockData.title || 'Untitled' }</h2>
					<div class="block-type">${ blockData.description ? blockData.description.html : '' }</div>
					<button class="view-btn">VIEW</button>
				</div>
			</article>
			`

			channelBlocks.insertAdjacentHTML('beforeend', videoItem)

			// More on `video`, like the `autoplay` attribute:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
		}

	// 	// Uploaded PDFs!
		else if (contentType.includes('pdf')) {
			// …up to you!
			let pdfItem =

			`
			<article class="content-block" data-id="${ blockData.id }">
				<div class="block-image block-pdf">
					<img src="${ blockData.image.medium.src_2x}" alt="${blockData.title || 'Untitled' }">
				</div>
				<div class="block-info">
					<h2 class="block-title">
						${ blockData.title ? blockData.title : 'Untitled' }
					</h2>
					<div class="block-type"> ${ blockData.description ? blockData.description.html : 'Untitled' } </div>
					<button class="view-btn">VIEW</button>
				</div>
			</article>
			`

            channelBlocks.insertAdjacentHTML('beforeend', pdfItem)
        
		}

	// 	// Uploaded audio!
		else if (contentType.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			let audioItem =
            
			`
			<article class="content-block" data-id="${ blockData.id }">
				<div>
					<audio controls src="${blockData.attachment.url}"></audio>
				</div>
				<div class="block-info">
					<h2 class="block-title">${ blockData.title || 'Untitled' }</h2>
					<div class="block-type">${ blockData.description ? blockData.description.html : '' }</div>
					<button class="view-btn">VIEW</button>
				</div>
			</article>
            `

            channelBlocks.insertAdjacentHTML('beforeend', audioItem)
        }
			
			// More on`audio`:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		}

	// Linked (embedded) media…
	else if (blockData.type == 'Embed') {
		let embedType = blockData.embed.type

		// Linked video!
		if (embedType.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			let linkedVideoItem =
           
            `
           <article class="content-block" data-id="${ blockData.id }">
                <div class="block-image block-video">
                ${ blockData.embed.html }
                </div>
                <div class="block-info">
                    <h2 class="block-title">
                        ${ blockData.title ? blockData.title : 'Untitled' }
                    </h2>
                    <div class="block-type"> ${ blockData.description ? blockData.description.html : '' } </div>
					<button class="view-btn">VIEW</button>
                    </div>
            </article>
            `
                
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)

			// More on `iframe`:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
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

// More on `fetch`:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch



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

	// Loop through the nested `.data` array (list).
	json.data.forEach((blockData) => {
		// console.log(blockData) // The data for a single block.

		renderBlock(blockData) // Pass the single block’s data to the render function.
	})
})