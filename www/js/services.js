/**
 * Created by dhirajagarwal on 25/01/15.
 */
angular.module('doctorApp.services', [])

    .factory('Data', function () {
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
                illness: 'Root Canal',
                phone: '9970428444',
                amount: 5000,
                share: 2000,
                edit: false,
                startDate: '12/12/2014',
                endDate: '23/11/2015',
                transactions: [{
                    type: 'Payment',
                    date: '15/12/2014',
                    amount: 4000
                }, {
                    type: 'Receipt',
                    date: '20/5/2015',
                    amount: 3000
                }]
            }, {
                name: 'Poonam Agarwal',
                illness: 'Dental Braces',
                phone: '9970428444',
                amount: 5000,
                share: 2000,
                edit: false,
                startDate: '12/12/2014',
                endDate: '23/11/2015',
                transactions: [{
                    type: 'Payment',
                    date: '15/12/2014',
                    amount: 4000
                }, {
                    type: 'Receipt',
                    date: '20/5/2015',
                    amount: 3000
                }]
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
                illness: 'Gingivitis',
                phone: '9970428444',
                amount: 5000,
                share: 2000,
                edit: false,
                startDate: '12/12/2014',
                endDate: '23/11/2015',
                transactions: [{
                    type: 'Payment',
                    date: '15/12/2014',
                    amount: 4000
                }, {
                    type: 'Receipt',
                    date: '20/5/2015',
                    amount: 3000
                }]
            }, {
                name: 'Usha Agarwal',
                illness: 'Periodontitis',
                phone: '9970428444',
                amount: 5000,
                share: 2000,
                edit: false,
                startDate: '12/12/2014',
                endDate: '23/11/2015',
                transactions: [{
                    type: 'Payment',
                    date: '15/12/2014',
                    amount: 4000
                }, {
                    type: 'Receipt',
                    date: '20/5/2015',
                    amount: 3000
                }]
            }]
        },
            {
                name: 'Dr. Deshpande',
                address: 'Aundh',
                phone: '9970428444',
                amount: 6000,
                due: 2000,
                edit: false,
                patients: [{
                    name: 'Sushil Bansal',
                    illness: 'Root Canal',
                    phone: '9970428444',
                    amount: 5000,
                    share: 2000,
                    edit: false,
                    startDate: '12/12/2014',
                    endDate: '23/11/2015',
                    transactions: [{
                        type: 'Payment',
                        date: '15/12/2014',
                        amount: 4000
                    }, {
                        type: 'Receipt',
                        date: '20/5/2015',
                        amount: 3000
                    }]
                }, {
                    name: 'Jatin Bansal',
                    illness: 'Gum swelling',
                    phone: '9970428444',
                    amount: 5000,
                    share: 2000,
                    edit: false,
                    startDate: '12/12/2014',
                    endDate: '23/11/2015',
                    transactions: [{
                        type: 'Payment',
                        date: '15/12/2014',
                        amount: 4000
                    }, {
                        type: 'Receipt',
                        date: '20/5/2015',
                        amount: 3000
                    }]
                }]
            },
            {
                name: 'Dr. Sawarkar',
                address: 'Aundh',
                phone: '9970428444',
                amount: 6000,
                due: 2000,
                edit: false,
                patients: [{
                    name: 'Himanshu Agarwal',
                    illness: 'Toothace',
                    phone: '9970428444',
                    amount: 5000,
                    share: 2000,
                    edit: false,
                    startDate: '12/12/2014',
                    endDate: '23/11/2015',
                    transactions: [{
                        type: 'Payment',
                        date: '15/12/2014',
                        amount: 4000
                    }, {
                        type: 'Receipt',
                        date: '20/5/2015',
                        amount: 3000
                    }]
                }, {
                    name: 'Anup Agarwal',
                    illness: 'Tooth Erosion',
                    phone: '9970428444',
                    amount: 5000,
                    share: 2000,
                    edit: false,
                    startDate: '12/12/2014',
                    endDate: '23/11/2015',
                    transactions: [{
                        type: 'Payment',
                        date: '15/12/2014',
                        amount: 4000
                    }, {
                        type: 'Receipt',
                        date: '20/5/2015',
                        amount: 3000
                    }]
                }]
            },
            {
                name: 'Dr. Phadke',
                address: 'Aundh',
                phone: '9970428444',
                amount: 6000,
                due: 2000,
                edit: false,
                patients: [{
                    name: 'Ashish Agarwal',
                    illness: 'Mouth Sores',
                    phone: '9970428444',
                    amount: 5000,
                    share: 2000,
                    edit: false,
                    startDate: '12/12/2014',
                    endDate: '23/11/2015',
                    transactions: [{
                        type: 'Payment',
                        date: '15/12/2014',
                        amount: 4000
                    }, {
                        type: 'Receipt',
                        date: '20/5/2015',
                        amount: 3000
                    }]
                }, {
                    name: 'Ritu Agarwal',
                    illness: 'Tooth Decay',
                    phone: '9970428444',
                    amount: 5000,
                    share: 2000,
                    edit: false,
                    startDate: '12/12/2014',
                    endDate: '23/11/2015',
                    transactions: [{
                        type: 'Payment',
                        date: '15/12/2014',
                        amount: 4000
                    }, {
                        type: 'Receipt',
                        date: '20/5/2015',
                        amount: 3000
                    }]
                }]
            }];

        return {
            allData: function () {
                return data;
            },
            removeDoc: function (index) {
                chats.splice(data[index], 1);
            },
            getDoc: function (index) {
                return data[index]
            },
            addDoc: function (doctor) {
                data.push(doctor);
            },
            addPat: function (patient, doctorIndex) {
                data[doctorIndex].patients.push(patient);
            }
        }
    });
