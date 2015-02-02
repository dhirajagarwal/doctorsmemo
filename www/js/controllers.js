/**
 * Created by dhirajagarwal on 25/01/15.
 */


angular.module('doctorApp.controllers', [])

    .controller('DoctorCtrl', function ($scope, Data) {
        $scope.allDocs = Data.allData();
        $scope.search = {};
        $scope.search.searchIcon = false;
        $scope.search.searchText = "";

        $scope.searchClicked = function () {
            $scope.search.searchText = "";
            $scope.search.searchIcon = !$scope.search.searchIcon;
        }
    })

    .controller('DoctorDetailsCtrl', function ($scope, $stateParams, Data) {
        $scope.doctorInde = $stateParams.doctorIndex;
        $scope.doctorDetails = Data.getDoc($stateParams.doctorIndex);

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
            Data.removePatient(patientInd,doctorInd);
        }
    })

    .controller('AddDoctorCtrl', function ($scope, Data, $state) {
        $scope.doctor = {};
        $scope.addDoctor = function () {
            var doc = {
                name: $scope.doctor.name,
                address: $scope.doctor.address,
                phone: $scope.doctor.tel,
                amount: 0,
                due: 0,
                edit: false,
                patients: [{}]
            };
            Data.addDoc(doc);
            $state.go('doctors');
        }
    })

    .controller('AddTxnCtrl', function ($scope, Data, $stateParams, $state) {
        $scope.doctorIndex = $stateParams.doctorInd;
        $scope.patientInd = $stateParams.patientIndex;
        $scope.txn = {};
        $scope.txn.payment = false;
        $scope.addTxn = function () {
            var txn = {
                payment: $scope.txn.payment,
                amount: $scope.txn.amount,
                date: $scope.txn.date
            };
            Data.addTxn(txn, $stateParams.doctorInd, $stateParams.patientIndex);
            $state.go('patient-details', {patientIndex: $stateParams.patientIndex, doctorInd: $stateParams.doctorInd});
        }
    })

    .controller('AddPatientCtrl', function ($scope, Data, $state, $stateParams) {
        $scope.doctorInde = $stateParams.doctorInd;
        $scope.patient = {};
        $scope.addPatient = function () {
            var patient = {
                name: $scope.patient.name,
                illness: $scope.patient.illness,
                phone: $scope.patient.tel,
                amount: 0,
                edit: false,
                startDate: $scope.patient.startDate,
                endDate: $scope.patient.endDate,
                share: 0,
                transactions: []
            };
            Data.addPat(patient, $stateParams.doctorInd);
            $state.go('doctor-details', {doctorIndex: $stateParams.doctorInd});
        }
    });