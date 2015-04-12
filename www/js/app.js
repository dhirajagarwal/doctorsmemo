// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('doctorApp', ['ionic', 'doctorApp.services', 'doctorApp.controllers', 'firebase'])

    .run(function ($ionicPlatform, $state, $ionicHistory) {
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
        });

        $ionicPlatform.registerBackButtonAction(function () {
            if ($state.is('login') || $state.is('app.doctors')) {
                ionic.Platform.exitApp();
                // or do nothing
            }
            else if ($state.is('app.report')){
                $state.go('app.doctors');
            }
            else {
                $ionicHistory.goBack();
            }
        }, 100);
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive

            .state('login', {
                url: "/login",
                cache: false,
                templateUrl: "templates/login.html",
                controller: 'LoginCtrl'
            })

            .state('app', {
                url: "/app",
                abstract: true,
                cache: false,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.doctors', {
                url: "/doctors",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/doctors.html",
                        controller: 'DoctorCtrl'
                    }
                }
            })

            .state('app.report', {
                url: "/report",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/report.html",
                        controller: 'ReportCtrl'
                    }
                }
            })

            .state('app.doctor-details', {
                url: '/doctor-patients/:doctorIndex',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/doctor-patients.html',
                        controller: 'DoctorDetailsCtrl'
                    }
                }
            })

            .state('app.patient-details', {
                url: '/patientDetails/:patientIndex/:doctorInd',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/patient-details.html',
                        controller: 'PatientDetailsCtrl'
                    }
                }
            })

            .state('app.add-patient', {
                url: '/addPatient/:doctorInd',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/addPatient.html',
                        controller: 'AddPatientCtrl'
                    }
                }
            })

            .state('app.add-doctor', {
                cache: false,
                url: '/doctorAdd',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/addDoctor.html',
                        controller: 'AddDoctorCtrl'
                    }
                }
            })

            .state('app.edit-doctor', {
                url: '/editDoctor/:doctorIndex',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/addDoctor.html',
                        controller: 'EditDoctorCtrl'
                    }
                }
            })

            .state('app.add-txn', {
                cache: false,
                url: '/txnAdd/:patientIndex/:doctorInd',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/addTxn.html',
                        controller: 'AddTxnCtrl'
                    }
                }
            })

            .state('app.edit-patient', {
                url: '/editPatient/:patientIndex/:doctorInd',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/addPatient.html',
                        controller: 'EditPatientCtrl'
                    }
                }
            })

            .state('app.edit-txn', {
                cache: false,
                url: '/txnedit/:patientIndex/:doctorInd/:txnInd',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/addTxn.html',
                        controller: 'EditTxnCtrl'
                    }
                }
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/doctors');

    });
