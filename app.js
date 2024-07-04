const express = require('express'); // Import express framework
const app = express(); // Create instance of express

app.use(express.json()); // Middleware to parse JSON bodies

const PORT = 3000;

let items = []; // Initialize an in-memory array to store data

// Create operation: POST route to add a new item
app.post('/items', (req, res) => {
    const item = {
        id: items.length + 1, // items.length gives the number of items +1 to make it unique
        name: req.body.name, // Use the name from the request body
        description: req.body.description // Use the description from the request body
    };
    items.push(item); // Add the new item to the array
    res.status(201).json(item); // Send the new item with a 201 status code indicating its creation
});

// Read operation: GET route to list all items
app.get('/items', (req, res) => {
    res.status(200).json(items); // Send all items with a 200 status code indicating success
});

// Read operation: GET route to retrieve a single item by ID
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id)); // Find the item with the matching ID
    if (!item) {
        res.status(404).send('Item not found'); // Send a 404 status code with 'Item not found' message
    } else {
        res.status(200).json(item); // Send the item with a 200 status code indicating success
    }
});

// Update operation: PUT route to modify an existing item
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id)); // Find the item with the matching ID
    if (!item) {
        res.status(404).send('Item not found'); // Send a 404 status code with 'Item not found' message
    } else {
        item.name = req.body.name || item.name; // Update the name if provided, otherwise keep the current name
        item.description = req.body.description || item.description; // Update the description if provided, otherwise keep the current description
        res.status(200).json(item); // Send the updated item with a 200 status code indicating success
    }
});

// Delete operation: DELETE route to remove an item by ID
app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id)); // Find the index of the item with the matching ID
    if (index === -1) { // If item is not found (index is -1)
        res.status(404).send('Item not found'); // Send a 404 status code with 'Item not found' message
    } else {
        items.splice(index, 1); // Remove 1 item at the found index
        res.status(204).send(); // Send a 204 status code indicating no content (successful deletion)
    }
});

// Error handling middleware for JSON errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ status: 400, message: 'Bad JSON' }); // Handle the error here
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Start the server and log the running status
});
