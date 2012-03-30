### Decide on Syntax

Functional:

```coffeescript
    SELECT(fieldsFn, FROM(table, WHERE(whereFn, LIMIT(100))))
```

Fluently/Functional Object with dots:

```coffeescript
    select(fields).from(table).where('x').lt(10).limit(100)
```

Object:

```coffeescript
    SELECT: fieldsFn
    FROM: table
    WHERE: whereFn
    LIMIT: 100
```

### Minimize number of new CoffeeScript Keywords

Should try to minimize number of new Keywords required in CoffeeScript and implement rest as a DSL.

"AS" might be a good one:

```SQL
     last_name AS surname
     company AS corporation
```

becomes

```coffeescript
     surname : @last_name
     corporation : @company
```

which is transformed into Javascript as:

```javascript
     {
     "surname": this.last_name,
     "corporation": this.company     
     }
```     
