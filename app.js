const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const csrf = require('csurf');
const Compression = require('compression');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const Admin = require('./models/admin');
const Moderator = require('./models/moderator');
const User = require('./models/user');
const UserDetail = require('./models/user-detail');
const Accountant = require('./models/accountant');
const Account = require('./models/account');

const Subjects = require('./models/subjects');
const HscQuestionBank = require('./models/hscMcqQuestionBank');
const BcsQuestionBank = require('./models/bcsMcqQuestionBank');
const BankJobQuestionBank = require('./models/bankJobMcqQuestionBank');
const HscMcqPractice = require('./models/hscMCQpractice');
const BcsMcqPractice = require('./models/bcsMCQpractice');
const BankJobMcqPractice = require('./models/bankJobMCQpractice');


const Contest = require('./models/contest');
const ContestType = require('./models/contestType');
const QuestionSet = require('./models/questionset');

const contestRegistration = require('./models/contestRegisration');
const Rank = require('./models/rank');
const userContestHistory = require('./models/contestHistory');
const PracticeHistory = require('./models/practiceHistory');
const Prize = require('./models/prize-amount');
const UserPayout = require('./models/payout');
const ContestentLevel = require('./models/contestentLevel');

const interViewQuestion = require('./models/interviewQuestion');
const interViewSubject = require('./models/interviewSubject');

const HscQuestion = require('./models/hscQestion');
const HscModelQuestion = require('./models/hscmodelquestion');
const HscModelQuestionNo = require('./models/hscMQans');

const BlogPost = require('./models/blog-post');
const BlogComment = require('./models/blog-comments')

const GeneralUse = require('./models/general-use');

const app = express();

const store = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 1 * 60 * 60 * 1000,
  expiration: 2 * 60 * 60 * 1000,
   
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/auth/admin-routes');
const moderatorRoutes = require('./routes/auth/moderator-routes');
const accountantRoutes = require('./routes/auth/accountant-routes');
const userRoutes = require('./routes/auth/user-routes');

const homeRoutes = require('./routes/home');

const ict = require('./routes/hsc/ict-routes');

const hsc_sug = require('./routes/hsc/hsc-suggestion-routes');

const Online_Earning_routes = require('./routes/onlineEarn/online-earnings-routes');

const programerRoutes = require('./routes/programmersHelp/programmers-help');

const c_tutorial = require('./routes/tutorial/c-tutorial-routes');
const java_programming = require('./routes/tutorial/java');
const python_programming = require('./routes/tutorial/python');
const ielts = require('./routes/tutorial/ielts');

const interviewroutes = require('./routes/interviews/interviews-question');

const quizRoutes = require('./routes/quiz/quiz-routes');

const generalUse = require('./routes/generalUse/general-routes');




app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(Compression());



app.use(
  session({
    secret: 'Owner Of TutorialforBeginner.com',
    resave: true,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findByPk(req.session.user.id)
    .then(user => {
      req.user = user;
      next();
    }) 
});

app.use((req, res, next) => {
  if (!req.session.moderator) {
    return next();
  }
  

  Moderator.findByPk(req.session.moderator.id)
    .then(moderator => {
      req.moderator = moderator;
      next();
    });
    
});

app.use((req, res, next) => {
  if (!req.session.admin) {
    return next();
  }
  

  Admin.findByPk(req.session.admin.id)
    .then(admin => {
      req.admin = admin;
      next();
    });
    
});

app.use((req, res, next) => {
  if (!req.session.accountant) {
    return next();
  }
  

  Accountant.findByPk(req.session.accountant.id)
    .then(accountant => {
      req.accountant = accountant;
      next();
    });
    
});


app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.isModeratorAuthenticated = req.session.isModeratorLoggedIn;
  res.locals.isAdminAuthenticated = req.session.isAdminLoggedIn; 
  res.locals.isAccountantAuthenticated = req.session.isAccountantLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});




app.use('/admin',adminRoutes);
app.use('/moderator',moderatorRoutes);
app.use('/accountant',accountantRoutes);
app.use(userRoutes);
app.use(homeRoutes);
app.use(ict);
app.use(hsc_sug);
app.use(Online_Earning_routes);
app.use(programerRoutes);
app.use(c_tutorial);
app.use(java_programming);
app.use(python_programming);
app.use(ielts);
app.use(interviewroutes);
app.use(quizRoutes);
app.use(generalUse);


app.use(errorController.get404);
app.use(errorController.getmoderator404);


Admin.hasMany(Moderator);
Moderator.belongsTo(Admin,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE'  });

Admin.hasMany(Accountant);
Accountant.belongsTo(Admin,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

Accountant.hasMany(Account);
Account.belongsTo(Accountant,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

Moderator.hasMany(Contest);
Contest.belongsTo(Moderator,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

ContestType.hasMany(Contest);
Contest.belongsTo(ContestType,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

Subjects.hasMany(HscQuestionBank);
HscQuestionBank.belongsTo(Subjects,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

Subjects.hasMany(BcsQuestionBank);
BcsQuestionBank.belongsTo(Subjects,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

Subjects.hasMany(BankJobQuestionBank);
BankJobQuestionBank.belongsTo(Subjects,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

Subjects.hasMany(HscMcqPractice);
HscMcqPractice.belongsTo(Subjects,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

Subjects.hasMany(BcsMcqPractice);
BcsMcqPractice.belongsTo(Subjects,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

Subjects.hasMany(BankJobMcqPractice);
BankJobMcqPractice.belongsTo(Subjects,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

Contest.hasOne(QuestionSet);
QuestionSet.belongsTo(Contest,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

User.hasOne(UserDetail);
UserDetail.belongsTo(User,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

User.hasMany(Rank);
Rank.belongsTo(User,{ constraints: true, onDelete: 'CASCADE' ,onUpdate: 'CASCADE'});

Contest.hasMany(Rank);
Rank.belongsTo(Contest,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

User.hasMany(userContestHistory);
userContestHistory.belongsTo(User,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

User.hasMany(PracticeHistory);
PracticeHistory.belongsTo(User,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

Contest.hasMany(userContestHistory);
userContestHistory.belongsTo(Contest,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

User.hasMany(contestRegistration);
contestRegistration.belongsTo(User,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

Contest.hasMany(contestRegistration);
contestRegistration.belongsTo(Contest,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

User.hasMany(UserPayout);
UserPayout.belongsTo(User,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

Accountant.hasMany(UserPayout);
UserPayout.belongsTo(Accountant,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

Contest.hasMany(UserPayout);
UserPayout.belongsTo(Contest,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

interViewSubject.hasMany(interViewQuestion);
interViewQuestion.belongsTo(interViewSubject,{ constraints: true, onDelete: 'CASCADE' });

Subjects.hasMany(HscQuestion);
HscQuestion.belongsTo(Subjects,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

Subjects.hasMany(HscModelQuestion);
HscModelQuestion.belongsTo(Subjects,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

HscModelQuestion.hasMany(HscModelQuestionNo);
HscModelQuestionNo.belongsTo(HscModelQuestion,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE' });

BlogPost.hasMany(BlogComment);
BlogComment.belongsTo(BlogPost,{ constraints: true, onDelete: 'CASCADE',onUpdate: 'CASCADE'});





sequelize
  .sync({force:true})
  .then(user => {
    app.listen(8080);
  })
  .catch(err => {
    console.log(err);
  });
 
 