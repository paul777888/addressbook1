// common lib
var $ = function(id) {
    return document.getElementById(id.substr(1));
};

//function HttpStore() { }  // to be implemented

function LocalStorageStore() { }

LocalStorageStore.prototype.load = function() {
    return new Promise(function(resolve, reject) {
        resolve(localStorage.getItem('contacts'));
    });
};

LocalStorageStore.prototype.save = function(data) {
    return new Promise(function(resolve, reject) {
        localStorage.setItem('contacts', data);
        resolve();
    });
};

// model
var addressBook = (function(){
    var storage = new LocalStorageStore(),
        contacts = [];
    return {
        getAll: function() {
            return contacts;
        },
        add: function(contact) {
            contacts.push(contact);
        },
        remove: function(idx) {
            contacts.splice(idx, 1);
        },
        sort: function(key, desc) {
            contacts.sort(function(c1, c2) {
                return desc ? (c1[key] < c2[key]) : (c1[key] > c2[key]);
            });
        },
        load: function() {
            return storage.load().then(function(data) {
                console.log("calling load method in addresBook"+data);
                contacts = JSON.parse(data);
            });
        },
        save: function() {
            console.log("calling save method in addresBook"+data);
            return storage.save(JSON.stringify(contacts));
        }
    };
}());
console.log(addressBook);

// controller
(function() {
    function repaint() {
        console.log("in Controller calling repaint method "+data);
        var ce = document.createEvent('CustomEvent');
        ce.initCustomEvent('repaint', true, true, {});
        document.dispatchEvent(ce);
    }

    document.addEventListener('repaint', function() {
        var contacts = $('#contacts');
=
        contacts.innerHTML = '';

        addressBook.getAll().forEach(function(contact) {
            var str = contact.firstName + ' ' + contact.lastName + ' ' + contact.telphone;
            contacts.add(new Option(str, 0));
        });
    });

    $('#btnAdd').addEventListener('click', function() {
        var contact = {
            firstName: $('#firstName').value,
            lastName: $('#lastName').value,
            telphone: $('#telphone').value
        };
        // validate input. It should be more complex. e.g. telephone format
        for (var key in contact) {
            if (contact[key] === '') {
                alert(key + ' is required.');
                $('#' + key).focus();
                return;
            }
        }

        addressBook.add(contact);

        repaint();

        $('#contactForm').reset();
    });

    $('#K<obtnDelete').addEventListener('click', function() {
        var contacts = $('#contacts'),
            selected = contacts.selectedOptions,
            length = selected.length,
            i;

        if (length === 0) {
            alert('Please select a contact.')
            return;
        }
        for (i=length-1; i>=0; i--) {
            addressBook.remove(selected.item(i).index);
        }
        repaint();
    });

    $('#btnSortByFirstName').addEventListener('click', function() {
        addressBook.sort('firstName', true);
        repaint();
    });

    $('#btnSortByLastName').addEventListener('click', function() {
        addressBook.sort('lastName');
        repaint();
    });

    $('#btnSortByTelphone').addEventListener('click', function() {
        addressBook.sort('telphone');
        repaint();
    });

    $('#btnSave').addEventListener('click', function() {
        addressBook.save().then(function() {
            alert('Saved!');
        });
    });

    $('#btnLoad').addEventListener('click', function() {
        addressBook.load().then(function() {
            repaint();
        });
    });
}());
