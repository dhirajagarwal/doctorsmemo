/**
 * Created by dhirajagarwal on 25/01/15.
 */
angular.module('doctorApp.services', [])

    .factory('Data', function ($firebase) {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var dataFactory = {};
        var baseUrl = 'https://doctormemo.firebaseio.com/';

        dataFactory.allData = function () {
            var ref = new Firebase(baseUrl);
            var data = $firebase(ref).$asArray();
            return data;
        };

        dataFactory.getDoc = function (index) {
            var url = baseUrl + index;
            var ref = new Firebase(url);
            var data = $firebase(ref).$asObject();
            return data;
        };

        dataFactory.editDoc = function (index, doc) {
            var url = baseUrl + index;
            var ref = new Firebase(url);
            var data = $firebase(ref).$asObject();
            data = doc;
            data.$save();
        };

        dataFactory.removeDoc = function (index) {
            var ref = new Firebase(baseUrl + index);
            var data = $firebase(ref).$asObject();
            data.$remove();
        };

        dataFactory.getPatient = function (patient, doctorIndex) {
            var url = baseUrl + doctorIndex + '/patients/' + patient;
            var ref = new Firebase(url);
            var data = $firebase(ref).$asObject();
            return data;
        };

        dataFactory.removePatient = function (patient, doctorIndex) {
            var url = baseUrl + doctorIndex + '/patients/' + patient;
            var ref = new Firebase(url);
            var data = $firebase(ref).$asObject();
            data.$remove();
        };

        dataFactory.addDoc = function (doctor) {
            var ref = new Firebase(baseUrl);
            var data = $firebase(ref).$asArray();
            data.$add(doctor);
        };

        dataFactory.addPat = function (patient, doctorIndex) {
            var patientUrl = baseUrl + doctorIndex + '/patients';
            var patientsRef = new Firebase(patientUrl);
            var sync = $firebase(patientsRef).$asArray();
            sync.$add(patient);

        };

        dataFactory.addTxn = function (txn, doctorIndex, patientIndex) {
            var txnUrl = baseUrl + doctorIndex + '/patients/' + patientIndex + '/transactions/';
            var patientsRef = new Firebase(txnUrl);
            var sync = $firebase(patientsRef).$asArray();
            sync.$add(txn);
        };

        dataFactory.editPat = function (doctorId, patientId, patient) {
            var url = baseUrl + doctorId + '/patients/' + patientId;
            var ref = new Firebase(url);
            var data = $firebase(ref).$asObject();
            data = patient;
            data.$save();
        };

        return dataFactory;

    });