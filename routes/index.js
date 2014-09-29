
module.exports = function (app) {
	app.get('/', function (req, res) {
		res.render('index', { title: 'Express' });
	})

	app.get('/angular', function (req, res) {
		res.render('angular', {title: 'angular'})
	})
}