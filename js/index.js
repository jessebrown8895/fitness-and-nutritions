const BASE_URL = "http://localhost:3000/"
// const mapMusclesToIndex = {
//     "pull": 0,
//     "push": 1,
//     "lowerBody": 2
// }
const routinesFetch = () =>{
    fetch(BASE_URL + "routine")
    .then(resp => resp.json())
    .then(routines => {
        appendRoutines(routines)
    })
}

const appendRoutines = (routines) => {
        routines.forEach(routine => {
            const div = document.createElement("div")
            div.id = routine.name
            div.className = "routine"
            div.innerText = routine.description
            document.getElementById("routine").appendChild(div)
            div.addEventListener("click", () => renderMuscles(routine.name))
        })
    }

const renderMuscles = (routineName) => {
fetch("http://localhost:3000/muscle?routine="+routineName)
    .then(resp => resp.json())
    .then(muscles => {
        
        // Remove all of the muscles from muscleDiv 
        // from the last time we clicked on a routine
        const muscleDiv = document.getElementById("muscle")  
        while(muscleDiv.firstChild){
            muscleDiv.removeChild(muscleDiv.firstChild)
        }

        // Add the new muscles to muscleDiv for the
        // routine we just clicked on
        muscles.forEach(muscle => {
            const div = document.createElement("div")
            div.id = muscle.name
            div.className = "muscle"
            div.innerText = muscle.name
            document.getElementById("muscle").appendChild(div)
            
        })
    })
}

document.addEventListener("DOMContentLoaded", routinesFetch)


// const targetGroup = e.target.id
    // exercises.forEach(exercise => {
    //     if(Object.keys(exercise).includes(targetGroup)){
    //         console.log(exercise)

    
   