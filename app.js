const express = require('express'); // Import the Express framework
const app = express(); // Create an instance of Express

app.use(express.json()); // Middleware to parse JSON bodies

const PORT = 3000; // Setting the port number

let items = []; // Initialize an in-memory array to store data

// Create Operation: POST route to add a new item
app.post('/items', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
    }

    const item = {
        id: items.length + 1, // Generate a simple numeric ID
        name,
        description
    };
    items.push(item); // Add the new item to the array
    res.status(201).json(item); // Send the new item with a 201 status code indicating resource creation
});

// Read Operation: GET route to list all items
app.get('/items', (req, res) => {
    res.status(200).json(items); // Send all items with a 200 status code indicating success
});

// Read Operation: GET route to retrieve a single item by ID
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id)); // Find the item with the matching ID
    if (!item) {
        res.status(404).json({ error: 'Item not found' }); // Send a 404 status code with 'Item not found' message
    } else {
        res.status(200).json(item); // Send the item with a 200 status code indicating success
    }
});

// Update Operation: PUT route to modify an existing item
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id)); // Find the item with the matching ID
    if (!item) {
        res.status(404).json({ error: 'Item not found' }); // Send a 404 status code with 'Item not found' message
    } else {
        const { name, description } = req.body;
        item.name = name || item.name; // Update the name if provided, otherwise keep the current name
        item.description = description || item.description; // Update the description if provided, otherwise keep the current description
        res.status(200).json(item); // Send the updated item with a 200 status code indicating success
    }
});

// Delete Operation: DELETE route to remove an item by ID
app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id)); // Find the index of the item with the matching ID
    if (index === -1) {
        res.status(404).json({ error: 'Item not found' }); // Send a 404 status code with 'Item not found' message
    } else {
        items.splice(index, 1); // Remove 1 item at the found index
        res.status(204).send(); // Send a 204 status code indicating no content (successful deletion)
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Start the server and log the running status
});
