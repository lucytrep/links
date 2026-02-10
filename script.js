/* Shorten long block titles so they don't break layout and show ellipsis after a max length. */
/* Resource https://medium.com/@DylanAttal/truncate-a-string-in-javascript-41f33171d5a8 */
/* Shorten a long title to a set max length and add "..." if it’s too long and safely handles empty or missing titles. */
const TITLE_MAX_LENGTH = 30
let truncateTitle = (title) => {
	if (!title || title.length <= TITLE_MAX_LENGTH) return title || ''
	return title.slice(0, TITLE_MAX_LENGTH) + '...'
}


