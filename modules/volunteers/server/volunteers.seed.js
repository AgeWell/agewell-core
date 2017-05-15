'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Volunteer = mongoose.model('Volunteer');

let docArray = [{
  '_id': '58cc2d921206fd7fed39c01c',
  'started': new Date('2017-03-17T18:40:18.987Z')
}, {
  '_id': '59037938b70faf0952685bb9',
  'comments': 'Nihil consequatur, est maiores sapiente eum provident, enim impedit, exercitationem labore ad.',
  'started': new Date('2017-04-28T17:17:44.007Z')
}, {
  '_id': '59037a4ac0fba53811b20b0d',
  'comments': 'Ex animi, excepturi dolorem obcaecati repellendus. Delectus, magnam qui reprehenderit ab anim molestiae vel qui iure numquam.',
  'active': false,
  'started': new Date('2017-04-28T17:22:18.781Z')
}, {
  '_id': '59037af1c0fba53811b20b10',
  'comments': 'Corporis quia molestias vitae tenetur impedit, doloribus placeat, officia cupiditate irure aliquam qui et nulla.',
  'active': false,
  'started': new Date('2017-04-28T17:25:05.181Z')
}, {
  '_id': '59037b58c0fba53811b20b13',
  'comments': 'Corporis vel officiis est sed dolore ut sunt, culpa sunt eius quo.',
  'active': false,
  'started': new Date('2017-04-28T17:26:48.814Z')
}, {
  '_id': '59037b62c0fba53811b20b17',
  'comments': 'Doloremque explicabo. Voluptate et iusto eos, cum adipisicing corporis voluptatem. Nulla iure.',
  'active': false,
  'started': new Date('2017-04-28T17:26:58.243Z')
}, {
  '_id': '59037b6bc0fba53811b20b1b',
  'comments': 'Sapiente aut sint, odio ex placeat, impedit, repudiandae dignissimos iste dolores officia adipisci debitis sed magni totam non dicta deleniti.',
  'active': false,
  'started': new Date('2017-04-28T17:27:07.505Z')
}, {
  '_id': '59037b73c0fba53811b20b1f',
  'comments': 'Provident, aute quis accusantium enim quae ipsam sed in fugiat velit fugit.',
  'active': false,
  'started': new Date('2017-04-28T17:27:15.578Z')
}, {
  '_id': '59037b81c0fba53811b20b23',
  'comments': 'Deleniti odio itaque sed et dolorum quis hic aut harum irure sequi velit qui consectetur, neque debitis.',
  'active': false,
  'started': new Date('2017-04-28T17:27:29.086Z')
}, {
  '_id': '59037b88c0fba53811b20b27',
  'comments': 'Qui voluptas delectus, aut laudantium, neque mollitia est, ea voluptas accusantium consequuntur.',
  'active': false,
  'started': new Date('2017-04-28T17:27:36.222Z')
}, {
  '_id': '59037b8ec0fba53811b20b2b',
  'comments': 'Explicabo. Ipsum, aute id et eius excepteur vero minim quasi voluptas sint, aspernatur esse, dolore sunt.',
  'active': false,
  'started': new Date('2017-04-28T17:27:42.697Z')
}, {
  '_id': '59037b95c0fba53811b20b2f',
  'comments': 'Veniam, rerum laboris natus asperiores sed et cupiditate in ut laborum. Nihil adipisci et qui.',
  'active': false,
  'started': new Date('2017-04-28T17:27:49.115Z')
}];

/**
 * Create a Volunteer
 */
exports.seed = function(done) {

  var total = docArray.length,
    result = [];

  function saveAll() {
    var doc = new Volunteer(docArray.pop());

    doc.save(function(err, saved) {
      if (err) {
        throw console.error(err);
      }

      result.push(saved[0]);

      if (result.length !== total) {
        return saveAll();
      }
      return done();
    });
  }

  Volunteer.find({}, function(err, volunteers) {
    if (volunteers.length !== total) {
      saveAll();
    }
  });
};
