/**
 * Created by dhirajagarwal on 25/01/15.
 */
angular.module('doctorApp.services', [])

    .factory('Data', function ($firebase) {

        var dataFactory = {};

        dataFactory.allData = function () {
            var baseUrl = 'https://doctormemo.firebaseio.com/' + window.localStorage.getItem("email") + '/';
            var ref = new Firebase(baseUrl);
            return $firebase(ref).$asArray();
        };

        dataFactory.getDoc = function (index) {
            var baseUrl = 'https://doctormemo.firebaseio.com/' + window.localStorage.getItem("email") + '/';
            var ref = new Firebase(baseUrl + index);
            return $firebase(ref).$asObject();
        };

        dataFactory.editDoc = function (index, doc) {
            var baseUrl = 'https://doctormemo.firebaseio.com/' + window.localStorage.getItem("email") + '/';
            var url = baseUrl + index;
            var ref = new Firebase(url);
            var data = $firebase(ref).$asObject();
            data = doc;
            data.$save();
        };

        dataFactory.removeDoc = function (index) {
            var baseUrl = 'https://doctormemo.firebaseio.com/' + window.localStorage.getItem("email") + '/';
            var ref = new Firebase(baseUrl + index);
            var data = $firebase(ref).$asObject();
            data.$remove();
        };

        dataFactory.getPatient = function (patient, doctorIndex) {
            var baseUrl = 'https://doctormemo.firebaseio.com/' + window.localStorage.getItem("email") + '/';
            var url = baseUrl + doctorIndex + '/patients/' + patient;
            var ref = new Firebase(url);
            var data = $firebase(ref).$asObject();
            return data;
        };

        dataFactory.removePatient = function (patient, doctorIndex) {
            var baseUrl = 'https://doctormemo.firebaseio.com/' + window.localStorage.getItem("email") + '/';
            var url = baseUrl + doctorIndex + '/patients/' + patient;
            var ref = new Firebase(url);
            var data = $firebase(ref).$asObject();
            data.$remove();
        };

        dataFactory.addDoc = function (doctor) {
            var baseUrl = 'https://doctormemo.firebaseio.com/' + window.localStorage.getItem("email") + '/';
            var ref = new Firebase(baseUrl);
            var data = $firebase(ref).$asArray();
            data.$add(doctor);
        };

        dataFactory.addPat = function (patient, doctorIndex) {
            var baseUrl = 'https://doctormemo.firebaseio.com/' + window.localStorage.getItem("email") + '/';
            var patientUrl = baseUrl + doctorIndex + '/patients';
            var patientsRef = new Firebase(patientUrl);
            var sync = $firebase(patientsRef).$asArray();
            sync.$add(patient);

        };

        dataFactory.addTxn = function (txn, doctorIndex, patientIndex) {
            var baseUrl = 'https://doctormemo.firebaseio.com/' + window.localStorage.getItem("email") + '/';
            var txnUrl = baseUrl + doctorIndex + '/patients/' + patientIndex + '/transactions/';
            var patientsRef = new Firebase(txnUrl);
            var sync = $firebase(patientsRef).$asArray();
            sync.$add(txn);
        };

        dataFactory.editPat = function (doctorId, patientId, patient) {
            var baseUrl = 'https://doctormemo.firebaseio.com/' + window.localStorage.getItem("email") + '/';
            var url = baseUrl + doctorId + '/patients/' + patientId;
            var ref = new Firebase(url);
            var data = $firebase(ref).$asObject();
            data = patient;
            data.$save();
        }

        dataFactory.getTxn = function (doctorId, patientId, txnId) {
            var baseUrl = 'https://doctormemo.firebaseio.com/' + window.localStorage.getItem("email") + '/';
            var url = baseUrl + doctorId + '/patients/' + patientId + '/transactions/' + txnId;
            var ref = new Firebase(url);
            var data = $firebase(ref).$asObject();
            return data;
        };

        dataFactory.editTxn = function (doctorId, patientId, txnId, txn) {
            var baseUrl = 'https://doctormemo.firebaseio.com/' + window.localStorage.getItem("email") + '/';
            var url = baseUrl + doctorId + '/patients/' + patientId + '/transactions/' + txnId;
            var ref = new Firebase(url);
            var data = $firebase(ref).$asObject();
            data = txn;
            data.$save();
        };

        dataFactory.removeTxn = function (doctorId, patientId, txnId) {
            var baseUrl = 'https://doctormemo.firebaseio.com/' + window.localStorage.getItem("email") + '/';
            var url = baseUrl + doctorId + '/patients/' + patientId + '/transactions/' + txnId;
            var ref = new Firebase(url);
            var data = $firebase(ref).$asObject();
            data.$remove();
        };

        dataFactory.updateAllData = function (doctorIndex, patientIndex) {
            var baseUrl = 'https://doctormemo.firebaseio.com/' + window.localStorage.getItem("email") + '/';
            var patUrl = baseUrl + doctorIndex + '/patients/' + patientIndex;
            var patRef = new Firebase(patUrl);
            var pat = $firebase(patRef).$asObject();

            pat.$loaded().then(function (data) {
                var rMaterial = 0, rPatient = 0, rVisdoc = 0, pMaterial = 0, pPatient = 0, pVisdoc = 0;
                for (var txn in data.transactions) {
                    if (data.transactions[txn].payment) {
                        rMaterial += Number(data.transactions[txn].material);
                        rPatient += Number(data.transactions[txn].patient);
                        rVisdoc += Number(data.transactions[txn].visdoc);
                    }
                    else {
                        pMaterial += Number(data.transactions[txn].material);
                        pPatient += Number(data.transactions[txn].patient);
                        pVisdoc += Number(data.transactions[txn].visdoc);
                    }
                }
                pat.material = rMaterial - pMaterial;
                pat.patient = rPatient - pPatient;
                pat.visdoc =  rVisdoc - pVisdoc;
                pat.$save();
            });

            var docUrl = baseUrl + doctorIndex;
            var docRef = new Firebase(docUrl);
            var doc = $firebase(docRef).$asObject();

            doc.$loaded().then(function (data) {
                var material = 0, patient = 0, visdoc = 0;
                for (var pat in data.patients) {
                    material += Number(data.patients[pat].material);
                    patient += Number(data.patients[pat].patient);
                    visdoc += Number(data.patients[pat].visdoc);
                }
                doc.material = material;
                doc.patient = patient;
                doc.visdoc = visdoc;
                doc.$save();
            });
        };

        return dataFactory;
    });