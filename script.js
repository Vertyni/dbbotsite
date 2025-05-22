const lidersTable = document.getElementsByClassName('lidersTable')[0];

let site = window.location.pathname;
let data = [];
let scores = {};

if (site == '/') {}
else if (site == '/liders') {
	setDataAndScores();
}

function setDataAndScores() {
	fetch('/api/table')
		.then(response => response.json())
		.then(dt => {
			if (dt.length == 0) return;
			data = dt;
			
			for (let i in data) {
				score = JSON.parse(data[i].scores.replace(/'/g, '"'));
				scores[data[i].name] = score;
			}
		});
}

function changeLidersTable(game) {
	setDataAndScores();
	lidersTable.innerHTML = '';
	let sorted = {};
	for (let i in scores) { sorted[i] = scores[i][game]; }
	sorted = sortArray(sorted);
	
	for (let i in sorted) {
		el = document.createElement('tr');
		el.innerHTML += `<td>${i}</td><td>${scores[i][game]}</td>`;
		lidersTable.appendChild(el);
	}
}

function sortArray(massive) {
	const sortedArray = Object.entries(massive).sort((a, b) => b[1] - a[1]);
	return Object.fromEntries(sortedArray);
}