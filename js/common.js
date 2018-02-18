function getData(url) {
	return fetch(url, {method: 'GET',})
		.then(response => {
		if (response.status !== 200) {
			throw new Error('Error');
		}
		return response.json();
	});
}

getData('https://inx.wp-funnel.com/wp-json/wp/v2/posts')
	.then(data=> {
	console.log(data);
	const list = document.getElementById('list');
	data.map(article => {

		console.log(article);

		const article_item = document.createElement('div');
		article_item.classList.add('article_item');
		const article_title = document.createElement('h3');
		article_title.classList.add('article_title');
		const article_description = document.createElement('div');
		
		article_title.innerHTML = article.title.rendered;
		article_description.innerHTML = article.content.rendered;

		article_item.appendChild(article_title);
		article_item.appendChild(article_description);

		list.appendChild(article_item);

	});

});