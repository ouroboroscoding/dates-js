# @ouroboros/dates

[![npm version](https://img.shields.io/npm/v/@ouroboros/dates.svg)](https://www.npmjs.com/package/@ouroboros/dates) ![MIT License](https://img.shields.io/npm/l/@ouroboros/dates.svg)

A library with various methods for date manipulation and displaying

## Installation
npm
```bash
npm install @ouroboros/dates
```
## Functions
- [age](#age)
- [dayOfWeek](#dayofweek)
- [elapsed](#elapsed)
- [increment](#increment)
- [iso](#iso)
- [isToday](#istoday)
- [nextDayOfWeek](#nextdayofweek)
- [nice](#nice)
- [previousDayOfWeek](#previousdayofweek)
- [relative](#relative)
- [timeframe](#timeframe)
- [timestamp](#timestamp)

### age
Returns the current age of someone based on date of birth.
```javascript
import { age } from '@ouroboros/dates';

let yearsOld;

// yearsOld = 41 (assuming today is '2022-09-22 11:23:00' a Thursday)
yearsOld = age('1981-05-02');

// yearsOld = 20 (assuming today is '2022-09-22 11:23:00' a Thursday)
yearsOld = age(1032634800);
```

[ [top](#ouroborosdates) / [functions](#functions) ]

### dayOfWeek
Returns the day of the week in the current week, regardless of past or future. Weeks start on Sunday (0) and end on Saturday (6) according to Javascript.
```javascript
import { dayOfWeek } from '@ouroboros/dates';

// dow = Date('2022-09-19 00:00:00')
// (assuming today is '2022-09-22 11:23:00' a Thursday)
let dow = dayOfWeek(1); // Get Monday

// dow = Date('2022-09-23 00:00:00')
// (assuming today is '2022-09-22 11:23:00' a Thursday)
dow = dayOfWeek(5); // Get Friday
```

[ [top](#ouroborosdates) / [functions](#functions) ]

### elapsed
Takes the time in seconds and converts it to human readable hours, minutes, seconds.

`elapsed`'s second argument takes an object of flags for what to show/hide in the string.

| Key | Default | Description |
| --- | --- | --- |
| `show_zero_minutes` | false | Show the minutes regardless if there aren't enough seconds to calculate any. |
| `show_zero_hours` | false | Show the hours and minutes regardless if there aren't enough seconds to calculate any |
| `show_minutes` | true | Show the minutes. |
| `show_seconds` | true | Show the seconds. |

```javascript
import { elapsed } from '@ouroboros/dates';

let s;

// s = '10'
s = elapsed(10);

// s = '0:10'
s = elapsed(10, {show_zero_minutes: true});

// s = '0:00:10'
s = elapsed(10, {show_zero_hours: true});

// s = '1:05'
s = elapsed(65);

// s = '1'
s = elapsed(65, {show_seconds: false});

// s = '0:01'
s = elapsed(65, {show_seconds: false, show_zero_hours: true});

// s = '5:00:00'
s = elapsed(18000);

// s = '5:00'
s = elapsed(18000, {show_seconds: false});

// s = '5'
s = elapsed(18000, {show_minutes: false});
```

[ [top](#ouroborosdates) / [functions](#functions) ]

### increment
Returns a date incremented by the given days. Use negative to decrement.
```javascript
import { increment } from '@ouroboros/dates';

// assuming today is '2022-09-22 11:23:00' a Thursday

// d = Date('2022-09-23 11:23:00')
let d = increment();

// d = Date('2022-09-25 11:23:00')
d = increment(2, d);

// d = Date('2022-09-22 11:23:00' a Thursday)
d = increment(-3, d);

// d = Date('2022-09-18 11:23:00')
d = increment(-4);
```

[ [top](#ouroborosdates) / [functions](#functions) ]

### iso
Returns a nicely formatted date string in a modified ISO format suitable for DBs and most systems.
```javascript
import { iso } from '@ouroboros/dates';

let s;

// s = '1981-05-02 16:23:00'
s = iso(357668580);

// s = '1981-05-02'
s = iso(357668580, false);

// assuming today is '2022-09-22 11:23:00' a Thursday
// s = '2022-09-22'
s = iso(new Date(), false);
```

[ [top](#ouroborosdates) / [functions](#functions) ]

### isToday
Returns true if the passed date corresponds to the current date.
```javascript
import { isToday } from '@ouroboros/dates';

let b;

// assuming today is '2022-09-22 11:23:00' a Thursday
// b = true
b = isToday(new Date());
b = isToday(1663860180);

// b = false
b = isToday(increment(1));
b = isToday('2022-09-21');
b = isToday(1663946580);
```

[ [top](#ouroborosdates) / [functions](#functions) ]

### nextDayOfWeek
Allows you to get the date of a specific day of the week in the next week, or many weeks in the future.
```javascript
import { nextDayOfWeek } from '@ouroboros/dates';

let d;

// assuming today is '2022-09-22 11:23:00' a Thursday
// d = Date('2022-09-23 00:00:00')
d = nextDayOfWeek(5); // Get Friday

// d = Date('2022-09-27 00:00:00')
d = nextDayOfWeek(2); // Get Tuesday

// d = Date('2022-10-04 00:00:00')
d = nextDayOfWeek(2, 2); // Get Tuesday in 2nd week

// d = Date('2022-10-11 00:00:00')
d = nextDayOfWeek(2, 3); // Get Tuesday in 3rd week
```

[ [top](#ouroborosdates) / [functions](#functions) ]

### nice
Returns a date formatted in the client's local format
```javascript
import { nice } from '@ouroboros/dates';

let s;

// assuming today is '2022-09-22 11:23:00' a Thursday
// s = 'Thursday, September 22, 2022 11:23:00'
s = nice(new Date());

// s = 'Thu, Sep 22, 2022 11:23:00'
s = nice(new Date(), 'en-US', 'short');

// s = 'Thursday, September 22, 2022'
s = nice(new Date(), 'en-US', 'long', false);

// s = 'jeu. 22 sept. 2022'
s = nice(new Date(), 'fr-FR', 'short', false);

// s = 'jueves, 22 de septiembre de 2022, 11:23:00'
s = nice(new Date(), 'sp-MX');
```

[ [top](#ouroborosdates) / [functions](#functions) ]

### previousDayOfWeek
Allows you to get the date of a specific day of the week in the previous week, or many previous weeks, before.
```javascript
import { previousDayOfWeek } from '@ouroboros/dates';

let d;

// assuming today is '2022-09-22 11:23:00' a Thursday
// d = Date('2022-09-16 00:00:00')
d = previousDayOfWeek(5); // Get Friday

// d = Date('2022-09-20 00:00:00')
d = previousDayOfWeek(2); // Get Tuesday

// d = Date('2022-09-13 00:00:00')
d = previousDayOfWeek(2, 2); // Get Tuesday in 2nd week

// d = Date('2022-09-06 00:00:00')
d = previousDayOfWeek(2, 3); // Get Tuesday in 3rd week
```

[ [top](#ouroborosdates) / [functions](#functions) ]

### relative
Returns a date string description relative to the current day.
```javascript
import { relative } from '@ouroboros/dates';

let s;

// assuming today is '2022-09-22 11:23:00' a Thursday
// s = '06:00'
s = relative('2022-10-22 10:00:00');

// s = 'September 1'
s = relative('2022-10-01 11:23:00');

// s = 'September 10, 2021'
s = relative('2021-10-10');

// s = '1 sept, 2021'
s = relative('2021-10-10', 'es-MX', 'short');
```

[ [top](#ouroborosdates) / [functions](#functions) ]

### timeframe
Returns a start and end date in **date**, **datetime**, or **timestamp**
assuming EOD today as the end date, and then decrementing `count` of `type` from
there to get the start date.

For example. If we ran this function on the **21st of June, 2025**, with the
following examples
```javascript
import { timeframe } from '@ouroboros/dates';

// 15 days ago as dates
//	['2025-06-06', '2025-06-21']
timeframe(15, 'days', 'date');

// 2 weeks ago as date/times
//	['2025-06-07 00:00:00', '2025-06-21 23:59:59']
timeframe(2, 'weeks', 'datetime');

// 3 months ago in timestamps
//	[1742529600, 1750564799]
timeframe(3, 'months', 'timestamp');

// 1 year ago as dates
//	['2024-06-21', '2025-06-21']
timeframe(1, 'year', 'date');
```

[ [top](#ouroborosdates) / [functions](#functions) ]

### timestamp
Returns an unsigned whole number representing the seconds since 1970-01-01
```javascript
import { timestamp } from '@ouroboros/dates';

// Assuming current date is 2023-03-03 13:36:40
//	1677850600
timestamp();

// 0
timestamp('1970-01-01');

// 357654180
timestamp('1981-05-02 12:23:00'); // UTC

// 357668580
timestamp('1981-05-02 12:23:00', false); // EST

// 357668580
timestamp(357668580);

// 1677850785
timestamp(new Date());
```

[ [top](#ouroborosdates) / [functions](#functions) ]