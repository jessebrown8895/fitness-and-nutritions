

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form")
    
        form.addEventListener("submit", (e) => {
        filteredExercises(e)
    })
    
       
    routinesFetch()
    })

const BASE_URL = "http://localhost:3000/"
// const filteredExercise = document.getElementById("filteredExercises")
const routinesFetch = () =>{
    fetch(BASE_URL + "routine")
    .then(resp => resp.json())
    .then(routines => {
        appendRoutines(routines)
    })
}
const filteredExercises = (e) => {
        e.preventDefault()
        
        const value = document.getElementById("inputForm").value
        
        fetch("http://localhost:3000/exercise")
        .then(resp => resp.json())
        .then(data => { 
            let findData = data.find(exerciseName => exerciseName.name === value)
            if(findData){
                findExercise(findData)
            }
            else{
                const errorMessage = {
                    name: "Error",
                    explanation: "No data found"
            }
            findExercise(errorMessage)
        }
            form.reset()
        })
        
}
const findExercise = (data) => {
    const div = document.createElement("div")
    console.log(data)
    document.getElementById("filteredExercises").innerHTML += `${data.name}: ${data.explanation}<br/><br/>`
    
     
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
    const muscleDiv = document.getElementById("muscle") 
    const exerciseDiv = document.getElementById("exercise")
    muscleDiv.innerHTML = ""
    exerciseDiv.innerHTML = ""
fetch("http://localhost:3000/muscle?routine="+routineName)
    .then(resp => resp.json())
    .then(muscles => {

        // Remove all of the muscles from muscleDiv 
        // from the last time we clicked on a routine
         
        // while(muscleDiv.firstChild){
        //     muscleDiv.removeChild(muscleDiv.firstChild)
        // }

        // Add the new muscles to muscleDiv for the
        // routine we just clicked on
        muscles.forEach(muscle => {
            const div = document.createElement("div")
            div.id = muscle.name
            
            div.className = "muscles"
            div.innerText = muscle.name
            document.getElementById("muscle").appendChild(div)
            div.addEventListener("click", () => renderExercise(muscle.name))
            
                
        })
    })
}

const renderExercise = (exerciseName) => {  
    fetch("http://localhost:3000/exercise?muscle="+exerciseName)
    .then(resp => resp.json())
    .then(exerciseData => {

        const exerciseDiv = document.getElementById("exercise") 
        // while(exerciseDiv.firstChild){
        //     exerciseDiv.removeChild(exerciseDiv.firstChild)
        // }
        
        exerciseData.forEach(exerciseName => {
            const div = document.createElement("div")
            div.id = exerciseName.name
            div.classeName = "exercises"
            div.innerText = exerciseName.name 
            document.getElementById("exercise").appendChild(div)
        })
    })
}











    
   