'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Client = mongoose.model('Client');

let docArray = [{
  '_id ': '58 cc257b0ed1c8650836036a',
  'monthlyIncomeSingle': '$1,486-1,980',
  'transportation': 'No I am unable to drive',
  'groceryCallList': true,
  'services': [],
  'active': true,
  'started': new Date('2017-03-17T18:05:47.699Z'),
  '__v': 0
}, {
  '_id': '59036c9bf3895a15640d781a',
  'monthlyIncomeSingle': '> $1,980',
  'monthlyIncomeMarried': '> $2,670',
  'transportation': 'No I am unable to drive',
  'referralSource': 'Voluptas dignissimos praesentium laboris consequatur, cillum magnam atque dolor ut.',
  'comments': 'Reiciendis inventore quia repudiandae est, aut quas cupiditate illo porro animi, laborum aliqua. Sunt voluptas voluptate reiciendis excepturi natus.',
  'groceryCallList': true,
  'services': [],
  'active': true,
  'started': new Date('2017-04-28T16:23:55.098Z'),
  '__v': 0
}, {
  '_id': '59036ca4f3895a15640d781e',
  'monthlyIncomeSingle': '> $1,980',
  'monthlyIncomeMarried': '> $2,670',
  'transportation': 'No I am unable to drive',
  'referralSource': 'Sunt ab id assumenda nihil cupiditate quos voluptatem autem quia.',
  'comments': 'Tempora esse, ut aut modi ad aliquid eu iure voluptas alias amet, beatae duis quaerat officia soluta cupidatat aut est.',
  'groceryCallList': true,
  'services': [],
  'active': true,
  'started': new Date('2017-04-28T16:24:04.969Z'),
  '__v': 0
}, {
  '_id': '59036cacf3895a15640d7822',
  'monthlyIncomeSingle': '> $1,980',
  'monthlyIncomeMarried': '> $2,670',
  'transportation': 'No I am unable to drive',
  'referralSource': 'Esse, nihil qui quasi magni unde velit qui non molestiae inventore molestias est consequat. Asperiores et.',
  'comments': 'Possimus, dolorum modi at consequat. Possimus, nostrum voluptatem, nulla facere cumque a molestiae veniam.',
  'groceryCallList': true,
  'services': [],
  'active': true,
  'started': new Date('2017-04-28T16:24:12.709Z'),
  '__v': 0
}, {
  '_id': '59036cb5f3895a15640d7826',
  'monthlyIncomeSingle': '> $1,980',
  'monthlyIncomeMarried': '> $2,670',
  'transportation': 'No I am unable to drive',
  'referralSource': 'Non maxime assumenda est reiciendis et nihil exercitation proident, aute adipisicing.',
  'comments': 'Ut in nisi reprehenderit error eos, ratione incidunt, cillum ratione culpa, nihil in cumque dolore laudantium, in qui voluptatibus.',
  'groceryCallList': true,
  'services': [],
  'active': true,
  'started': new Date('2017-04-28T16:24:21.386Z'),
  '__v': 0
}, {
  '_id': '59036cbff3895a15640d782a',
  'monthlyIncomeSingle': '> $1,980',
  'monthlyIncomeMarried': '> $2,670',
  'transportation': 'No I am unable to drive',
  'referralSource': 'Et vero qui eum in molestiae autem velit sunt veritatis modi fugiat aut ipsum nemo quas.',
  'comments': 'Culpa doloremque beatae vel delectus, error eu minus esse est, quia sit, at corrupti, reprehenderit cupiditate possimus, eaque dolorem enim.',
  'groceryCallList': true,
  'services': [],
  'active': true,
  'started': new Date('2017-04-28T16:24:31.492Z'),
  '__v': 0
}, {
  '_id': '59036cc9f3895a15640d782e',
  'monthlyIncomeSingle': '> $1,980',
  'monthlyIncomeMarried': '> $2,670',
  'transportation': 'No I am unable to drive',
  'referralSource': 'Exercitation aliquid sit, ipsum, est placeat, est harum excepteur aut eaque molestias minima quia dignissimos sed eu aliquam eius duis.',
  'comments': 'Nisi fuga. Quam doloremque cupiditate aut aliquip tempore, tenetur necessitatibus dolor rem consequatur dicta consectetur omnis officia.',
  'groceryCallList': true,
  'services': [],
  'active': true,
  'started': new Date('2017-04-28T16:24:41.056Z'),
  '__v': 0
}, {
  '_id': '590372a8f3895a15640d7840',
  'monthlyIncomeSingle': '> $1,980',
  'monthlyIncomeMarried': '> $2,670',
  'transportation': 'No I am unable to drive',
  'referralSource': 'Eos, eum blanditiis veniam, dolores ipsum, nihil cupiditate dolore ea autem a repellendus. Quis pariatur. Qui sed neque consequatur.',
  'comments': 'Et in commodo alias reiciendis eius cupiditate exercitationem quis voluptatibus odio aut officia tempore, voluptate aut ea esse.',
  'groceryCallList': true,
  'services': [],
  'active': true,
  'started': new Date('2017-04-28T16:49:44.741Z'),
  '__v': 0
}, {
  '_id': '590372d1f3895a15640d7844',
  'monthlyIncomeSingle': '> $1,980',
  'monthlyIncomeMarried': '> $2,670',
  'transportation': 'No I am unable to drive',
  'referralSource': 'In qui ducimus, voluptatem. Non eos, magna et aperiam voluptates ipsam nihil vel assumenda porro.',
  'comments': 'Cupiditate laborum. Sit omnis voluptate veniam, accusamus officia tenetur necessitatibus ut maxime recusandae. Velit.',
  'groceryCallList': true,
  'services': [],
  'active': true,
  'started': new Date('2017-04-28T16:50:25.023Z'),
  '__v': 0
}, {
  '_id': '59037332f3895a15640d7849',
  'monthlyIncomeSingle': '> $1,980',
  'monthlyIncomeMarried': '> $2,670',
  'transportation': 'No I am unable to drive',
  'referralSource': 'Voluptates aliquam reprehenderit dolorem porro laborum dolor ut dignissimos pariatur.',
  'comments': 'Et ea ratione dolore amet, est, amet, aut et nihil ad exercitation deserunt aliquid.',
  'groceryCallList': true,
  'services': [],
  'active': true,
  'started': new Date('2017-04-28T16:52:02.020Z'),
  '__v': 0
}, {
  '_id': '5903733bf3895a15640d784d',
  'monthlyIncomeSingle': '> $1,980',
  'monthlyIncomeMarried': '> $2,670',
  'transportation': 'No I am unable to drive',
  'referralSource': 'Quasi odit velit qui officia excepteur illum, consequat. Numquam nisi facere facere.',
  'comments': 'Nam similique commodi sed magna iure modi sed nihil vero voluptatem error dicta quod placeat, consequatur.',
  'groceryCallList': true,
  'services': [],
  'active': true,
  'started': new Date('2017-04-28T16:52:11.312Z'),
  '__v': 0
}, {
  '_id': '59037344f3895a15640d7851',
  'monthlyIncomeSingle': '> $1,980',
  'monthlyIncomeMarried': '> $2,670',
  'transportation': 'No I am unable to drive',
  'referralSource': 'Rerum iste dignissimos porro duis non ab enim quaerat unde delectus, adipisci dolor.',
  'comments': 'Voluptas autem deleniti enim est illum, deleniti quibusdam accusamus eiusmod optio, ea in.',
  'groceryCallList': true,
  'services': [],
  'active': true,
  'started': new Date('2017-04-28T16:52:20.865Z'),
  '__v': 0
}];

/**
 * Create a Client
 */
exports.seed = function(done) {

  var total = docArray.length,
    result = [];

  function saveAll() {
    var doc = new Client(docArray.pop());

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

  Client.find({}, function(err, clients) {
    if (clients.length !== total) {
      // saveAll();
    }
  });
};
