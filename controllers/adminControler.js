const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');
const Moderator = require('../models/moderator');
const Accountant = require('../models/accountant');
const Prize = require('../models/prize-amount');
const ContestLevel = require('../models/contestentLevel');




exports.getAdminLogin = (req, res, next) => {

    res.render('admin/admin-login',{

    })
 
};

exports.postAdminLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  
  Admin.findOne({where:{ username: username}})
  .then(admin => {
    if (!admin) {
      return res.redirect('/admin/admin-login');
    }
    bcrypt
      .compare(password, admin.password)
      .then(doMatch => {
        if (doMatch) {
          req.session.isAdminLoggedIn = true;
          req.session.admin = admin;
          return req.session.save(err => {
            console.log(err);
            res.redirect('/admin/admin-home');
          });
        }
        
        res.redirect('/admin/admin-login');
      })
      .catch(err => {
        console.log(err);
        res.redirect('/admin/admin-login');
      });
  })

 
   
};



exports.getAdminHome = (req, res, next) => {

  res.render('admin/admin-home',{

  

  })


};

exports.getCreateModerator = (req, res, next) => {

  res.render('admin/create-moderator',{});
};

exports.postCreateModerator = (req, res, next) => {

  const username = req.body.username;
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  const adminId = req.session.admin.id;


  Moderator.findOne({ where: {  phoneNumber: phoneNumber  }  })
  .then(moderatorDoc => {
    if (moderatorDoc) {
      return res.redirect('/admin/create-moderator');
    }else{
    return bcrypt
      .hash(password, 12)
      .then(hashedPassword => {

        Moderator.create({
          username:	username,
          phoneNumber: phoneNumber,
          password:	hashedPassword,
          adminId: adminId

        })
        .then(created =>{
          if(created){
            res.redirect('/admin/admin-home');
          }else{
            res.redirect('/admin/create-moderator');
          }
         
        });
      
      })

    }
      
  })
  .catch(err => {
    console.log(err);
    res.redirect('/admin/create-moderator');
  });
};

exports.getCreateAccountant = (req, res, next) => {

  res.render('admin/create-accountant',{});
};

exports.postCreateAccountant = (req, res, next) => {

  const username = req.body.username;
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  const adminId = req.session.admin.id;


  Accountant.findOne({ where: {  phoneNumber: phoneNumber  }  })
  .then(accountantDoc => {
    if (accountantDoc) {
      return res.redirect('/admin/create-moderator');
    }else{
    return bcrypt
      .hash(password, 12)
      .then(hashedPassword => {

        Accountant.create({
          		
          userName:	username,
          phoneNumber: phoneNumber,
          password:	hashedPassword,
          adminId: adminId

        })
        .then(created =>{
          if(created){
            res.redirect('/admin/admin-home');
          }else{
            res.redirect('/admin/create-accountant');
          }
         
        });
      
      })

    }
      
  })
  .catch(err => {
    console.log(err);
    res.redirect('/admin/create-accountant');
  });
};




exports.getAddContestPayment = (req, res, next) => {

  res.render('admin/add-contest-payment',{

  

  })


};

exports.postAddContestPayment = (req, res, next) => {

  const position = req.body.position;
  const from10to1k = req.body.from10to1k;
  const from1kto4k = req.body.from1kto4k;
  const from5kto9k = req.body.from5kto9k;
  const from10kto20k = req.body.from10kto20k;
  const from20k = req.body.from20k;

  Prize.create({


    position: position,	
    from10to1k: from10to1k,	
    from1kto4k:	from1kto4k,
    from5kto9k:	from5kto9k,
    from10kto20k:	from10kto20k,
    morethan20k: from20k,
  }).then(created=>{
    if(created){
      res.redirect('/admin/add-contest-payment');
    }
  })

  
};


exports.getAddContestLevel = (req, res, next) => {

  res.render('admin/add-contest-level',{

  

  })


};

exports.postAddContestLevel = (req, res, next) => {

  res.render('admin/add-contest-level',{

  

  })


};

exports.getViewContestPayment = (req, res, next) => {

  Prize.findAll()
    .then(allPrize=>{
      res.render('admin/view-contest-payment',{
        prize: allPrize,
  

      })
    })

   
 
  
};























exports.postAdminLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
        res.redirect('/admin/admin-login');
        
  });
};



