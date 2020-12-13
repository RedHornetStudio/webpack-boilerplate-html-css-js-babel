import '../scss/style.scss';
import TriumphBike from '../img/triumph.jpg';

const galery = document.querySelector('.galery');
const img = document.createElement('img');
img.alt = 'triumph';
img.src = TriumphBike;
galery.appendChild(img); 