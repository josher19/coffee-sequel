
/*
Stub SQL for now
*/

(function() {
  var FROM, LIMIT, SELECT, SQL, WHERE, company, corporation, emp_data, her, me, p, results, show, staff, _i, _len;

  module.exports = SQL = function(q) {
    var row, _i, _len, _ref, _ref2, _results;
    show((_ref = q.LIMIT) != null ? _ref : q.LIMIT = -1);
    _ref2 = q.FROM;
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      row = _ref2[_i];
      if (q.WHERE(row) && q.LIMIT--) _results.push(q.SELECT(row));
    }
    return _results;
  };

  SQL.SELECT = function() {
    return SQL;
  };

  SQL.FROM = function() {
    return this;
  };

  SQL.WHERE = function() {
    return this;
  };

  SQL.LIMIT = function() {
    return this;
  };

  SELECT = function(selectFn, results) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = results.length; _i < _len; _i++) {
      item = results[_i];
      _results.push(selectFn.call(item));
    }
    return _results;
  };

  FROM = function(list, whereFn) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      item = list[_i];
      if (whereFn(item)) _results.push(item);
    }
    return _results;
  };

  WHERE = function(reducer, lim) {
    if (lim == null) lim = -1;
    return function(whereItem) {
      return lim-- && reducer.call(whereItem);
    };
  };

  LIMIT = function(n) {
    return n;
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

  show = function(a) {
    console.info(a);
    return a;
  };

  me = SELECT(function() {
    return {
      name: this.name,
      new_salary: parseInt(this.salary * 1.1)
    };
  }, FROM(company, WHERE(function() {
    return this.dept === 'Engineering';
  })));

  SELECT(function() {
    return {
      name: this.name,
      new_salary: this.salary * 1.11
    };
  }, FROM(company, WHERE(function() {
    return this.dept === 'Engineering';
  })));

  emp_data = function(emps, department) {
    return SQL({
      SELECT: function(emp) {
        return {
          name: emp.name,
          new_salary: parseInt(emp.salary * 1.1)
        };
      },
      FROM: emps,
      WHERE: function(emp) {
        return emp.dept === department;
      },
      LIMIT: 2
    });
  };

  her = emp_data(company, 'Engineering');

  staff = company;

  for (_i = 0, _len = staff.length; _i < _len; _i++) {
    p = staff[_i];
    p.first_name = p.name;
    p.surname = "Smith";
    p.payroll_info = {
      salary: 2000 * p.salary,
      type: "hourly"
    };
  }

  company = {
    employees: staff,
    name: "Coffee Sequel",
    company_revenue: function() {
      return 1;
    }
  };

  results = SELECT(function() {
    return {
      name: company.name,
      revenue: company.company_revenue(2012),
      first_name: this.first_name,
      last_name: this.surname,
      hourly: this.payroll_info.salary / 2000,
      payroll_type: this.payroll_info.type
    };
  }, FROM(company.employees, WHERE(function() {
    var _ref;
    return (_ref = this.payroll_info.type) === 'hourly' || _ref === 'parttime';
  })));

  show(SQL({
    SELECT: function(emp) {
      return {
        name: emp.name,
        new_salary: parseInt(emp.salary * 1.1),
        co_name: company.name,
        revenue: company.company_revenue(2012),
        first_name: emp.first_name,
        last_name: emp.surname,
        hourly: emp.payroll_info.salary / 2000,
        payroll_type: emp.payroll_info.type
      };
    },
    FROM: company.employees,
    WHERE: function(emp) {
      var _ref;
      return (_ref = emp.payroll_info.type) === 'hourly' || _ref === 'parttime';
    },
    LIMIT: 1
  }));

  show(corporation = {
    info: {
      name: company.name,
      revenue: company.company_revenue(2012)
    },
    staff: (function() {
      var emp, filtered_emps, _j, _len2, _results;
      filtered_emps = (function() {
        var _j, _len2, _ref, _ref2, _results;
        _ref = company.employees;
        _results = [];
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          emp = _ref[_j];
          if ((_ref2 = emp.payroll_info.type) === 'hourly' || _ref2 === 'parttime') {
            _results.push(emp);
          }
        }
        return _results;
      })();
      _results = [];
      for (_j = 0, _len2 = filtered_emps.length; _j < _len2; _j++) {
        emp = filtered_emps[_j];
        _results.push({
          first_name: emp.first_name,
          last_name: emp.surname,
          hourly: emp.payroll_info.salary / 2000,
          payroll_type: emp.payroll_info.type
        });
      }
      return _results;
    })()
  });

}).call(this);
