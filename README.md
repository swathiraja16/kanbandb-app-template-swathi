# KanbanDB App

![Kanban Mockup](public/kanban-example@2x.png)

## Pre-interview Assignment Instructions

### Greetings!

Hello potential future team member! :D

We're looking forward to having some great days working on creating new projects, debugging issues, planning applications, solving problems, and all of the other fun things we do here in - together with you!

But before that, let's see if you can demonstrate some stock skills you'll need to be successful in this position :) we will discuss this code with you during the hiring process, and it will be tremendously helpful for us in evaluating your skills.

Note: if anything isn't specifically called out here, feel free to be as inventive as you like - no pressure to adhere to any strict rules. Our primary goal is to know that you generally understand web application principles.

Have fun!


### Task

Create a Kanban Board application in React - using this template, which is based on `create-react-app` default template - that meets the below criteria.

You can find instructions and source code for `KanbanDB` [here on Github](https://github.com/netpoetica/KanbanDB#kanbandb). This is a "fake" database that uses local storage to emulate something like an [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping), which you can use to perform CRUD operations on Kanban tasks.

1. Fork this repo on Github
1. There should be three columns with headers: Todo, In Progress, and Done
1. Use KanbanDB to perform all "database" operations (KanbanDB is a fake database that uses localStorage, but emulates asynchronocity of a real client, like Firebase)
1. Cards should have a title/name, a description, and a status
1. The user should be able to change the status of a card between `TODO`, `IN_PROGRESS`, and `DONE`, and changing the status should cause them to render in their respective columns (i.e. all cards with `TODO` status should be in column with Todo header)
1. There should be an Add button that lets you add a new card to the board. Whichever status is chosen, it should show up on that board.
1. Each card should have a delete button which deletes just that card

BONUS: A card can be edited and saved (`.updateCard()`).

Note: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
