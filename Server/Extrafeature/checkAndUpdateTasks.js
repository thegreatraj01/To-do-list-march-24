import Todo from "../Schema/ToDo.js";

const checkAndUpdateTasks = async () => {
    console.log("hi")
    try {
        const currentDate = new Date();

        // Find tasks where dueDate is less than the current date,
        // completed is false, and missed is false
        const tasksToUpdate = await Todo.find({
            dueDate: { $lt: currentDate },
            completed: false,
            missed: false
        });

        // Update each task to set completed to true and missed to true
        for (const task of tasksToUpdate) {
            task.completed = true;
            task.missed = true;
            await task.save(); // Save the updated task
        }

        console.log("Tasks updated successfully:", tasksToUpdate.length);
    } catch (error) {
        console.error("Error updating tasks:", error);
    }
};


// Function to run on every date change
const runOnDateChange = () => {
    // Set interval to run the checkAndUpdateTasks function every day
    setInterval(checkAndUpdateTasks, 24 * 60 * 60 * 1000); // Every 24 hours
    // setInterval(checkAndUpdateTasks,1000); 
};

// Call runOnDateChange to start running the function on date change

export default runOnDateChange;
