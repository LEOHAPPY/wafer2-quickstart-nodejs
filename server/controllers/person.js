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

async function getByIDPerson(ctx, next) {
  // getByIDPerson/111
  var personID = ctx.params.id
  var data = {
    id: personID,
    personInfo: await mysql('person').select('*').where(mysql.raw('?? = ?', ['person.id', personID])),
    msg: mysql('person').select('*').where(mysql.raw('?? = ?', ['person.id', personID])).toString()
  }
  ctx.body = data
}

async function getByOpenIDPerson(ctx, next) {
  // getByIDPerson/111
  var personID = ctx.params.id
  var data = {
    id: personID,
    personInfo: await mysql('person').select('*').where(mysql.raw('?? = ?', ['person.openId', personID])),
    msg: mysql('person').select('*').where(mysql.raw('?? = ?', ['person.openId', personID])).toString()
  }
  ctx.body = data
}

//
//post and return person id
async function addPerson(ctx, next) {
  // var requestBody = ctx.request.body
  var personDtl = ctx.request.body.personDtl
  var returnData = {
    id: '',
    msg: ''
  }
  await mysql("person")
    .insert(personDtl)
    .then(function (id) {
      returnData.id = id[0];
      returnData.msg = 'insert'
    })
  ctx.body = returnData
}

async function updatePerson(ctx, next) {
  var personDtl = ctx.request.body.personDtl
  var returnData = {
    msg: ''
  }
  await mysql("person")
    .update(personDtl)
    .where("id", personDtl.id)
    .then(function (count) {
      returnData.msg = count + 'update'
    })
  ctx.body = returnData
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
  getByIDPerson,
  getByOpenIDPerson,
  addPerson,
  updatePerson,
  // deletePerson
}