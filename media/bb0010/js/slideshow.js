// TODO docs
/**
 * As imagens são embaralhadas cada vez que a página carrega.
 * 
 * Tamanho e posicionameno das imagens é relativo a parte maior da view.
 * Tamanho vai de 50% a 60%.
 * 
 * Uma imagem entra a cada 2 a 10 segundos.
 * Após ter 5 imagens na tela, começam a desaparecer aleatóriamente a cada 2 a 10 segundos.
 */


/**
 * Slideshow
 */

// Elements
const ROOT = document.getElementById("vcb-slideshow-root");

// Config
const PRODUCTION = true
const TIMER = PRODUCTION ? 2000 : 500
const MIN_IMG_SHOW = 5
const PROD_IMGS = ['corrompida_0001.png', 'corrompida_0002.png', 'corrompida_0003.png', 'corrompida_0004.png', 'corrompida_0005.png', 'corrompida_0006.png', 'corrompida_0007.png', 'corrompida_0008.png', 'corrompida_0009.png', 'corrompida_0010.png', 'corrompida_0011.png', 'corrompida_0012.png', 'corrompida_0013.png', 'corrompida_0014.png', 'corrompida_0015.png', 'corrompida_0016.png', 'corrompida_0017.png', 'corrompida_0018.png', 'corrompida_0019.png', 'corrompida_0020.png', 'corrompida_0021.png', 'corrompida_0022.png', 'corrompida_0023.png', 'corrompida_0024.png', 'corrompida_0025.png', 'corrompida_0026.png', 'corrompida_0027.png', 'corrompida_0028.png', 'corrompida_0029.png', 'corrompida_0030.png', 'corrompida_0031.png', 'corrompida_0032.png', 'corrompida_0033.png', 'corrompida_0034.png', 'corrompida_0035.png', 'corrompida_0036.png', 'corrompida_0037.png', 'corrompida_0038.png', 'corrompida_0039.png']
const DEV_IMGS = ['corrompida_0003.png', 'corrompida_0005.png', 'corrompida_0017.png', 'corrompida_0018.png', 'corrompida_0020.png', 'corrompida_0022.png', 'corrompida_0024.png', 'corrompida_0026.png', 'corrompida_0027.png', 'corrompida_0029.png', 'corrompida_0030.png', 'corrompida_0031.png', 'corrompida_0039.png']
const IMAGES = PRODUCTION ? PROD_IMGS : DEV_IMGS
const SHUFFLED_IMAGES = shuffleArray(IMAGES)
const MIN_DELAY_APPEAR = 2000
const MAX_DELAY_APPEAR = 10000
const MIN_DELAY_DISAPPEAR = 2000
const MAX_DELAY_DISAPPEAR = 10000
const MIN_SLIDES = 5

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

  const x = ((Math.random() * (innerWidth - size)) / innerWidth) * 100
  const y = ((Math.random() * (innerHeight - size)) / innerHeight) * 100

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
  slidesVisible = shuffleArray(slidesVisible)
  
  ROOT.appendChild(image)
}

function initSlideshow() {
  maxSlides = slides.length

  addImage(slides[0])
  currentSlide++

  const initialTimeout = randomIntFromInterval(MIN_DELAY_APPEAR, MIN_DELAY_APPEAR * 1.5)
  console.log(`initial delay ${initialTimeout}ms`)

  function createSlide() {
    const newTimeout = randomIntFromInterval(MIN_DELAY_APPEAR, MAX_DELAY_APPEAR)
    console.log(`added slide with delay ${newTimeout}ms`)
    if (currentSlide + 1 < maxSlides) {
      currentSlide++
    } else {
      currentSlide = 0
    }

    // if (currentSlide >= 5)

    addImage(slides[currentSlide])

    setTimeout(createSlide, newTimeout)
  }
  setTimeout(createSlide, initialTimeout)

  function removeSlide() {
    const newTimeout = randomIntFromInterval(MIN_DELAY_APPEAR, MAX_DELAY_APPEAR)
    console.log(`remove slide with delay ${newTimeout}ms`)
    setTimeout(removeSlide, newTimeout)

    if (slidesVisible.length < MIN_SLIDES) return

    const toDelete = slidesVisible.shift()
    toDelete.remove()

    /**
     * If was necessary add desappear effect.
     */
    // toDelete.classList.add('vcb-img-disappear')
    // disappearingImages.push(toDelete)

    // const pruneSlide = setTimeout(function() {
    //   toDelete.remove()
    //   clearTimeout(pruneSlide)
    // }, 1500)
  }
  setTimeout(removeSlide, initialTimeout * 5);
}

const TIMEOUTS = 20
const timeouts = new Set()
function prepareNexts () {
  maxSlides = slides.length

  const availableTimeouts = TIMEOUTS - timeouts.size

  if (!slidesVisible.length) {
    addImage(slides[currentSlide])
    currentSlide++
  }

  for (let t = 1; t <= availableTimeouts; t++) {
    const timeout = randomIntFromInterval(MIN_DELAY_APPEAR, MAX_DELAY_APPEAR)
    console.log(`added slide with delay ${timeout}ms`)
    
    const curTimeout = setTimeout(() => {
      addImage(slides[currentSlide])

      if (currentSlide + 1 < maxSlides) {
        currentSlide++
      } else {
        currentSlide = 0
      }

      timeouts.delete(curTimeout)

      prepareNexts()
    }, timeout)
    
    timeouts.add(curTimeout)
  }

}

/**
 * Events
 */

let scale = 1;
function scrollToZoom(event) {
  scale += event.deltaY * -0.00005;
  // Restrict scale
  scale = Math.min(Math.max(0.9, scale), 1.9);

  ROOT.style.transform = `scale(${scale})`;
}

// function pointerdown_handler(ev) {
//   // The pointerdown event signals the start of a touch interaction.
//   // This event is cached to support 2-finger gestures
//   evCache.push(ev);
//   console.log("pointerDown", ev);
// }

// function pointermove_handler(ev) {
//   // This function implements a 2-pointer horizontal pinch/zoom gesture. 
//   //
//   // If the distance between the two pointers has increased (zoom in), 
//   // the target element's background is changed to "pink" and if the 
//   // distance is decreasing (zoom out), the color is changed to "lightblue".
//   //
//   // This function sets the target element's border to "dashed" to visually
//   // indicate the pointer's target received a move event.
//   console.log("pointerMove", ev);
//   ev.target.style.border = "dashed";
 
//   // Find this event in the cache and update its record with this event
//   for (var i = 0; i < evCache.length; i++) {
//     if (ev.pointerId == evCache[i].pointerId) {
//        evCache[i] = ev;
//     break;
//     }
//   }
 
//   // If two pointers are down, check for pinch gestures
//   if (evCache.length == 2) {
//     // Calculate the distance between the two pointers
//     var curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);
 
//     if (prevDiff > 0) {
//       if (curDiff > prevDiff) {
//         // The distance between the two pointers has increased
//         console.log("Pinch moving OUT -> Zoom in", ev);
//         ev.target.style.background = "pink";
//       }
//       if (curDiff < prevDiff) {
//         // The distance between the two pointers has decreased
//         console.log("Pinch moving IN -> Zoom out",ev);
//         ev.target.style.background = "lightblue";
//       }
//     }
 
//     // Cache the distance for the next move event 
//     prevDiff = curDiff;
//   }
//  }
/**
 * Loader
 */

// var evCache = new Array();
// var prevDiff = -1;

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

  const body = document.querySelector('body');
  body.onwheel = scrollToZoom;

  // body.onpointerdown = pointerdown_handler;
  // body.onpointermove = pointermove_handler;
 
  // // Use same handler for pointer{up,cancel,out,leave} events since
  // // the semantics for these events - in this app - are the same.
  // body.onpointerup = pointerup_handler;
  // body.onpointercancel = pointerup_handler;
  // body.onpointerout = pointerup_handler;
  // body.onpointerleave = pointerup_handler;
}

main()
