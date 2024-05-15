const fs = require('fs');

// Hardcoded user data
let usersData = [
    { id: 1, Username: 'Shaaf Salman', email: "ishaafsalman@gmail.com", password: "1122" },
    { id: 1, Username: 'admin', email: "admin", password: "1122" },
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
const addUser = (user) => {
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
    saveusersData();
};

// Function to search users by name
const searchUsers = (query) => {
    return usersData.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
};

module.exports = {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
    searchUsers
};
