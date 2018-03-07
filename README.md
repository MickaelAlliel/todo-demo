# How to use ?

## Running Locally

### With Docker

- Insert your agent token in the docker-compose.yml
- Run `docker-compose up`

### Without Docker

- Insert your agent token in the Makefile
- Run `make -j run-prod`

## Tutorial

- After running the server go to [https://app.rookout.com/](https://app.rookout.com/)
    - If you are not logged in yet, log in
- Add the source code according to the instructions using the left pane **Source View**
- Open the file `/src/handlers/index.js`
- Add a rule to line 32 by clicking next the the line number in the file viewer
- Looking at the right-hand pane **Rules**, you should see the rule you added, on what line you added it and it should be GREEN, meaning everything is communicating correctly.
    - If this is not the case, [click here](#rules-common-issues) to see how to fix that
- Refresh, or go the the app page [http://localhost:4000/](http://localhost:4000/) in order to trigger the rule
- Check the bottom pane **Messages** and you should now see the dumped frame you just added, and it was triggered by the handler of the web page when you accessed it

__The integration is working and we can know debug some things together to learn how to use Rookout__

Go through the [bug list](#bug-list) below and follow instructions to see some basic use cases.




## Bug List

- __Clear Completed hangs, does not do what is intended - nothing is cleared.__
    - **Reproduce:** Add a few tasks, check one or more as completed using the checkbox on the left of the task and click the `Clear completed` button on the bottom right corner.
    - **Debug:**  
        1. In the Rookout app, open the file `/src/utils/store.js`
        2. Using the **Rules** pane on the right, select the *Rule Type* "Dump Frame"
        3. Add this rule to line 143 and try again to click on `Clear completed` to see the message that pops in the Rookout app
        4. We can now see the whole stacktrace leading to this point and we pinpoint the error to this message :
            - `'todos' is not defined` - missing `this` keyword 
        5. We can now know what is not working on the server-side and fix it.

- __Duplicate Todo adds an invalid todo instead of an exact copy of an existing one.__
    - **Reproduce:** Add a task and when hovering on the text, on the right side you have the **&** symbol. Click on it to duplicate the task.
    - **Debug:**
        1. In the Rookout app, open the file `/src/handlers/todo.js`
        2. Using the **Rules** pane on the right, select the *Rule Type* "Log"
        3. Add this rule to line 55
        4. Before triggering the rule, let's edit it so it returns what we want
        5. In the **Rules** pane on the right, click the *Edit Rule* (pen) icon next to the rule you just added. It will open up the Rule configuration as a JSON file
        6. On line 31 we have the "format" property, we can add after `LOG:` the variable we want to get back from the Rook. Add `{store.rookout.frame.todo}`
        - /src/handlers/todo.js - Lines 55-56
        - `newTodo.title` and `newTodo.completed` properties are being filled with the wrong information

- __Hebrew is not being accepted as part of the title when Adding or Updating a Todo.__
    - /src/handlers/todo.js - Lines 14 and 30
    - Helper function `cleanString(title)` is trimming Hebrew characters.


## Rules Common Issues