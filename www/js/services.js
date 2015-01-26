/**
 * Created by dhirajagarwal on 25/01/15.
 */
angular.module('doctorApp.services', [])

    .factory('Data', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var data = [{
            name: 'Dr. Batra',
            address: 'Karve Nagar',
            phone: '9970428444',
            amount: 5000,
            due: 3000,
            edit: false,
            patients: [{
                name: 'Dhiraj Agarwal',
                address: 'Pune',
                phone: '9970428444',
                amount: 5000,
                edit: false
            }, {
                name: 'Poonam Agarwal',
                address: 'KundanNagar',
                phone: '9970428444',
                amount: 5000,
                edit: false
            }]
        }, {
            name: 'Dr. Sohoni',
            address: 'Aundh',
            phone: '9970428444',
            amount: 6000,
            due: 2000,
            edit: false,
            patients: [{
                name: 'Suresh Agarwal',
                address: 'Khadki',
                phone: '9970428444',
                amount: 5000,
                edit: false
            }, {
                name: 'Usha Agarwal',
                address: 'Vishalnagar',
                phone: '9970428444',
                amount: 5000,
                edit: false
            }]
        }];

        return {
            allData: function() {
                return data;
            },
            removeDoc: function(index) {
                chats.splice(data[index], 1);
            },
            getDoc: function(index) {
                return data[index]
            },
            addDoc: function(doctor){
                data.push(doctor);
            },
            addPat: function(patient,doctorIndex){
                data[doctorIndex].patients.push(patient);
            }
        }
    });
