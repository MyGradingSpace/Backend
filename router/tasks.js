Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@Gincral 
Gincral
/
Workout-Record
1
1
0
Code
Issues
Pull requests
1
Actions
Projects
1
Wiki
Security
6
Insights
Settings
Workout-Record/backend/router/tasks.js /
@Gincral
Gincral login
Latest commit 5d7b1a7 on Mar 20
 History
 1 contributor
We found potential security vulnerabilities in your dependencies.
Only the owner of this repository can see this message.

62 lines (58 sloc)  1.54 KB
  
Code navigation is available!
Navigate your code with ease. Click on function and method calls to jump to their definitions or references in the same repository. Learn more

const task = require("../model/task");

async function getTasks(req, res, next) {
    console.log("/get Tasks");
    const params = req.query;
    try {
        let getTasks = await task.find({ user_id: params._id });
        res.json(getTasks);
    } catch (err) {
        res.json({ message: err });
    }
}

async function createTasks(req, res, next) {
    console.log("/post Tasks");
    const params = req.query;
    const body = req.body;
    if (!params._id) {
        const newTask = new task({
            name: body.name,
            description: body.description,
            groups: body.groups,
            user_id: body.user_id,
            days: body.days,
        });
        try {
            const task = await newTask.save();
            res.json(task);
        } catch (err) {
            res.json({ message: err });
        }
    }else{
        try {
            const updatedTask = await task.updateOne(
                { _id: params._id },
                { name: body.name, description: body.description, groups: body.groups, days: body.days }
            );
            res.json(updatedTask);
        } catch (err) {
            res.json({ message: err });
        }
    }
}

async function deleteTasks(req, res, next) {
    console.log("/delete Tasks");
    const params = req.query;
    try {
        const selectTask = await task.deleteOne({
            _id: params._id
        });
        res.json(selectTask);
    } catch (err) {
        res.json({ message: err });
    }
}

module.exports = {
    getTasks,
    createTasks,
    deleteTasks,
};