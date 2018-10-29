// Create an array of our animals
const animals = [
  { name: "shadow", fullName: "Shadow Clan", emoji: "🌌" },
  { name: "wind", fullName: "Wind Clan", emoji: "💨" },
  { name: "thunder", fullName: "Thunder Clan", emoji: "⛈" },
  { name: "river", fullName: "River Clan", emoji: "🏞" },
  { name: "sky", fullName: "Sky Clan", emoji: "🌄" }
]

// Store answers as they roll in
let answers = []
let animal = null
let selectedAnswers = null

// Click the button to tabulate your result
$(document).on("click", "[data-behavior~=tabulate-result]", function(event) {
  event.preventDefault()

  // Find all selected answers
  selectedAnswers = $('input[type=radio]:checked')

  // Add the selections to the answers array
  selectedAnswers.each(function(){
    answers.push(this.value.split(","))
  })

  // Get the most common animal across your answers
  animal = mode([].concat.apply([], answers))

  // Display your animal
  $("[data-role=animal-emoji]").html(getAnimal(animal).emoji)
  $("[data-role=animal-name]").html(getAnimal(animal).fullName)
  $("[data-role=zoom-container]").fadeIn("fast")

  // Reset the form
  $('form').get(0).reset()

  // Reset the animals array
  answers = []
})

// Click an animal
$(document).on('click', "[data-behavior~=unzoom]", function(event) {
  event.preventDefault()

  // Scroll back to the top of the quiz
  window.scrollTo(0,0)

  // Hide the dialog
  $("[data-role=zoom-container]").fadeOut("fast")
})

// Find the full name and emoji of the selected animal
function getAnimal(animal) {
  return animals.find(function(obj) { return obj.name === animal })
}

// Find the most frequent, unique item in the merged array
function mode(arr) {
  return arr.sort((a,b) =>
      arr.filter(v => v===a).length
    - arr.filter(v => v===b).length
  ).pop()
}
