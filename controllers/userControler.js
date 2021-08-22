const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const UserDetail = require('../models/user-detail');
const Registration = require('../models/contestRegisration');
const Payout = require('../models/payout');
const ContestHistory = require('../models/contestHistory');
const PracticeHistory = require('../models/practiceHistory');
const Contest = require('../models/contest');



exports.getUserSignup = (req, res, next) => {
  
    res.render('auth/signup', {    
      isAuthenticated: false,
      errorMessage: [],
      errorState:[]
         
    });
  };

exports.postUserSignup = (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const gender = req.body.gender;
    const dateofbirth = req.body.dateofbirth;
    const studentType = req.body.studentType;
    const sscroll = req.body.sscroll;
    const sscregi = req.body.sscregirstration;
    const sscpass = req.body.sscyear;
    const division = req.body.division;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const password = req.body.password;
    const roll = sscroll+sscregi;


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      
      return res.status(400).render('auth/signup', {
        errorMessage: errors.array()[0].msg,
        errorState:errors.array()
        
      });
    }


      bcrypt
        .hash(password, 12)
        .then(hashedPassword => {

          User.create({
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            dateofBirth: dateofbirth,
            studentType: studentType,
            sscRollNo: sscroll,
            sscRegiNo: sscregi,
            sscPassingYear: sscpass,
            division: division,
            phoneNumber: phoneNumber,
            mail: email,
            roll:roll,
            password: hashedPassword,

          })
          .then(created =>{
            if(created){
              res.redirect('/login?key=success');
            }else{
              res.redirect('/signup');
            }
           
          });
        
        }).catch(err=>{
          console.log(err);
        })

      
        
   
  
   
}

exports.getUserLogin = (req, res, next) => {

  const Message = req.query.key;
  
  if(Message){
  res.render('auth/login', {
      
          Message: 'Successfuly Signed Up!',
          errorMessage: []
   });
        }else{
          res.render('auth/login', {
            Message: [],
            errorMessage: []
        });
        }
        

  
};

   


  exports.postUserLogin = (req, res, next) => {
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    const errors = validationResult(req)
  
    if (!errors.isEmpty()) {
      
      return res.status(400).render('auth/login', {
        errorMessage: errors.array()[0].msg,
        Message: []
        
      });
    }
    

    User.findOne({where:{ phoneNumber: phoneNumber}})
    .then(user => {
      if (!user) {
        return res.status(400).render('auth/login', {
          errorMessage: 'Phone number or password is not valid!',
          Message: []
          
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              res.redirect('/profile');
            });
          }else{
            return res.status(400).render('auth/login', {
              errorMessage: 'Phone number or password is not valid!',
              Message: []
              
            });
          }
          
          
        })
        .catch(err => {
       
          return res.status(400).render('auth/login', {
            errorMessage: 'Phone number or password is not valid!',
            Message: []
            
          });
        });
    })




   
      
     
  };


  exports.getCofirmIdentity = (req, res, next) => {
  
    res.render('auth/confirm-identity', {    
      errorMessage: [],
      
         
    });
  };

  
  exports.postCofirmIdentity = (req, res, next) => {

    const phoneNumber = req.body.phoneNumber;
    const roll = req.body.sscroll;
    const regi = req.body.sscregirstration;

    User.findOne({
      where:{ 
        phoneNumber: phoneNumber.trim(),
        sscRollNo: roll.trim(),
        sscRegiNo: regi.trim()
      
      }}).then(found=>{
         if(found){
            

           res.render('auth/user-password-reset',{
            age: found.id,// to protect hacking 

          })
           
         }else{
          res.render('auth/confirm-identity',{
          
            errorMessage: 'User not found!'
      
          })
         }
      })
    
  
    
  };

  exports.postResetPasswor = (req, res, next) => {

    const sid = req.body.age;
    const pass = req.body.password;
    const cpass = req.body.confirmPassword;

    if(pass.length <6 ){
      res.render('auth/confirm-identity', {
  
        errorMessage: 'Password length atleast 6!',

    });
    }else if(pass === cpass){

      bcrypt
        .hash(pass, 12)
        .then(hashedPassword => {

          User.findOne({where:{id:sid}})
            .then(user=>{

              user.password = hashedPassword;

              return user.save();

            }).then(save=>{
              res.redirect('/login');
            })
        
        }).catch(err=>{
          console.log(err);
        })

      

    }else{
      res.render('auth/confirm-identity', {
  
        errorMessage: 'Password does not match!',

    });
    }
  
  
  };
exports.getUserProfile = (req, res, next) => {
  User.findByPk(req.session.user.id)
  .then(profile=>{
    UserDetail.findOne({where:{userId: profile.id}})
      .then(userDetail=>{

        res.render('user/profile',{
          user: profile,
          userDetail: userDetail
    
        })

      })

    
  })

};
exports.getContestHistory = async (req, res, next) => {

  try {
    const userId = req.session.user.id;

    const contestHistory = await ContestHistory.findAll({
      order: [
        
        ['id', 'DESC'],
      ],where:{userId:userId}});

      const attendContestIds = contestHistory.map(attendContestId=>{
        return attendContestId.contestId;
      });

    const completedContest = await Contest.findAll({
      order: [
        
        ['id', 'DESC'],
      ], where:{id:attendContestIds}});

    const completedContestNames = completedContest.map(completedContestName=>{
      return completedContestName.contestName;
    });
        


    const newRegistration = await Registration.findAll({
      order: [
        
        ['id', 'DESC'],
      ], 
      where:{userId:userId}});

    const constestIds = newRegistration.map(constest=>{
      return constest.contestId;
    }) 
    

    const RegisteredContest = await Contest.findAll({
      order: [
        ['id', 'DESC'],
      ], where:{id:constestIds}});

      const RegisteredContestName = RegisteredContest.map(registeredConstest=>{
        return registeredConstest.contestName;
      }) 
     

      var totalEarnedMoney = 0;
      var PrizContestName = [];

      const Money = await Payout.findAll({
        order: [
          ['id', 'DESC'],
        ],
        where:{userId:userId,amountReceived:true}});
      for(let i=0; i < Money.length;i++){

        const name = await Contest.findOne({where:{id:Money[i].contestId}});        
        PrizContestName.push(name.contestName);
        totalEarnedMoney+= parseInt(Money[i].prizeAmount); 
      }
     
      const practice = await PracticeHistory.findAll({
        order: [
          ['id', 'DESC'],
        ],
        where:{userId:userId}});
     
    

    res.render('user/contest-history',{
      contestHistory: contestHistory,
      newRegistration: newRegistration,
      RegisteredContestName: RegisteredContestName,
      completedContestNames: completedContestNames,
      totalEarnedMoney: totalEarnedMoney,
      PrizContestName: PrizContestName,
      Money: Money,
      practice: practice

    })


  } catch (error) {
    
  }


};
exports.getEditProfile = async (req, res, next) => {

  
  try {
    const userId = req.session.user.id;
    const userdetail = await UserDetail.findOne({where:{userId:userId}})
    const user = await User.findOne({where:{id:userId}});

    res.render('user/edit-profile',{
      userDetail:userdetail,
      user:user,
    });



    
  } catch (error) {
    
  }
  
  

 
  

};
exports.postEditProfile = async (req, res, next) => {


  try {

  const payoutMethod = req.body.payoutMethod;
  const payoutNumber = req.body.payoutNumber;
  const presentAddress = req.body.presentAddress;
  const courierAddress = req.body.courierAddress;
  const tshirtsize = req.body.tshirtsize;
  const userId = req.session.user.id;


  const information_exist = await UserDetail.findOne({where:{userId:userId}});
  
  if(information_exist){
    UserDetail.findOne({where:{userId:userId}})
     .then(gotDetail=>{
       gotDetail.payoutMethod = payoutMethod;
       gotDetail.payoutNumber = payoutNumber;
       gotDetail.presentAddress = presentAddress;
       gotDetail.courierAddress = courierAddress;
       gotDetail.tshirtSize = tshirtsize;
       gotDetail.userId = userId;

       return gotDetail.save();

     }).then(save =>{
       res.redirect('/profile');
     }).catch(e=>{
       console.log(e);
     })
  }else{
    UserDetail.create({
      payoutMethod: payoutMethod,
      payoutNumber: payoutNumber,	
      presentAddress: presentAddress,	
      courierAddress: courierAddress,	
      tshirtSize: tshirtsize,	
      userId: userId,
      currentPoint: 0,
      
    })
     .then(created=>{
       if(created){
         res.redirect('/profile');
       }else{
        res.redirect('/edit-profile');
       }
     })
     .catch(e=>{
       console.log(e);
     })
  }   
  } catch (error) {
    console.log(error);
  }
};






  exports.postUserLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/');
    });
  };
  


