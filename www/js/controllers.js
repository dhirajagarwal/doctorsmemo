/**
 * Created by dhirajagarwal on 25/01/15.
 */


angular.module('doctorApp.controllers', [])

    .controller('AppCtrl', function($scope, $state) {
        $scope.logout = function(){
            window.localStorage.removeItem("loggedIn");
            window.localStorage.removeItem("email");
            $state.go('login');
        }
    })

    .controller('DoctorCtrl', function ($scope, Data, $state) {

        var value = window.localStorage.getItem("loggedIn");

        if (value === '' || value === undefined || value === null) {
            $state.go('login');
        }

        $scope.allDocs = Data.allData();
        $scope.search = {};
        $scope.search.searchIcon = false;
        $scope.search.searchText = "";

        $scope.doc = {};
        $scope.doc.tog = false;

        $scope.doc.expand = function () {
            $scope.doc.tog = !$scope.doc.tog;
        }

        $scope.searchClicked = function () {
            $scope.search.searchText = "";
            $scope.search.searchIcon = !$scope.search.searchIcon;
        }
    })

    .controller('DoctorDetailsCtrl', function ($scope, $stateParams, Data) {
        $scope.doctorInde = $stateParams.doctorIndex;
        $scope.doctorDetails = Data.getDoc($stateParams.doctorIndex);

        $scope.pat = {};
        $scope.pat.tog = false;

        $scope.pat.expand = function () {
            $scope.pat.tog = !$scope.pat.tog;
        }

        $scope.search = {};
        $scope.search.searchIcon = false;
        $scope.search.searchText = "";

        $scope.searchClicked = function () {
            $scope.search.searchText = "";
            $scope.search.searchIcon = !$scope.search.searchIcon;
        }

        $scope.doctorfunc = {};
        $scope.doctorfunc.removeDoc = function (doctorInd) {
            Data.removeDoc(doctorInd);
        }

    })

    .controller('PatientDetailsCtrl', function ($scope, $stateParams, Data) {
        $scope.doctorIndex = $stateParams.doctorInd;
        $scope.patientInd = $stateParams.patientIndex;
        $scope.patientDetails = Data.getPatient($stateParams.patientIndex, $stateParams.doctorInd);

        $scope.patientfunc = {};
        $scope.patientfunc.removePat = function (patientInd, doctorInd) {
            Data.removePatient(patientInd, doctorInd);
        }
    })

    .controller('AddDoctorCtrl', function ($scope, Data, $state) {
        $scope.doctor = {};
        $scope.txtFields = {};
        $scope.txtFields.header = 'Add Doctor';
        $scope.txtFields.buttonTxt = 'Add Doctor';

        $scope.docFuncs = {};
        $scope.docFuncs.buttonAction = function () {
            var doc = {
                name: $scope.doctor.name,
                address: $scope.doctor.address,
                phone: $scope.doctor.phone,
                patient: 0,
                material: 0,
                visdoc: 0
            };
            Data.addDoc(doc);
            $state.go('app.doctors');
        }
    })

    .controller('EditDoctorCtrl', function ($scope, $state, $stateParams, Data) {
        $scope.doctorInde = $stateParams.doctorIndex;
        $scope.doctor = Data.getDoc($stateParams.doctorIndex);

        $scope.txtFields = {};
        $scope.txtFields.header = 'Edit Doctor';
        $scope.txtFields.buttonTxt = 'Submit';

        $scope.docFuncs = {};
        $scope.docFuncs.buttonAction = function () {
            Data.editDoc($stateParams.doctorIndex, $scope.doctor);
            $state.go('app.doctors');
        }
    })

    .controller('ReportCtrl', function ($scope, Data) {

        var Docs = Data.allData();

        Docs.$loaded().then(function (data){
            console.log(data);
        });

        $scope.report= {};

        var d = new Date();
        d.setDate(1);

        $scope.report.to = new Date();
        $scope.report.from = d;

        $scope.report.submit = function(){
            var newPatients = 0, clinics = 0, patients = 0;
            var rPatient= 0,rMaterial= 0, rVisdoc= 0, pPatient= 0, pMaterial= 0,pVisdoc=0;
            for (var doc in Docs){
                var docPresent = false;
                for(var patient in Docs[doc].patients){
                    var patientPresent = false;
                    if((new Date(Docs[doc].patients[patient].startDate) > $scope.report.from) && (new Date(Docs[doc].patients[patient].startDate) < $scope.report.to)){
                        newPatients += 1;
                        docPresent = true;
                    }
                    for(var txn in Docs[doc].patients[patient].transactions){
                        if((new Date(Docs[doc].patients[patient].transactions[txn].date) > $scope.report.from) && (new Date(Docs[doc].patients[patient].transactions[txn].date) < $scope.report.to)){
                            patientPresent = true;
                            docPresent = true;
                            if(Docs[doc].patients[patient].transactions[txn].payment){
                                rPatient += Number(Docs[doc].patients[patient].transactions[txn].patient);
                                rMaterial += Number(Docs[doc].patients[patient].transactions[txn].material);
                                rVisdoc += Number(Docs[doc].patients[patient].transactions[txn].visdoc);
                            }
                            else{
                                pPatient += Number(Docs[doc].patients[patient].transactions[txn].patient);
                                pMaterial += Number(Docs[doc].patients[patient].transactions[txn].material);
                                pVisdoc += Number(Docs[doc].patients[patient].transactions[txn].visdoc);
                            }
                        }
                    }
                    if(patientPresent){
                        patients += 1;
                    }
                    if(docPresent){
                        clinics += 1;
                    }
                }
            }
            $scope.report.patient = rPatient - pPatient;
            $scope.report.material = rMaterial - pMaterial;
            $scope.report.visdoc = rVisdoc - pVisdoc;
            $scope.report.newPatients = newPatients;
            $scope.report.clinics = clinics;
            $scope.report.patients = patients;
        }

    })

    .controller('AddTxnCtrl', function ($scope, Data, $stateParams, $state) {
        $scope.doctorIndex = $stateParams.doctorInd;
        $scope.patientInd = $stateParams.patientIndex;
        $scope.txn = {};
        $scope.txn.payment = false;
        $scope.txn.date = new Date();

        $scope.txtFields = {};
        $scope.txtFields.header = 'Add Transaction';
        $scope.txtFields.buttonTxt = 'Add Transaction';
        $scope.txtFields.deleteEnabled = false;

        $scope.txnFuncs = {};

        $scope.txnFuncs.buttonAction = function () {
            var txn = {
                payment: $scope.txn.payment,
                date: ($scope.txn.date).toLocaleDateString(),
                patient: 0,
                material: 0,
                visdoc: 0
            };
            if ($scope.txn.patient !== undefined) {
                txn.patient = $scope.txn.patient;
            }
            if ($scope.txn.material !== undefined) {
                txn.material = $scope.txn.material;
            }
            if ($scope.txn.visdoc !== undefined) {
                txn.visdoc = $scope.txn.visdoc;
            }
            Data.addTxn(txn, $stateParams.doctorInd, $stateParams.patientIndex);
            Data.updateAllData($stateParams.doctorInd, $stateParams.patientIndex);
            $state.go('app.patient-details', {patientIndex: $stateParams.patientIndex, doctorInd: $stateParams.doctorInd});
        }
    })

    .controller('EditTxnCtrl', function ($scope, Data, $stateParams, $state) {
        $scope.doctorIndex = $stateParams.doctorInd;
        $scope.patientInd = $stateParams.patientIndex;
        $scope.txn = Data.getTxn($stateParams.doctorInd, $stateParams.patientIndex, $stateParams.txnInd);

        $scope.txn.$loaded().then(function (data){
            $scope.txn.date = new Date(data.date);
        });

        $scope.txtFields = {};
        $scope.txtFields.header = 'Edit Transaction';
        $scope.txtFields.buttonTxt = 'Submit';
        $scope.txtFields.deleteEnabled = true;

        $scope.txnFuncs = {};

        $scope.txnFuncs.buttonAction = function () {

            $scope.txnObj = $scope.txn;

            if ($scope.txn.patient === "") {
                $scope.txnObj.patient = 0;
            }
            if ($scope.txn.material === "") {
                $scope.txnObj.material = 0;
            }
            if ($scope.txn.visdoc === "") {
                $scope.txnObj.visdoc = 0;
            }

            $scope.txnObj.date = ($scope.txn.date).toLocaleDateString();

            Data.editTxn($stateParams.doctorInd, $stateParams.patientIndex, $stateParams.txnInd, $scope.txnObj);
            Data.updateAllData($stateParams.doctorInd, $stateParams.patientIndex);
            $state.go('app.patient-details', {patientIndex: $stateParams.patientIndex, doctorInd: $stateParams.doctorInd});
        }

        $scope.txnFuncs.removeTxn = function () {
            Data.removeTxn($stateParams.doctorInd, $stateParams.patientIndex, $stateParams.txnInd);
            Data.updateAllData($stateParams.doctorInd, $stateParams.patientIndex);
        }

    })

    .controller('AddPatientCtrl', function ($scope, Data, $state, $stateParams) {
        $scope.doctorInde = $stateParams.doctorInd;
        $scope.patient = {};

        $scope.patient.startDate = new Date();

        $scope.txtFields = {};
        $scope.txtFields.header = 'Add Patient';
        $scope.txtFields.buttonTxt = 'Add Patient';

        $scope.patFuncs = {};
        $scope.patFuncs.buttonAction = function () {
            var patient = {
                name: $scope.patient.name,
                illness: $scope.patient.illness,
                phone: $scope.patient.phone,
                startDate: ($scope.patient.startDate).toLocaleDateString(),
                fees: $scope.patient.fees,
                share: $scope.patient.share,
                transactions: [],
                patient: 0,
                material: 0,
                visdoc: 0
            };
            Data.addPat(patient, $stateParams.doctorInd);
            $state.go('app.doctor-details', {doctorIndex: $stateParams.doctorInd});
        }
    })

    .controller('LoginCtrl', function ($scope, $firebaseAuth, $state) {
        var ref = new Firebase("https://doctormemo.firebaseio.com");
        $scope.authObj = $firebaseAuth(ref);
        $scope.loginError = false;
        $scope.email = {};
        $scope.password = {};

        $scope.login = function (emaildata, passworddata) {
            $scope.authObj.$authWithPassword({
                email: emaildata,
                password: passworddata
            }).then(function () {
                $scope.loginError = true;
                window.localStorage.setItem("loggedIn", "true");
                window.localStorage.setItem("email", emaildata.replace('.com', ''));
                $state.go('app.doctors');
            }).catch(function (error) {
                $scope.loginError = true;
                $scope.email.data = '';
                $scope.password.data = '';
                console.error("Authentication failed:", error);
            });
        }

    })

    .controller('EditPatientCtrl', function ($scope, Data, $state, $stateParams) {
        $scope.doctorInde = $stateParams.doctorInd;
        $scope.patientInd = $stateParams.patientIndex;
        $scope.patient = Data.getPatient($stateParams.patientIndex, $stateParams.doctorInd);

        $scope.patient.$loaded().then(function (data){
            $scope.patient.startDate = new Date(data.startDate);
        });

        $scope.txtFields = {};
        $scope.txtFields.header = 'Edit Patient';
        $scope.txtFields.buttonTxt = 'Submit';

        $scope.patFuncs = {};
        $scope.patFuncs.buttonAction = function () {
            $scope.patient.startDate = ($scope.patient.startDate).toLocaleDateString();
            Data.editPat($stateParams.doctorInd, $stateParams.patientIndex, $scope.patient);
            $state.go('app.patient-details', {patientIndex: $stateParams.patientIndex, doctorInd: $stateParams.doctorInd});
        }

    });