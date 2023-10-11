const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#tasks");
const error = document.querySelector("#error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";
  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }
  const task = `
<div class="task">
    <input type="checkbox"  class="task-check">
    <span class="taskname">${taskName}</span>
    <button class="edit">
    <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="delete">
    <i class="fa-solid fa-trash"></i>
    </button>
</div>`;

  taskContainer.insertAdjacentHTML("afterend", task);

  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    });
  });

  const editButtons = document.querySelectorAll(".edit");  
  editButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      let targetElement = e.target;
    
      if (!(e.target.className == "edit")) {
        targetElement = e.target.parentElement;
        console.log(targetElement)
      }
      newTaskInput.value = targetElement.previousElementSibling?.innerText;
      targetElement.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    })
  );
  const taskCheck = document.querySelectorAll(".task-check");
  taskCheck.forEach((checkBox) =>
    checkBox.addEventListener("change", () => {
      checkBox.nextElementSibling.classList.toggle("completed");
      if (checkBox.checked) {
        taskCount -= 1;
      } else {
        taskCount += 1;
      }
      displayCount(taskCount);
    })
  );
  taskCount += 1;
  displayCount(taskCount);
  newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);
document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
window.addEventListener("onload",()=>{
  taskCount = 0 ;
  displayCount(taskCount)
  newTaskInput.value = ""
})

if (!task) {
  taskCount = 0;
}