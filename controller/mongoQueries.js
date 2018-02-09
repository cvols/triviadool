db.users.update({ provider_id: "10210852668136164" }, 
{ $push: 
  { games: [
    {scores: 'score'}, {category: 'category'}, {total: 'total'}
  ]}})

  db.users.update(
    { provider_id: "10210852668136164" },
    { $addToSet: {scores: [{scores: 'score'}, {category: 'category'}, {total: 'total'} ] } }
 )

 db.users.update(
  { provider_id: "10210852668136164" },
  { $addToSet: { 
    games: {scores: 'score1', category: 'category', total: 'total'} } 
  }
)