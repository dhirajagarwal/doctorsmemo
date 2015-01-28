/**
 * Created by dhirajagarwal on 25/01/15.
 */


angular.module('doctorApp.controllers', [])

    .controller('DoctorCtrl', function ($scope, Data) {
        $scope.allDocs = Data.allData();

        $scope.search = {};
        $scope.search.searchIcon = false;
        $scope.search.searchText = "";

        $scope.searchClicked = function(){
            $scope.search.searchText = "";
            $scope.search.searchIcon = !$scope.search.searchIcon;
        }

    })

    .controller('DoctorDetailsCtrl', function ($scope, $stateParams, Data){
        $scope.doctorInde = $stateParams.doctorIndex;
        $scope.doctorDetails = Data.getDoc($stateParams.doctorIndex);

        $scope.search = {};
        $scope.search.searchIcon = false;
        $scope.search.searchText = "";

        $scope.searchClicked = function(){
            $scope.search.searchText = "";
            $scope.search.searchIcon = !$scope.search.searchIcon;
        }

    })

    .controller('PatientDetailsCtrl', function ($scope, $stateParams, Data){
        $scope.doctorIndex = $stateParams.doctorInd;
        $scope.patientDetails = Data.getDoc($stateParams.doctorInd).patients[$stateParams.patientIndex]
    })

    .controller('AddDoctorCtrl', function ($scope, Data, $state) {
        $scope.doctor = {};
        $scope.addDoctor = function () {
            var doc = {
                name: $scope.doctor.firstname + ' ' + $scope.doctor.lastname,
                address: '',
                phone: $scope.doctor.tel,
                amount: 0,
                due: 0,
                edit: false,
                patients:[]
            };
            Data.addDoc(doc);
            $state.go('doctors');
        }
    })

    .controller('AddPatientCtrl', function ($scope, Data, $state, $stateParams) {
        $scope.doctorInde = $stateParams.doctorInd;
        $scope.patient = {};
        $scope.addPatient = function () {
            var patient = {
                name: $scope.patient.firstname + ' ' + $scope.patient.lastname,
                illness: $scope.patient.illness,
                phone: $scope.patient.tel,
                amount: 0,
                edit: false,
                startDate : $scope.patient.startDate,
                endDate : $scope.patient.endDate,
                share: 0,
                transactions:[]
            };
            Data.addPat(patient, $stateParams.doctorInd);
            $state.go('doctor-details', {doctorIndex : $stateParams.doctorInd});
        }
    });