## **Description** ##
Simple boiler plate to use graphQL with apollo server express for RelayJS.

This server make to run simply things of GraphQL operation, for frontend side: https://github.com/maspinguin/react-relay-boiler-plate

Tool that use:
 - Express for server
 - GraphQL and GraphQL Relay

Simply run
``npm install``
then ``npm run update-schema``
for update the graphql schema.


then ``npm run start:local``

App will run with `:8080` port of your localhost..
Playground: localhost:8080/graphql


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
    
    client(id:"1") {
      id
      name
    }
    clients(first:2, after:"", search:"") {
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
** Client Mutation **
```
mutation addDataClientMutation($input:addDataClientMutationInput!){
  addDataClientMutation(input:$input) {
    viewer{
      id,
     name,
      email,
     plainId
    }
  }
}
```
query Variable:
```
{
  "input": {
    "name":"fas",
    "email": "bangkit@adfsf1.com"
  }
}
```

** Senja Mutation **
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
query variable:
```
{
  "input": {
    "name":"Bangkitsess"
  }
}
```

### Available Subscription ###
** Client Updated **
```
subscription ClientUpdatedSubscription($input:clientUpdatedInput!) {
  clientUpdated(input:$input){
    viewer{
      id
      name
      email
      plainId
      status
    }
  }
}
```
query variable:
```
{
  "input": {
    "plainId": "2"
  }
}
```
