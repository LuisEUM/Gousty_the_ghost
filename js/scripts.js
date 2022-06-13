//  Botones animados
var animation = bodymovin.loadAnimation({
    container: document.getElementById('downArrow'),
    remderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/js/animations/downArrows.json'
})

var animationYesButton = bodymovin.loadAnimation({
    container: document.getElementById('yesButton'),
    remderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/js/animations/yesButton.json'
})

var animationNoButton = bodymovin.loadAnimation({
    container: document.getElementById('noButton'),
    remderer: 'svg',
    loop: false,
    autoplay: false,
    path: '/js/animations/noButton.json',
},
)


const element = document.getElementById("noButton");
element.addEventListener("click", noButton);

function noButton() {
    animationNoButton.play= true
     alert('Really?!... Are you sure?:(')
}

// hero con fondo de burbujas
const colors = [
    '#652d90',
  
  ];

  createSquare = () => {
    const section = document.querySelector('section');
    const square = document.createElement('span');
    square.classList.add('bubbles')
    const size = Math.random() * 50;
    
    square.style.width = 20 + size + 'px';
    square.style.height = 20 + size + 'px';
    
    square.style.top = Math.random() * innerHeight + 'px';
    square.style.left = Math.random() * innerWidth + 'px';
    
    square.style.background = colors[Math.floor(Math.random() * colors.length)];
    section.appendChild(square);
    
    setTimeout(() => {
      square.remove()
    }, 5000);
  }
  
  setInterval(createSquare, 150);

    window.addEventListener("keydown", function(e) {
      if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
      }
  }, false);
  //inicio de las lineas coloridas
