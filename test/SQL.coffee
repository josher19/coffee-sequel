###
Stub SQL for now
###

module.exports = SQL = (q) -> 
    show q.LIMIT ?= -1
    (q.SELECT row for row in q.FROM when q.WHERE(row) and q.LIMIT-- )

SQL.SELECT = -> SQL
SQL.FROM  = -> this
SQL.WHERE = -> this
SQL.LIMIT = -> this

# Exploring a few different types of "Select" statements
# Select Function vs. Select Object

SELECT = (selectFn, results) -> 
  selectFn.call item for item in results
FROM = (list, whereFn) -> 
  item for item in list when whereFn item
WHERE = (reducer, lim) -> 
  lim ?= -1
  (whereItem) -> lim-- && reducer.call whereItem 
LIMIT = (n) -> n

company = [ 
    name: 'alice' 
    salary: 50 
    dept: 'Engineering' 
  , 
    name: 'bob' 
    salary: 40 
    dept: 'HR' 
  , 
    name: 'james' 
    salary: 45 
    dept: 'Engineering' 
] 

show = (a) -> console.info a; a

me = SELECT -> {@name, new_salary:parseInt(@salary * 1.1)},
FROM company,
WHERE ->  @dept == 'Engineering'

SELECT -> {@name, new_salary:@salary * 1.11},
FROM company,
WHERE ->  @dept == 'Engineering'

emp_data = (emps, department) -> 
    SQL 
      SELECT: (emp) -> 
        name: emp.name 
        new_salary: parseInt(emp.salary * 1.1) 
      FROM: emps 
      WHERE: (emp) -> 
        emp.dept is department
      LIMIT: 2

her = emp_data(company, 'Engineering')

# alert JSON.stringify(me) == JSON.stringify(her)

staff = company

for p in staff
  p.first_name = p.name
  p.surname = "Smith"
  p.payroll_info = 
     salary : 2000 * p.salary
     type : "hourly"
  
company = {
   employees : staff      
   name: "Coffee Sequel"    
   company_revenue: -> 1
}

results = SELECT -> 
  name: company.name
  revenue: company.company_revenue(2012)
  first_name: @first_name
  last_name: @surname
  hourly: @payroll_info.salary / 2000
  payroll_type: @payroll_info.type
, FROM company.employees
, WHERE -> 
  @payroll_info.type in ['hourly', 'parttime']

# show results


show SQL 
      SELECT: (emp) -> 
          name: emp.name 
          new_salary: parseInt(emp.salary * 1.1) 
          co_name: company.name
          revenue: company.company_revenue(2012)
          first_name: emp.first_name
          last_name: emp.surname
          hourly: emp.payroll_info.salary / 2000
          payroll_type: emp.payroll_info.type
      FROM: company.employees
      WHERE: (emp) -> 
        emp.payroll_info.type in ['hourly', 'parttime']
      LIMIT: 1


show    corporation =
      info: 
        name: company.name 
        revenue: company.company_revenue(2012) 
      staff:  (-> 
        filtered_emps = (emp for emp in company.employees when emp.payroll_info.type in ['hourly', 'parttime']) 
        for emp in filtered_emps 
          { 
            first_name: emp.first_name 
            last_name: emp.surname 
            hourly: emp.payroll_info.salary / 2000 
            payroll_type: emp.payroll_info.type 
          })() 
