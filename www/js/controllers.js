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

    })

    .controller('PatientDetailsCtrl', function ($scope, $stateParams, Data) {
        $scope.doctorIndex = $stateParams.doctorInd;
        $scope.patientInd = $stateParams.patientIndex;
        console.log($scope.patientInd);
        //$scope.patientDetails = Data.getDoc($stateParams.doctorInd).patients[$stateParams.patientIndex]
        $scope.patientDetails = Data.getPatient($stateParams.patientIndex, $stateParams.doctorInd);
        console.log($scope.patientDetails);
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