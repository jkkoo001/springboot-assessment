
const createHTMLList = (index, title, description, targetDate) =>
`
<div class="col-lg-4">
    <div class="card mt-5" style="width: 18rem; ">
        <div class="card-body">
            <h5 class="card-title">TODO: ${title}</h5>
            <p class="card-text">Description: ${description}</p>
            <p class="card-text">Target Date: ${targetDate}</p>
        </div>
    </div>
</div>

`;



class TodoController 
{
    constructor()
    {
        this._items = [];       //create an array to store the details of todo items
    }

    //method to add the items into the array
    addItem(title, description, targetDate)
    {
        //fetch POST HTTP method to send the data to the backend via the API
        var todoController = this;
                const formData = new FormData();
                formData.append('title', title);
                formData.append('description', description);
                formData.append('targetDate', targetDate);


                fetch('http://localhost:8080/item/add', {
                     method: 'POST',
                     body: formData
                     })
                     .then(function(response) {
                         console.log(response.status); // Will show you the status
                         if (response.ok) {
                             alert("Successfully Added TODO!")
                         }
                     })
                     .catch((error) => {
                         console.error('Error:', error);
                         alert("Error adding TODO!")
                     });

    }


    displayItem()
    {
        //fetch the items from the database using the API
        var todoController = this;
        todoController._items = [];

        //fetch data from database using the REST API endpoint from Spring Boot
        fetch('http://localhost:8080/item/all')
                            .then((resp) => resp.json())
                            .then(function(data) {
                                console.log("2. receive data")
                                console.log(data);
                                data.forEach(function (item, index) {

                                    const itemObj = {
                                        id: item.id,
                                        title: item.title,
                                        description: item.description,
                                        targetDate: item.targetDate,
                                   };
                                    todoController._items.push(itemObj);
                              });

                              todoController.renderTodoPage();

                            })
                            .catch(function(error) {
                                console.log(error);
                            });

    }


    renderTodoPage()
    {
        var todoHTMLList = [];
        
        for (var i=0; i<this._items.length; i++)
        {
            const item = this._items[i];            //assign the individual item to the variable

            const todoHTML = createHTMLList(i, item.title, item.description, item.targetDate);

            todoHTMLList.push(todoHTML);
        }

        //Join all the elements/items in my todoHTMLList array into one string, and separate by a break
        const todoHTML = todoHTMLList.join('\n');
        document.querySelector("#row").innerHTML = todoHTML;

    }


}   //End of todoController class
