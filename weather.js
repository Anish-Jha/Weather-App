// Retro-futuristic canvas animation (grid with scanlines)
const canvas = document.getElementById('retroCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawRetroBackground() {
  ctx.fillStyle = '#0A0A0A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Neon grid
  ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Scanlines
  ctx.strokeStyle = 'rgba(255, 0, 255, 0.1)';
  for (let y = 0; y < canvas.height; y += 10) {
    ctx.beginPath();
    ctx.moveTo(0, y + Math.sin(Date.now() * 0.001 + y * 0.01) * 2);
    ctx.lineTo(canvas.width, y + Math.sin(Date.now() * 0.001 + y * 0.01) * 2);
    ctx.stroke();
  }
}

function animate() {
  drawRetroBackground();
  requestAnimationFrame(animate);
}
animate();

// Weather fetch logic (updated for new UI)
function subMit() {
  let city = document.getElementById('citY').value.trim() || 'Delhi';
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=78e7e43bb31b090bb5ba44efc9cb3758`)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => {
      document.getElementById('fir').textContent = `PLACE: ${data.name}`;
      document.getElementById('sec').textContent = `TEMP: ${Math.round(data.main.temp - 273.15)}°C`;
      document.getElementById('thi').textContent = `HUMIDITY: ${data.main.humidity}%`;
      document.getElementById('for').textContent = `WIND: ${data.wind.speed} km/h`;
      document.getElementById('six').textContent = `WEATHER: ${data.weather[0].main}`;

      // Show elements
      ['fir', 'sec', 'thi', 'for', 'six'].forEach(id => {
        document.getElementById(id).classList.remove('hidden');
      });

      // Update map
      document.getElementById('gmap_canvas').src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
      document.getElementById('gmap_canvas').classList.remove('hidden');
    })
    .catch(error => {
      console.log('Error:', error);
      resetUI();
    });
}

function resetUI() {
  ['fir', 'sec', 'thi', 'for', 'six', 'gmap_canvas'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
}

document.getElementById('Btn').addEventListener('click', subMit);
window.addEventListener('load', () => {
  document.getElementById('citY').value = '';
  subMit();
});