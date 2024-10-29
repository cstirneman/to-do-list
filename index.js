$(document).ready(function() {
    let titleInput, timeInput, dateInput, urgencyInput;
    let createBtn = $("#create-btn");
    let clearBtn = $("#clear-btn");
    let saveBtn = $("#save-btn");
    let noteInfo = [];
    let editingIndex = null;

    // Add task
    createBtn.click(function () {
        getInputs();

        if (inputsAreValid()) {
            let Note = createNoteObject();

            noteInfo.push(Note);
            addTaskToList(Note);

            clearInputs();
        } else {
            alert("Please complete the fields before creating a task.");
        }
    });

    // Clear input fields
    clearBtn.on("click", clearInputs);

    // Move to Completed Tasks
    $(document).on("click", "#task-list .checkbox", function(event) {
        moveToCompletedTasks($(this).closest("li"));
    });

    // Remove task from Completed Tasks
    $(document).on("click", "#completed-task-list .checkbox", function(event) {
        console.log("Removing task from completed section");
        $(this).closest("li").remove(); // Directly remove the <li> in the completed list
    });

    function getInputs() {
        titleInput = $("#title-input").val();
        timeInput = $("#time-input").val();
        dateInput = $("#date-input").val();
        urgencyInput = $("#urgency-input").val();
    }

    function inputsAreValid() {
        return titleInput !== "" && timeInput !== "" && dateInput !== "" && urgencyInput !== "";
    }

    function createNoteObject() {
        return {
            title: titleInput,
            time: convertTime(timeInput),
            date: formatDate(dateInput),
            urgency: urgencyInput
        };
    }

    function addTaskToList(note) {
        let newTask = $("<li>").text(note.title + ", " + note.time + ", " + note.date).addClass("new-task");
        styleTaskByUrgency(newTask, note.urgency);

        let checkbox = $("<input>").attr("type", "checkbox").addClass("checkbox");
        newTask.append(checkbox);
        $("#task-list").append(newTask);
    }

    function moveToCompletedTasks(taskElement) {
        taskElement.addClass('completed-task');
        taskElement.find(".checkbox").prop("checked", false); // Uncheck the box when moving
        $("#completed-task-list").append(taskElement);
    }

    function clearInputs() {
        $("#title-input").val("");
        $("#time-input").val("");
        $("#date-input").val("");
        $("#urgency-input").val("low");
    }

    function styleTaskByUrgency(taskElement, urgency) {
        if (urgency === "low") {
            taskElement.css("color", "green");
        } else if (urgency === "medium") {
            taskElement.css("color", "goldenrod");
        } else {
            taskElement.css("color", "red");
        }
    }

    function convertTime(time) {
        let [hours, minutes] = time.split(":");
        let period = "AM";

        let hour = parseInt(hours);

        if (hour >= 12) {
            period = "PM";
            if (hour > 12) {
                hour -= 12;
            }
        } else if (hour === 0) {
            hour = 12;
        }

        return `${hour}:${minutes} ${period}`;
    }

    function formatDate(date) {
        let [year, month, day] = date.split("-");
        return `${month}/${day}/${year}`;
    }
});
