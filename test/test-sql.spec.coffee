require 'mocha-cakes'

Feature "SQL-like Syntax",
  "As someone who knows SQL",
  "I want to be able to use SQL syntax in CoffeeScript",
  "So it will be easier to manipulate JSON data", ->
  
    Scenario "SQL object",
    
      SQL = null
      jsonstore = {results:[{name:"Josh"},{name:"Alice"},{name:"Bob"}],count:3}
    
      Given "I am starting a CoffeeScript file", ->
      When "I require SQL", ->
        SQL=require('SQL')
      Then "it should be an object or function", ->
        it 'should exist', ->
          should.exist(SQL)
        
        it 'should be a function or object', ->
          type = typeof SQL
          type.should.not.equal("undefined")
          type.should.be.within(["function", "object"])
      
      And "I should be able to use SQL as a function on a json object"
        results = SQL
          SELECT: "name"
          FROM: jsonstore.results
          WHERE: (r)-> r.name != "Josh"
          LIMIT: 1          
      Then "I can pass it an object with SELECT, FROM, and WHERE keys"
        it 'should return a result', ->
           should.exist(results)
           should.exist(results.length)
           results.should.be.an(Array)
           results.length.should.equal(1)

      And "I should be able to use SQL as a function on a json object"
        results = SQL
          SELECT: "name"
          FROM: jsonstore.results
          WHERE: (r)-> r.name != "Josh"
          LIMIT: 1          
      Then "I can pass it an object with SELECT, FROM, and WHERE keys"
        it 'should return a result', ->
           should.exist(results)
           should.exist(results.length)
           results.should.be.an(Array)
           results.length.should.eql 1
           
      And "I should be able to use a fluent SQL dot-syntax"
        results = SQL.
          SELECT("name").
          FROM(jsonstore.results).
          WHERE( (r)-> r.name != "Josh" ).
          LIMIT(1)
      Then "I can call SQL.SELECT(fields).FROM(table).WHERE(...)"
        it 'should return a result', ->
           should.exist(results)
           should.exist(results.length)
           results.should.be.an(Array)
           results.length.should.eql 1
           
      And "I should be able to use a functional syntax"
        {SELECT,FROM,WHERE,LIMIT} = require('SQL')
        results = SELECT "name",
          FROM jsonstore.results,
          WHERE (r)-> r.name != "Josh",
          LIMIT 1
      Then "I can call SELECT(fields, FROM(table, WHERE(...)))"
        it 'should return a result', ->
           should.exist(results)
           should.exist(results.length)
           results.should.be.an(Array)
           results.length.should.eql 1
       
