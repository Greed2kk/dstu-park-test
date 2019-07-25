//координаты парка дгту
var mymap = L.map('mapid').setView([47.24007, 39.71067], 18);
//openstreetmap слой
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    controls: ['zoomControl', 'typeSelector', 'geolocationControl', 'fullscreenControl'],
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
let markers_info = [{
        name: 'Парк ДГТУ',
        inf: 'Студенческий парк',
        latLng: [47.24011, 39.71068],
        marker_id: '1',
        icon: treeIcon,
        popup: '<b>Парк ДГТУ</b><br/>Студенческий парк'
    },
    {
        name: 'Манеж ДГТУ',
        inf: '',
        latLng: [47.24082, 39.70931],
        marker_id: '2',
        icon: sportIcon,
        popup: '<b>Манеж ДГТУ</b>'
    },
    {
        name: 'Футбольное поле',
        inf: 'Поле для мини-футбола',
        latLng: [47.23882, 39.71025],
        marker_id: '3',
        icon: footballIcon,
        popup: '<b>Футбольное поле</b><br/>Поле для мини-футбола'
    },
    {
        name: 'Общежитие ДГТУ',
        inf: 'Место временного проживания иногородних студентов',
        latLng: [47.23951, 39.71273],
        marker_id: '4',
        icon: bedIcon,
        popup: '<b>Общежитие ДГТУ</b><br/>Место временного проживания иногородних студентов'
    },
    {
        name: 'Бассеин ДГТУ',
        inf: '',
        latLng: [47.23887, 39.71097],
        marker_id: '5',
        icon: pooltIcon,
        popup: '<b>Бассеин ДГТУ</b>'
    },
    {
        name: 'Поле для бега',
        inf: 'Зал для тренеровок студентов ДГТУ',
        latLng: [47.2394, 39.7091],
        marker_id: '6',
        icon: runIcon,
        popup: '<b>Поле для бега</b>'
    },
    {
        name: 'Волейбольный зал ДГТУ',
        inf: '',
        latLng: [47.23896, 39.71145],
        marker_id: '7',
        icon: volleyballIcon,
        popup: '<b>Волейбольный зал ДГТУ</b><br/>Зал для тренеровок студентов ДГТУ'
    }
];
// создание группы маркеров
let group = L.layerGroup(),
    list = document.getElementById('list')
// проход по массиву маркеров
markers_info.forEach(markers => {
    let marker = L.marker(markers.latLng, {
        title: markers.name,
        icon: markers.icon
    }).bindPopup(markers.popup);
    // добавление на слой маркеров
    group.addLayer(marker);
    // сохранение id
    markers.marker_id = group.getLayerId(marker);
});
group.addTo(mymap);
// Click handler для попапа и перемещения
function onClick(data) {
    let {
        marker_id
    } = data,
    marker = group.getLayer(marker_id);
    mymap.panTo(marker.getLatLng(), marker.openPopup());
}
// гиперссылки списком
/*
markers_info.forEach(marker => {
    let item = document.createElement('li');
    item.innerHTML = `<a href="#">${marker.popup}</a>`;
    item.addEventListener('click', onClick.bind(null, marker));
    list.appendChild(item);
});
  */
//удаление маркеров при отдалении
 mymap.on('zoomend' , function (e) {
    if (mymap.getZoom()>14)
    {
        
        group.addTo(mymap);
    }else {
        group.remove();
    }
});
//Leaflet.MeasureControl - расчет расстояния 
L.Control.measureControl().addTo(mymap);
//L.Control.MousePosition - отображение координат
L.control.mousePosition().addTo(mymap);
//backbone списки
var MyView = Backbone.View.extend({
    marker: {},
    initialize: function (data) {
        this.marker = data;
    },
    render: function () {
        var html = ' <div class="list-group-item list-group-item-action active" id="header"></div>' +
            '<ul class="list-group"><li class="list-group-item list-group-item-action p-2" id="inf"></li></ul><br>';
        this.$el.html(html);
        this.$el.find('#header').text(this.marker.name).bind('click', onClick.bind(null, this.marker));
        this.$el.find('#inf').text(this.marker.inf).bind('click', onClick.bind(null, this.marker));
        $('#list').append(this.$el);
    }
});
markers_info.forEach(function (marker) {
    (new MyView(marker)).render()
});