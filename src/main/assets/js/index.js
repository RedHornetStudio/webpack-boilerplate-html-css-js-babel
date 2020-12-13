import '../scss/style.scss';
import YamahaBike from '../img/yamaha-r6-bike.jpg';

const galery = document.querySelector('.galery');
const img = document.createElement('img');
img.alt = 'yamaha';
img.src = YamahaBike;
galery.appendChild(img); 