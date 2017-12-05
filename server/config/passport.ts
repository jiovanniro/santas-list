import * as passport from 'passport';
import * as express from 'express';
import * as session from 'express-session';//creates the session
import * as utils from '../utils';

//immediately create a mysql-session to the mysql database
let MySQLStore = require('express-mysql-session')(session);

import {Strategy as LocalStrategy} from 'passport-local'; 
import * as userProc from '../procedures/users.proc';
import {pool} from './db';

export default function configurePassport(app: express.Express) {
    let fam_role: number;
    //Setting up LocalStrategy
    passport.use(new LocalStrategy( {//telling passport to use LocalStrategy for authentication
        usernameField: 'name',   //'name' will be the usernameField
        passwordField: 'password' //'password' will be the passwordField
    },  (name, password, done) => {
        let loginError = "Invalid Login Credentials";
        userProc.read(name).then((user) => { //user is the result of the stored procedure / call to db
            //if no user that matches typed email address
            if (!user) {              
                //Child username
                userProc.readChild(name).then((user) => { //user is the result of the stored procedure / call to db
                    //if no user that matches typed email address
                    if (!user) {
                        return done(null, false); //done is calling the function in users.ctrl
                    }

                    return utils.checkPassword(password, user.password)
                    .then((matches) => {
                        if (matches) {
                            delete user.password; 
                            fam_role = user.fam_role;
                            return done(null, user);
                        } else { 
                            return done(null, false, {message: loginError});
                        }
                    });
                }).catch((err) => { 
                    return done(err); 
                });
            }

            return utils.checkPassword(password, user.password)
            .then((matches) => {
                if (matches) {
                    delete user.password; 
                    fam_role = user.fam_role;
                    return done(null, user);
                } else { 
                    userProc.readChild(name).then((user) => { //user is the result of the stored procedure / call to db
                        //if no user that matches typed email address
                        if (!user) {
                            return done(null, false); //done is calling the function in users.ctrl
                        }
    
                        return utils.checkPassword(password, user.password)
                        .then((matches) => {
                            if (matches) {
                                delete user.password; 
                                fam_role = user.fam_role;
                                return done(null, user);
                            } else { 
                                return done(null, false, {message: loginError});
                            }
                        });
                    }
                )}
            });
        }).catch((err) => { 
            return done(err); 
        });
    }));

    /*Passport can associate a session with a particular user
    to do that it needs to know how to Serialize and Deserialize the user*/

    //Serialized: taking the user object & returning a minimal way to identify the user. i.e., the id
    passport.serializeUser((user: models.IUser, done) => {
        done(null, user.id);
    });

    //Deserialized: take a unique identifier and retrieving the full user object
    //when a cookie is read this happens
    passport.deserializeUser(function (id: string, done) {
        if(fam_role === 1) {
            userProc.read(id).then(function (user: any) {
                done (null, user);
            }, function(err) {
                done(err);
            });
        } else if (fam_role === 2) {
            userProc.readChild(id).then(function (user: any) {
                done (null, user);
            }, function(err) {
                done(err);
            });
        } else {
            console.log('Error in deserialize');
        }
    });

    //Configuring MySQLStore
    let sessionStore = new MySQLStore({
        createDatabaseTable: true //create a table in the db to store the sessions so we dont have to
    }, pool);//pool -- tells MySQLStore how to connect

    //Enabling Sessions
    app.use(session({
        secret: 'random string!', //secret requires a random string (random string generator)
        store: sessionStore, //if not defined, it will use RAM
        resave: false, //keep our overhead low so it doesn't save when it doesn't need to
        saveUninitialized: false //so addl savings dont need to be saved
    }));

    //Initialize Passport - Order matters
    app.use(passport.initialize());
    app.use(passport.session());
}