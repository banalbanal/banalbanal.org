// TODO docs
/**
 * Tamanho das imagens é relativo a parte maior da view. 
 */


/**
 * Slideshow
 */

// Elements
const ROOT = document.getElementById("vcb-slideshow-root");

// Config
const PRODUCTION = true
const SFW = !PRODUCTION
const TIMER = PRODUCTION ? 2000 : 500
const MIN_IMG_SHOW = 5
const PROD_IMGS = ['corrompida_0001.png', 'corrompida_0002.png', 'corrompida_0003.png', 'corrompida_0004.png', 'corrompida_0005.png', 'corrompida_0006.png', 'corrompida_0007.png', 'corrompida_0008.png', 'corrompida_0009.png', 'corrompida_0010.png', 'corrompida_0011.png', 'corrompida_0012.png', 'corrompida_0013.png', 'corrompida_0014.png', 'corrompida_0015.png', 'corrompida_0016.png', 'corrompida_0017.png', 'corrompida_0018.png', 'corrompida_0019.png', 'corrompida_0020.png', 'corrompida_0021.png', 'corrompida_0022.png', 'corrompida_0023.png', 'corrompida_0024.png', 'corrompida_0025.png', 'corrompida_0026.png', 'corrompida_0027.png', 'corrompida_0028.png', 'corrompida_0029.png', 'corrompida_0030.png', 'corrompida_0031.png', 'corrompida_0032.png', 'corrompida_0033.png', 'corrompida_0034.png', 'corrompida_0035.png', 'corrompida_0036.png', 'corrompida_0037.png', 'corrompida_0038.png', 'corrompida_0039.png']
const DEV_IMGS = [] // TODO
const IMAGES = PRODUCTION ? PROD_IMGS : DEV_IMGS
const SHUFFLED_IMAGES = shuffleArray(IMAGES)

// STATE
let currentSlide = 0
let slides = []
let maxSlides = 0
let slidesVisible = []
let disappearingImages = []

/**
 * Loading
 */

let loaded = 0
const IMAGES_TO_LOAD = IMAGES.length
const LOADING = document.getElementById("vcb-loading");

/**
 * Helpers
 */

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

  const unit = innerWidth > innerHeight ? 'vw' : 'vh'
  const relativeUnit = (size / biggerSize) * 100
  const styleValue = `${relativeUnit}${unit}`

  return { size, unit, relativeUnit, styleValue }
}

function getRandomPos(size) {
  const { innerWidth, innerHeight } = window

  const x = ((Math.random() * (innerWidth - (size * .6))) / innerWidth) * 100
  const y = ((Math.random() * (innerHeight - (size * .6))) / innerHeight) * 100

  return { x: `${x}vw`, y: `${y}vh` }
}

/**
 * Slideshow
 */

function addImage(image) {
  const { size, styleValue } = getRandomSize()
  const pos = getRandomPos(size)

  image.style.left = pos.x
  image.style.top = pos.y
  image.style.width = styleValue
  image.style.height = styleValue
  image.classList.remove('vcb-img-disappear')

  slidesVisible.push(image)
  ROOT.appendChild(image)
}

function initSlideshow() {
  maxSlides = slides.length

  addImage(slides[0])
  currentSlide = 0

  const ticker = setInterval(function () {
    if (currentSlide + 1 < maxSlides) {
      currentSlide++
    } else {
      currentSlide = 0
    }

    // FOR DEVELOP MODE ONLY
    // if (!PRODUCTION && (currentSlide === 1)) {
    // if (!PRODUCTION && (currentSlide === 10)) {
    //   clearInterval(ticker)
    //   return
    // }

    // NOT COMPLETED
    // const canDeleteOne = currentSlide > MIN_IMG_SHOW
    // if (canDeleteOne) {
    //   const timeToClean = TIMER <= 500 ? 2 : ((TIMER / 1000) * 2)

    //   if (currentSlide % timeToClean) {
    //     disappearingImages.forEach((image) => {
    //       image.remove()
    //     });
    //     disappearingImages = []

    //     const toDelete = slidesVisible.shift()
    //     toDelete.classList.add('vcb-img-disappear')
    //     disappearingImages.push(toDelete)
    //   }
    // }

    // console.log('aqui', slides, currentSlide)
    addImage(slides[currentSlide])
  }, TIMER)
}

/**
 * Loader
 */

function main() {
  SHUFFLED_IMAGES.forEach((src) => {
    const image = new Image()
    image.src = `images/${src}`
    image.id = src
    // image.classList.toggle('vcb-img-disappear')

    image.onload = function() {
      loaded += 1
      const percent = (loaded / IMAGES_TO_LOAD) * 100
      if (percent === 100) {
        setTimeout(() => {
          initSlideshow()
          LOADING.innerText = ''
        }, 500)
      }
    
      LOADING.innerText = `${Number(percent).toFixed(0)}%`
    }
    
    slides.push(image)
  });
}

main()
