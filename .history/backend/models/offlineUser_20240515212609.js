const fs = require('fs');

// Hardcoded user data
let usersData = [
    { id: 1, username: 'Shaaf Salman', email: "ishaafsalman@gmail.com", password: "1122" },
    { id: 2, username: 'admin', email: "admin", password: "1122" },
];

// Function to save users data to JSON file
const saveUsersData = () => {
    fs.writeFileSync('users.json', JSON.stringify(usersData, null, 2));
};

// Function to get all users
const getAllUsers = () => {
    return usersData;
};

// Function to add a new user
const addUser = (user) => 
    
    const existingUser = usersData.find(user => user.email === user.email);
    if (existingUser) {
        return false;
    }{

    user.id = usersData.length + 1; 
    usersData.push(user);
    saveUsersData();
};

// Function to update a user
const updateUser = (id, updatedUser) => {
    const index = usersData.findIndex(user => user.id === id);
    if (index !== -1) {
        usersData[index] = { ...usersData[index], ...updatedUser };
        saveUsersData();
        return true;
    }
    return false;
};

// Function to delete a user
const deleteUser = (id) => {
    usersData = usersData.filter(user => user.id !== id);
    saveUsersData();
};

// Function to search users by username
const searchUsers = (query) => {
    return usersData.filter(user => user.username.toLowerCase().includes(query.toLowerCase()));
};

module.exports = {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
    searchUsers
};
