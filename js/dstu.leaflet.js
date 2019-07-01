     //координаты парка дгту
	var mymap = L.map('mapid').setView([47.240715, 39.710919], 17);
      //openstreetmap слой
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

    /*
    L.marker([47.240096, 39.710672]).addTo(mymap)
    .bindPopup("<b>Парк ДГТУ</b><br />Студенческий парк").openPopup();
 */
//тень и размеры
var MyIcon = L.Icon.extend({
    options: { 
        iconSize:     [32, 32],
        shadowUrl: 'img/shadow.png',
       shadowSize:   [35, 35],
    // iconAnchor: [22, 94], // точка иконки, которая будет соответствовать местоположению маркера
     //shadowAnchor: [4, 62], // то же самое для тени
     //popupAnchor: [-3, -76] // точка, из которой должно открываться всплывающее окно относительно iconAnchor
    }
});
    //расположение иконок для маркеров
    var treeIcon = new MyIcon({iconUrl: 'img/tree.png'}),
    sportIcon = new MyIcon({iconUrl: 'img/sport.png'}),
    footballIcon = new MyIcon({iconUrl: 'img/football.png'}),
    bedIcon = new MyIcon({iconUrl: 'img/bed.png'}),
    pooltIcon = new MyIcon({iconUrl: 'img/pool.png'}),
    runIcon = new MyIcon({iconUrl: 'img/run.png'}),
    volleyballIcon = new MyIcon({iconUrl: 'img/volleyball.png'});
//координаты маркеров
L.marker([47.2401, 39.71065], {icon: treeIcon}).bindPopup("<b>Парк ДГТУ</b><br/>Студенческий парк").addTo(mymap);
L.marker([47.24097, 39.70935], {icon: sportIcon}).bindPopup("<b>Манеж ДГТУ</b><br/>").addTo(mymap);
L.marker([47.23882,39.71025], {icon: footballIcon}).bindPopup("<b>Футбольное поле</b><br/>Поле для мини-футбола").addTo(mymap);
L.marker([47.23936, 39.71274], {icon: bedIcon}).bindPopup("<b>Общежитие ДГТУ</b><br/>Место временного проживания иногородних студентов").addTo(mymap);
L.marker([47.23876, 39.71099], {icon: pooltIcon}).bindPopup("<b>Бассеин ДГТУ</b>").addTo(mymap);
L.marker([47.23942,39.70906], {icon: runIcon }).bindPopup("<b>Поле для бега</b>").addTo(mymap);
L.marker([47.23883,39.71148], {icon: volleyballIcon}).bindPopup("<b>Волейбольный зал ДГТУ</b><br/>Зал для тренеровок студентов ДГТУ").addTo(mymap);

//Leaflet.MeasureControl - расчет расстояния 
L.Control.measureControl().addTo(mymap);
//L.Control.MousePosition - отображение координат
L.control.mousePosition().addTo(mymap);