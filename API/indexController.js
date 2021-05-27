const getUrl = (req) => req.protocol + '://' + req.get('host')

module.exports = {
    arguments : (req, res) => {
        res.status(200).json({
            title : 'API Challenge-Alkemy',
            args : {
              character : {
                getAll : {
                  endPoint : getUrl(req) + '/characters',
                  method : 'GET',
                },
                getOne : {
                  endPoint : getUrl(req) + '/characters/{id}',
                  method :'GET'
                },
                create : {
                  endPoint : getUrl(req) + '/characters/create',
                  method : 'POST',
                  dataRequired : {
                    name : 'STRING(45)',
                    age : 'INTEGER',
                    weight : 'DECIMAL',
                    history : 'STRING(45)',
                    image : 'STRING(45)'
                  }
                },
                edit : {
                  endPoint : getUrl(req) + '/characters/edit/{id}',
                  method : 'POST',
                  dataRequired : {
                    name : 'STRING(45)',
                    age : 'INTEGER',
                    weight : 'DECIMAL',
                    history : 'STRING(45)',
                    image : 'STRING(45)'
                  }
                },
                delete : {
                  endPoint : getUrl(req) + '/characters/delete/{id}',
                  method : 'POST'
                }
              },
              movies : {
                getAll : {
                    endPoint : getUrl(req) + '/movies',
                    method : 'GET',
                  },
                  getOne : {
                    endPoint : getUrl(req) + '/movies/{id}',
                    method :'GET'
                  },
                  create : {
                    endPoint : getUrl(req) + '/movies/create',
                    method : 'POST',
                    dataRequired : {
                      title : 'STRING(45)',
                      release_date : 'INTEGER',
                      score : 'INTEGER',
                      image : 'STRING(45)'
                    }
                  },
                  edit : {
                    endPoint : getUrl(req) + '/movies/edit/{id}',
                    method : 'POST',
                    dataRequired : {
                        title : 'STRING(45)',
                        release_date : 'INTEGER',
                        score : 'INTEGER',
                        image : 'STRING(45)'
                    }
                  },
                  delete : {
                    endPoint : getUrl(req) + '/movies/delete/{id}',
                    method : 'POST'
                  }
              }
            }
          })
    }
}