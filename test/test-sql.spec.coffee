require 'mocha-cakes'
should=require 'should'

Feature "SQL-like Syntax",
  "As someone who knows SQL",
  "I want to be able to use SQL syntax in CoffeeScript",
  "So it will be easier to manipulate JSON data", ->
  
    Scenario "3 possible different styles for SQL in CoffeeScript: object, global functions, dot-functions", ->
    
      SQL = null
      results = null
      jsonstore = {results:[{name:"Josh"},{name:"Alice"},{name:"Bob"}],count:3}
    
      Given "I am starting a CoffeeScript file", ->
      When "I require SQL", ->
        SQL=require('./SQL')
      Then "it should be an object or function", ->
        
        # it 'should exist', ->
        # console.info(should.exist)
        # console.info(SQL)
        should.exist(SQL)
          
        # it 'should be a function or object', ->
        type = typeof SQL
        type.should.not.equal "undefined"
        [ "function", "object" ].should.include(type)
        type.should.eql "function"
          
      And "I should be able to use SQL as a function on a json object", ->
        SQL=require('./SQL')
      When "I can pass it an object with SELECT, FROM, and WHERE keys", ->
        results = SQL
          SELECT: "name"
          FROM: jsonstore.results
          WHERE: (r)-> r.name != "Josh"
          LIMIT: 1          
      Then "results are returned as an Array", ->
        # it 'should return a result', ->
           should.exist(results)
           should.exist(results.length)
           Array.isArray(results).should.be.true
           results.length.should.equal(1)

      Given "I should be able to use SQL as a function on a json object", ->
        SQL=require('./SQL')
      When "I can pass it an object with SELECT, FROM, and WHERE keys", ->
        results = SQL
          SELECT: "name"
          FROM: jsonstore.results
          WHERE: (r)-> r.name != "Josh"
          LIMIT: 1          
      Then "results are returned as an Array", ->
        # it 'should return a result', ->
           should.exist(results)
           should.exist(results.length)
           Array.isArray(results).should.be.true
           results.should.have.length(1)
           
      Given "I should be able to use a fluent SQL dot-syntax", ->
        SQL=require('./SQL')
      When "I call SQL.SELECT(fields).FROM(table).WHERE(...)", ->
        results = SQL.
          SELECT("name").
          FROM(jsonstore.results).
          WHERE( (r)-> r.name != "Josh" ).
          LIMIT(1)
      Then "results are returned as an Array", ->
        # it 'should return a result', ->
           should.exist(results)
           should.exist(results.length)
           Array.isArray(results).should.be.true
           results.length.should.eql 1
           
      Given "I should be able to use a functional syntax", ->
      When "I call SELECT(fields, FROM(table, WHERE(...)))", ->
        {SELECT,FROM,WHERE,LIMIT} = require('./SQL')
        results = SELECT "name",
          FROM jsonstore.results,
          WHERE (r)-> r.name != "Josh",
          LIMIT 1
      Then "results are returned as an Array", ->
        # it 'should return a result', ->
           should.exist(results)
           should.exist(results.length)
           Array.isArray(results).should.be.true
           results.length.should.eql 1       

      Given "I should be able to use AS as a keyword", ->
      When "I call SELECT(fields, FROM(table, WHERE(...)))", ->
        results = SQL
          SELECT: (r) -> r.name AS "firstname", r.middlename.charAt(1) AS middle_initial, r.lastname AS `surname`
          FROM: jsonstore.results AS r
          WHERE: (r)-> r.name != "Josh"
          LIMIT: 1          
      Then "results are returned as an Array", ->
        # it 'should return a result', ->
           should.exist(results)
           should.exist(results.length)
           Array.isArray(results).should.be.true
           results.length.should.eql 1       
           
## TODO
## Change Limit to 2
## Eliminate Limit
## Actually test results are correct
