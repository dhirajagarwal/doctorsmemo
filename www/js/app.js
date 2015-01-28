// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('doctorApp', ['ionic', 'doctorApp.services', 'doctorApp.controllers'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            ionic.Platform.isFullScreen = false;
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('doctors', {
                url: "/",
                templateUrl: "templates/doctors.html",
                controller: 'DoctorCtrl'
            })

            .state('doctor-details', {
                url: '/doctor-patients/:doctorIndex',
                templateUrl: 'templates/doctor-patients.html',
                controller: 'DoctorDetailsCtrl'
            })

            .state('patient-details', {
                url: '/patientDetails/:patientIndex/:doctorInd',
                templateUrl: 'templates/patient-details.html',
                controller: 'PatientDetailsCtrl'
            })

            .state('add-patient', {
                url: '/addPatient/:doctorInd',
                templateUrl: 'templates/addPatient.html',
                controller: 'AddPatientCtrl'
            })

            .state('add-doctor', {
                url: '/doctorAdd',
                templateUrl: 'templates/addDoctor.html',
                controller: 'AddDoctorCtrl'
            })

            .state('add-txn', {
                url: '/txnAdd/:patientIndex/:doctorInd',
                templateUrl: 'templates/addTxn.html',
                controller: 'AddTxnCtrl'
            })


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');

    });
