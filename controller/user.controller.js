const db = require('../db');
const shortid = require('shortid')


module.exports.index = (req, res)=> res.render('users/index',{
    users: db.get('users').value()
});

module.exports.search =(req, res)=>{
    var q = req.query.q;
    // var matchedUsers = users.filter((user)=>{
    //     return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    // })
    var matchedUsers= db.get('users').value().filter((user)=>{
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index',{
        users: matchedUsers,
        body: q
    })
    
};

module.exports.create = (req, res)=>{
    res.render('users/create')
};
module.exports.postCreate =(req, res)=>{
    var errors =[];
    if(!req.body.name){
        errors.push("Missing name fleld")
    }
    if(!req.body.phone){
        errors.push("Missing phone number fleld");
    }
    if(errors.length){
        res.render('users/create',{
            errors: errors,
            values: req.body
        });
        return;
    }
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/')
}
module.exports.get = (req, res)=>{
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    res.render('users/view',{
        user: user
    })
}
module.exports.delete =(req, res)=>{
    var userId = req.params.id; 
    db.get('users').remove({id:userId}).write();
    res.redirect('/users');
}