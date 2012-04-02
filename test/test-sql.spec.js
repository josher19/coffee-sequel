(function() {
  var should;

  require('mocha-cakes');

  should = require('should');

  Feature("SQL-like Syntax", "As someone who knows SQL", "I want to be able to use SQL syntax in CoffeeScript", "So it will be easier to manipulate JSON data", function() {
    return Scenario("3 possible different styles for SQL in CoffeeScript: object, global functions, dot-functions", function() {
      var SQL, company, jsonstore, results;
      SQL = null;
      results = null;
      jsonstore = {
        results: [
          {
            name: "Josh"
          }, {
            name: "Alice"
          }, {
            name: "Bob"
          }
        ],
        count: 3
      };
      company = [
        {
          name: 'alice',
          salary: 50,
          dept: 'Engineering'
        }, {
          name: 'bob',
          salary: 40,
          dept: 'HR'
        }, {
          name: 'james',
          salary: 45,
          dept: 'Engineering'
        }
      ];
      Given("I am starting a CoffeeScript file", function() {});
      When("I require SQL", function() {
        return SQL = require('./SQL');
      });
      Then("it should be an object or function", function() {
        var type;
        should.exist(SQL);
        type = typeof SQL;
        type.should.not.equal("undefined");
        ["function", "object"].should.include(type);
        return type.should.eql("function");
      });
      And("I should be able to use SQL as a function on a json object", function() {
        return SQL = require('./SQL');
      });
      When("I can pass it an object with SELECT, FROM, and WHERE keys", function() {
        return results = SQL({
          SELECT: function(r) {
            return r.name;
          },
          FROM: jsonstore.results,
          WHERE: function(r) {
            return r.name !== "Josh";
          },
          LIMIT: 1
        });
      });
      Then("results are returned as an Array", function() {
        should.exist(results);
        should.exist(results.length);
        Array.isArray(results).should.be["true"];
        return results.length.should.equal(1);
      });
      Given("I should be able to use SQL as a function on a json object", function() {
        return SQL = require('./SQL');
      });
      When("I can pass it an object with SELECT, FROM, and WHERE keys", function() {
        return results = SQL({
          SELECT: function(r) {
            return r.name;
          },
          FROM: jsonstore.results,
          WHERE: function(r) {
            return r.name !== "Josh";
          },
          LIMIT: 1
        });
      });
      Then("results are returned as an Array", function() {
        should.exist(results);
        should.exist(results.length);
        return results.should.have.length(1);
      });
      Given("I should be able to use a fluent SQL dot-syntax", function() {
        return SQL = require('./SQL');
      });
      When("I call SQL.SELECT(fields).FROM(table).WHERE(...)", function() {
        return results = SQL.SELECT(function(r) {
          return r.name;
        }).FROM(jsonstore.results).WHERE(function(r) {
          return r.name !== "Josh";
        }).LIMIT(1);
      });
      Then("results are returned as an Array", function() {
        should.exist(results);
        should.exist(results.length);
        return results.length.should.eql(1);
      });
      Given("I should be able to use a functional syntax", function() {});
      When("I call SELECT(fields, FROM(table, WHERE(...)))", function() {
        var FROM, LIMIT, SELECT, WHERE, _ref;
        _ref = require('./SQL'), SELECT = _ref.SELECT, FROM = _ref.FROM, WHERE = _ref.WHERE, LIMIT = _ref.LIMIT;
        return results = SELECT(function() {
          return [this.name];
        }, FROM(jsonstore.results, WHERE(function(r) {
          return r.name !== "Josh";
        }, LIMIT(1))));
      });
      Then("results are returned as an Array", function() {
        should.exist(results);
        should.exist(results.length);
        return results.length.should.eql(1);
      });
      Given("I should be able to use AS as a keyword", function() {});
      When("I call SELECT(field AS name, FROM(table, WHERE(...)))", function() {
        String.prototype.AS = function(key, o) {
          if (o == null) o = {};
          o[key] = this.toString();
          return o;
        };
        return results = SQL({
          SELECT: function(r) {
            return r.name.AS("firstname", r.name.charAt(0).AS('middle_initial', r.name.AS('surname')));
          },
          FROM: jsonstore.results,
          WHERE: function(r) {
            return r.name !== "Josh";
          },
          LIMIT: 1
        });
      });
      return Then("results are returned as an Array", function() {
        should.exist(results);
        should.exist(results.length);
        results.length.should.eql(1);
        return console.log(results);
      });
    });
  });

}).call(this);
