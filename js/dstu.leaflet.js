
//координаты парка дгту
var mymap = L.map('mapid').setView([47.24007, 39.71067], 18);
//openstreetmap слой
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);
//тень и размеры 
var MyIcon = L.Icon.extend({
    options: {
        iconSize: [24, 24],
        shadowUrl: 'img/shadow.png',
        shadowSize: [26, 26],
        // iconAnchor: [22, 94], // точка иконки, которая будет соответствовать местоположению маркера
        //shadowAnchor: [4, 62], // то же самое для тени
        //popupAnchor: [-3, -76] // точка, из которой должно открываться всплывающее окно относительно iconAnchor
    }
});
//расположение иконок для маркеров
var treeIcon = new MyIcon({
    iconUrl: 'img/tree.png'
}),
    sportIcon = new MyIcon({
        iconUrl: 'img/sport.png'
    }),
    footballIcon = new MyIcon({
        iconUrl: 'img/football.png'
    }),
    bedIcon = new MyIcon({
        iconUrl: 'img/bed.png'
    }),
    pooltIcon = new MyIcon({
        iconUrl: 'img/pool.png'
    }),
    runIcon = new MyIcon({
        iconUrl: 'img/run.png'
    }),
    volleyballIcon = new MyIcon({
        iconUrl: 'img/volleyball.png'
    });

// создание массива
let people = [
    {
        name: 'Парк ДГТУ',
        latLng: [47.2401, 39.71065],
        id: '1',
        icon: treeIcon,
        popup: '<b>Парк ДГТУ</b><br/>Студенческий парк'
    },
    {
        name: 'Манеж ДГТУ',
        latLng: [47.24082, 39.70931],
        id: '2',
        icon: sportIcon,
        popup: '<b>Манеж ДГТУ</b><br/>'
    },
    {
        name: 'Футбольное поле',
        latLng: [47.23882, 39.71025],
        id: '3',
        icon: footballIcon,
        popup: '<b>Футбольное поле</b><br/>Поле для мини-футбола'
    },
    {
        name: 'Общежитие ДГТУ',
        latLng: [47.23951, 39.71273],
        id: '4',
        icon: bedIcon,
        popup: '<b>Общежитие ДГТУ</b><br/>Место временного проживания иногородних студентов'
    },
    {
        name: 'Бассеин ДГТУ',
        latLng: [47.23887, 39.71097],
        id: '5',
        icon: pooltIcon,
        popup: '<b>Бассеин ДГТУ</b>'
    },
    {
        name: 'Поле для бега',
        latLng: [47.2394, 39.7091],
        id: '6',
        icon: runIcon,
        popup: '<b>Поле для бега</b>'
    },
    {
        name: 'Волейбольный зал ДГТУ',
        latLng: [47.23896, 39.71145],
        id: '6',
        icon: volleyballIcon,
        popup: '<b>Волейбольный зал ДГТУ</b><br/>Зал для тренеровок студентов ДГТУ'
    }
];
// создание группы маркеров
let group = L.layerGroup(),
    list = document.getElementById('list')

// проход по массиву маркеров
people.forEach(person => {
    let marker = L.marker(person.latLng, {
        title: person.name,
        icon: person.icon
    }).bindPopup(person.popup);
    // добавление на слой маркеров
    group.addLayer(marker);
    // сохранение id
    person.marker_id = group.getLayerId(marker);
});
// создание группы
group.addTo(mymap);
// Click handler для попапа и перемещения
function onClick(data) {
    let { marker_id } = data,
        marker = group.getLayer(marker_id);
    mymap.panTo(marker.getLatLng(), marker.openPopup());
}

// гиперссылки
people.forEach(person => {
    let item = document.createElement('li');
    item.innerHTML = `<a href="#">${person.popup}</a>`;
    item.addEventListener('click', onClick.bind(null, person));
    list.appendChild(item);
});
//Leaflet.MeasureControl - расчет расстояния 
L.Control.measureControl().addTo(mymap);
//L.Control.MousePosition - отображение координат
L.control.mousePosition().addTo(mymap);





