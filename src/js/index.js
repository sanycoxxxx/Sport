'use strict';





let user = {
    name: 'Pitter',
    age: 24,
    say: function() {
        console.log(`Hello ${user.name}, ${user.age} years old`)
    }
};

user.say();

export default user;