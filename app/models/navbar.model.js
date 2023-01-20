const mongoose = require('mongoose')
const NavbarSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{

        type:String, required:true ,trim:true
    },
    // slug:{

    //     type:String, required:true ,unique:true
    // },
    // parentId:{

    //     type:String 
    // },

},{ timestamps: true});

module.exports = mongoose.model('Navbar',NavbarSchema)