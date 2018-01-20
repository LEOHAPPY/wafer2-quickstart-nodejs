const { mysql } = require('../qcloud')

async function getAllPerson(ctx, next) {
  var data = {
    // personInfo: await mysql('person').select('*').where({id: 15}),
    personInfo: await mysql.select().table('person'),
    // msg: "get all person info"
    sqlCommand: mysql.select().table('person').toString()
  }
  ctx.body = data
} 

// async function getByIDPerson(ctx, next) {
//   // getByIDPerson/111
//   var personID = ctx.params.id
//   var data = {
//     id: personID,
//     personInfo: await mysql('person').select('*').where(mysql.raw('?? = ?', ['person.id', personID])),
//     msg: mysql('person').select('*').where(mysql.raw('?? = ?', ['person.id', personID])).toString()
//   }
//   ctx.body = data
// }

//
//post and return person id
async function addPerson(ctx, next) {
  // var requestBody = ctx.request.body
  var personDtl = ctx.request.body.personDtl
  var data = {
    id : '',
    msg: ''
  }
  await mysql("person")
    .insert(personDtl)
    .then(function (id) {
      data.id = id[0];
      data.msg = 'insert'
    })
  ctx.body = data
}

async function updatePerson(ctx, next) {
  var { personID, personDtl } = ctx.query;
  await mysql("person")
    .update("personDtl", { personDtl })
    .where("id", { personID })
    .then(function (count) {
      console.log(count);
    });
}

// async function deletePerson(ctx, next) {
//   const { personID } = ctx.query;
//   await mysql("person")
//     .delete()
//     .where("id",{personID})
//     .then(function (count){
//       console.log(count);
//     });

// }

module.exports = {
  getAllPerson,
  // getByIDPerson,
  addPerson,
  // updatePerson,
  // deletePerson
}