## **Description** ##
Simple boiler plate to use graphQL with apollo server

Tool that use:
 - Express for server
 - GraphQL and GraphQL Relay

Simply run
``npm install``
then ``npm run update-schema``
for update the graphql schema.


then ``npm run start:local``

App will run with `:8080` port of your localhost..


PS:
Currently this boiler plate are using mock data with json file for simple explaining reason of the whole graphQL process.
You can improve by yourself, eg: using `Sequelize` to connect with your DB.

### For Monitor ###
actually you also can monitor of your graphQL Server using apollo: https://www.apollographql.com/
edit config by your auth key inside `/config/default.json`


### Available Query ###
```{
     viewer{
       id
       senja(id:"1") {
         id
         name
       }
       senjas(first:2, after:"", search:"") {
         pageInfo{
           hasNextPage
           startCursor
           endCursor
         }
         edges {
           node {
             id
             name
             plainId
           }
         }
       }
     }
   }
```

### Available Mutation ###
```
mutation addDataSenjaMutation($input:addDataSenjaMutationInput!){
  addDataSenjaMutation(input:$input) {
    viewer{
      id,
    	name
    	plainId
    }
  }
}
```
