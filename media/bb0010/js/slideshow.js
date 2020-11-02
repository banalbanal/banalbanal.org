const IMAGES = [
  'corrompida_0001.png', 'corrompida_0002.png', 'corrompida_0003.png', 'corrompida_0004.png', 'corrompida_0005.png', 'corrompida_0006.png', 'corrompida_0007.png', 'corrompida_0008.png', 'corrompida_0009.png', 'corrompida_0010.png', 'corrompida_0011.png', 'corrompida_0012.png', 'corrompida_0013.png', 'corrompida_0014.png', 'corrompida_0015.png', 'corrompida_0016.png', 'corrompida_0017.png', 'corrompida_0018.png', 'corrompida_0020.png', 'corrompida_0021.png',
  'detalhes_corrompida_0001.png', 'detalhes_corrompida_0002.png', 'detalhes_corrompida_0003.png', 'detalhes_corrompida_0004.png', 'detalhes_corrompida_0005.png', 'detalhes_corrompida_0006.png', 'detalhes_corrompida_0007.png', 'detalhes_corrompida_0008.png', 'detalhes_corrompida_0009.png', 'detalhes_corrompida_0010.png', 'detalhes_corrompida_0011.png', 'detalhes_corrompida_0012.png', 'detalhes_corrompida_0013.png', 'detalhes_corrompida_0014.png', 'detalhes_corrompida_0015.png', 'detalhes_corrompida_0016.png', 'detalhes_corrompida_0017.png', 'detalhes_corrompida_0018.png', 'detalhes_corrompida_0019.png', 'detalhes_corrompida_0020.png', 'detalhes_corrompida_0021.png',
]

function shuffleArray(arr) {
  if (!arr || arr.length <= 0) return []

  const newArr = [].concat(arr)
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i)
    const temp = newArr[i]
    newArr[i] = newArr[j]
    newArr[j] = temp
  }

  return newArr
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomSize() {
  const { innerWidth, innerHeight } = window

  const biggerSize = innerWidth > innerHeight ? innerWidth : innerHeight
  const multiply = randomIntFromInterval(50, 60) / 100
  const size = biggerSize * multiply

  return size
}

function getRandomPos(size) {
  const { innerWidth, innerHeight } = window

  const x = (Math.random() * (innerWidth - (size * .6))).toFixed();
  const y = (Math.random() * (innerHeight - (size * .6))).toFixed();

  return { x, y }
}

const ROOT = document.getElementById("vcb-slideshow-root");
function createRandomImage2(image) {
  const size = getRandomSize()
  const pos = getRandomPos(size)

  image.style.left = pos.x
  image.style.top = pos.y
  image.width = size
  image.height = size

  ROOT.appendChild(image)
}

let SLIDES = []
let MAX_SLIDES = 0
let currentSlide = 0
// const TIMER = 500
const TIMER = 2000

function initSlideshow() {
  MAX_SLIDES = SLIDES.length

  createRandomImage2(SLIDES[0])
  createRandomImage2(SLIDES[1])
  createRandomImage2(SLIDES[2])
  currentSlide = 2

  setInterval(function () {
    if (currentSlide + 1 < MAX_SLIDES) {
      currentSlide++
    } else {
      currentSlide = 0
    }
    createRandomImage2(SLIDES[currentSlide])
  }, TIMER)
}

let loaded = 0
const totalImages = IMAGES.length
const loading = document.getElementById("vcb-loading");
function updateLoader() {
  loaded += 1
  const percent = (loaded / totalImages) * 100
  if (percent === 100) setTimeout(() => { initSlideshow() }, 550)

  loading.innerText = `${Number(percent).toFixed(0)}%`

  return percent
}

function init() {
  const imagesStr = shuffleArray(IMAGES)

  imagesStr.forEach((src) => {
    const image = new Image()
    image.src = `images/${src}`

    image.onload = function() {
      const percent = updateLoader()
      console.log(percent)
    }
    
    SLIDES.push(image)
  });
}
init()
