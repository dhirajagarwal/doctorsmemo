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
                phone: $scope.doctor.phone
            };
            Data.addDoc(doc);
            $state.go('doctors');
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
                date: $scope.txn.date,
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
            $state.go('patient-details', {patientIndex: $stateParams.patientIndex, doctorInd: $stateParams.doctorInd});
        }
    })

    .controller('AddPatientCtrl', function ($scope, Data, $state, $stateParams) {
        $scope.doctorInde = $stateParams.doctorInd;
        $scope.patient = {};

        $scope.txtFields = {};
        $scope.txtFields.header = 'Add Patient';
        $scope.txtFields.buttonTxt = 'Add Patient';

        $scope.patFuncs = {};
        $scope.patFuncs.buttonAction = function () {
            var patient = {
                name: $scope.patient.name,
                illness: $scope.patient.illness,
                phone: $scope.patient.phone,
                startDate: $scope.patient.startDate,
                fees: $scope.patient.fees,
                share: $scope.patient.share,
                transactions: []
            };
            Data.addPat(patient, $stateParams.doctorInd);
            $state.go('doctor-details', {doctorIndex: $stateParams.doctorInd});
        }
    })

    .controller('EditPatientCtrl', function ($scope, Data, $state, $stateParams) {
        $scope.doctorInde = $stateParams.doctorInd;
        $scope.patientInd = $stateParams.patientIndex;
        $scope.patient = Data.getPatient($stateParams.patientIndex, $stateParams.doctorInd);

        $scope.txtFields = {};
        $scope.txtFields.header = 'Edit Patient';
        $scope.txtFields.buttonTxt = 'Submit';

        $scope.patFuncs = {};
        $scope.patFuncs.buttonAction = function () {
            Data.editPat($stateParams.doctorInd, $stateParams.patientIndex, $scope.patient);
            $state.go('patient-details', {patientIndex: $stateParams.patientIndex, doctorInd: $stateParams.doctorInd});
        }

    });
