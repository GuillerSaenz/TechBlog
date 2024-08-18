function formatDate(isoDate) {
	const date = new Date(isoDate);
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const year = date.getFullYear();
	return `${month}/${day}/${year}`;
}

module.exports = {formatDate};