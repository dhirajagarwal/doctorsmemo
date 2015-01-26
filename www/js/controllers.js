/**
 * Created by dhirajagarwal on 25/01/15.
 */


angular.module('doctorApp.controllers', [])

    .controller('DoctorCtrl', function ($scope, Data) {
        $scope.allDocs = Data.allData();

    })

    .controller('DoctorDetailsCtrl', function ($scope, $stateParams, Data){
        $scope.doctorInde = $stateParams.doctorIndex;
        $scope.doctorDetails = Data.getDoc($stateParams.doctorIndex);
    })

    .controller('PatientDetailsCtrl', function ($scope, $stateParams, Data){
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
        $scope.patient = {};
        $scope.addPatient = function () {
            var patient = {
                name: $scope.patient.firstname + ' ' + $scope.patient.lastname,
                address: '',
                phone: $scope.patient.tel,
                amount: 0,
                edit: false
            };
            Data.addPat(patient, $stateParams.doctorInd);
            $state.go('doctor-details', {doctorIndex : $stateParams.doctorInd});
        }
    });