// get the text nodes in the logo
var nodes = []
var walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT)
while(walker.nextNode()) nodes.push(walker.currentNode)


// pull out letters, and wrap in <span>
var letters = nodes.reduce( (letters, node) => {
  while(node.nodeValue) {
    let next = node.splitText(1)
    let span = document.createElement('span')
    span.appendChild(node.cloneNode())
    node.parentElement.replaceChild(span, node)

    letters.push(span)

    node = next
  }

  return letters
}, [])


// to fill (?) - rAF * performance

function play(timeline) {
  var start = performance.now(),
      i = 0, s = 0

  function show(t, index, letter, colour) {
    if(letter) letters[index].textContent = letter
    if(colour) letters[index].style.color = colour
  }

  function render(t) {

    while(timeline[i] && timeline[i][0] <= (t - start - s)) {
      show.apply(null, timeline[i])
      s += timeline[i][0]
      i++
    }

    if(i < timeline.length)
      requestAnimationFrame(render)
    // else
      // console.log("done")
  }
  requestAnimationFrame(render)

}


// sweep letters from top left to bottom right
function transitionA(letters, colour) {
  return [
    [  0, 0, letters[0], colour],
    [ 40, 1, letters[1], colour],
    [  0, 4, letters[4], colour],
    [ 40, 2, letters[2], colour],
    [  0, 5, letters[5], colour],
    [ 40, 3, letters[3], colour],
    [  0, 6, letters[6], colour],
    [ 40, 7, letters[7], colour]
  ]
}

function fill(n, str) {
  // Array.from({length:n}, _ => str)
  var arr = new Array(n)
  for (var i = 0; i < arr.length; i++) {
    arr[i] = str
  }
  return arr
}


// sweep from top left to bottom right
var animation1 = 'jsoxconf'.split('')
  .reduce((timeline, letter, i) => {
    var c = i % 2 ? 'aquamarine' : '#f08'
    return timeline
      .concat(transitionA(fill(8, letter), c))
      .concat([[100]])
  }, [])
  .concat(
    transitionA('jsoxconf'.split(''), '#000')
  )



// side by side blocky thing
var animation2 = ['jjss','ooxx','conf']
  .map(s => s.split(''))
  .reduce( (timeline, letters, i) => {
    var c  =  i % 2 ? 'aquamarine' : '#f08'
    var c2 = !(i % 2) ? 'aquamarine' : '#f08'
    return timeline.concat([
      [0, 0, letters[0], c],
      [0, 4, letters[0], c],
      [0, 1, letters[1], c],
      [0, 5, letters[1], c],
      [0, 3, letters[3], c2],
      [0, 7, letters[3], c2],
      [0, 2, letters[2], c2],
      [0, 6, letters[2], c2],
      [800],
    ])
  }, [])
  .concat(
    transitionA('jsoxconf'.split(''), '#000')
  )



// random
var animation3 = Array.from({length:40}, _ => [
  Math.random() * 20,
  Math.floor(Math.random() * 8),
  Math.random().toString(32)[2],
  Math.random() > 0.5 ? 'aquamarine' : '#f08'
])
.concat(
  transitionA('jsoxconf'.split(''), '#000')
)



// emoji (doesn't work well)
var animation4 = Array.from({length:40}, (_,i) => [
  Math.random() * 120,
  i % 8,
  random(['👏','🎉','💯','💕','💥'])
])
.concat(
  transitionA('jsoxconf'.split(''), '#000')
)

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}



setInterval(function() {
  play(random([animation1, animation2, animation3, animation4]))
}, 5000)
