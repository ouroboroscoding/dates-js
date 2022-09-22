# @ouroboros/dates

[![npm version](https://img.shields.io/npm/v/@ouroboros/dates.svg)](https://www.npmjs.com/package/@ouroboros/dates) ![MIT License](https://img.shields.io/npm/l/@ouroboros/dates.svg)

A library with various methods for date manipulation and displaying

## Installation
npm
```bash
npm install @ouroboros/dates
```
## Functions

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
### dayOfWeek
Returns the day of the week in the current week, regardless of past or future. Weeks start on Sunday (0) and end on Saturday (6) according to Javascript.
```javascript
import { dayOfWeek } from '@ouroboros/dates';

// dow = Date('2022-09-19 00:00:00')
// (assuming today is '2022-09-22 11:23:00' a Thursday)
let dow = dayOfWeek(1) // Get Monday

// dow = Date('2022-09-23 00:00:00')
// (assuming today is '2022-09-22 11:23:00' a Thursday)
dow = dayOfWeek(5); // Get Friday
```
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
s = elapsed(10)

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
### iso
Returns a nicely formatted date string in a modified ISO format suitable for DBs and most systems.
```javascript
import { iso } from '@ouroboros/dates';

// s = '1981-05-02 16:23:00'
let s = iso(357668580);

// s = '1981-05-02'
let s = iso(357668580, false)

// assuming today is '2022-09-22 11:23:00' a Thursday
// s = '2022-09-22'
let s = iso(new Date(), false);
```
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
### nextDayOfWeek
Allows you to get the date of a specific day of the week in the next week, or many weeks in the future.
```javascript
import { nextDayOfWeek } from '@ouroboros/dates';

let d;

// assuming today is '2022-09-22 11:23:00' a Thursday
// d = Date('2022-09-23 00:00:00')
d = nextDayOfWeek(5) // Get Friday

// d = Date('2022-09-27 00:00:00')
d = nextDayOfWeek(2) // Get Tuesday

// d = Date('2022-10-04 00:00:00')
d = nextDayOfWeek(2, 2) // Get Tuesday in 2nd week

// d = Date('2022-10-11 00:00:00')
d = nextDayOfWeek(2, 3) // Get Tuesday in 3rd week
```
### nice
Returns a date formatted in the client's local format
```javascript
import { nice } from '@ouroboros/dates';

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
### previousDayOfWeek
Allows you to get the date of a specific day of the week in the previous week, or many previous weeks, before.
```javascript
import { previousDayOfWeek } from '@ouroboros/dates';

let d;

// assuming today is '2022-09-22 11:23:00' a Thursday
// d = Date('2022-09-16 00:00:00')
d = previousDayOfWeek(5) // Get Friday

// d = Date('2022-09-20 00:00:00')
d = previousDayOfWeek(2) // Get Tuesday

// d = Date('2022-09-13 00:00:00')
d = previousDayOfWeek(2, 2) // Get Tuesday in 2nd week

// d = Date('2022-09-06 00:00:00')
d = previousDayOfWeek(2, 3) // Get Tuesday in 3rd week
```
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
