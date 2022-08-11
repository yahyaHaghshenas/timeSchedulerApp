import { v4 as uuidV4, V4Options } from "uuid"



type Task = {
  id: string 
  title: string
  completed: boolean
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title") 


const tasks: Task[] = []
// =  loadTasks()
// tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return 
  
  const newTask: Task ={
    id:uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask)


  addListItem(newTask)
  input.value = ""
})

/**
 * 
 * @param task 
 */

function addListItem(task:Task){
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")


  // this is how you implenment bootstrap
  checkbox.className = "form-check-input"

  
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)



}


function saveTasks(){
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}



function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}