/**
 * Dates
 *
 * Useful functions related to dates and times
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2021-05-22
 */
// Generic modules
import { divmod } from '@ouroboros/tools';
// Constants
const MS_PER_DAY = 86400000;
const MS_PER_WEEK = MS_PER_DAY * 7;
/**
 * To Date
 *
 * Converts values to a Date type
 *
 * @name toDate
 * @access private
 * @param val An integer or string
 * @param utc Optional, default set to true, assumes GMT timezone where missing
 * @returns a new Date
 */
function toDate(val, utc = true) {
    // If we got a timestamp
    if (typeof val === 'number') {
        return new Date(val * 1000);
    }
    // If we got a string
    if (typeof val === 'string') {
        // If it's only ten characters, add the time and timezone
        if (val.length === 10) {
            return new Date(val +
                'T00:00:00' +
                (utc ? '-0000' : ''));
        }
        // If it's 16 characters, replace any space with T, add the seconds and
        //	add the timezone
        if (val.length === 16) {
            return new Date(val.replace(' ', 'T') +
                ':00' +
                (utc ? '-0000' : ''));
        }
        // If it's 19 characters, replace any space with T and add the timezone
        if (val.length === 19) {
            return new Date(val.replace(' ', 'T') +
                (utc ? '-0000' : ''));
        }
        // If it's over 19 characters and has a period
        if (val.length > 19 && val.substring(19, 20) === '.') {
            return new Date(val.substring(0, 19).replace(' ', 'T') +
                (utc ? '-0000' : ''));
        }
        // If it's 24 characters, assume it's good
        if (val.length === 24) {
            return new Date(val);
        }
        // Raise an exception
        throw new Error('Invalid date string: ' + val);
    }
    // Else, it must be a Date, so return as is
    return val;
}
/**
 * Age
 *
 * Returns the current age of someone based on date of birth
 *
 * @name age
 * @access public
 * @param d The date of birth
 * @returns a number representing the age
 */
export function age(d) {
    // Convert if not a date
    if (typeof d === 'number') {
        d = new Date(d * 1000);
    }
    else if (typeof d === 'string') {
        if (d.length === 10) {
            d += 'T00:00:00';
        }
        d = new Date(d);
    }
    const ageDifMs = Date.now() - d.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
/**
 * Day of Week
 *
 * Returns the day of the week in the current week, regardless of past or future
 *
 * @name DateDOW
 * @access public
 * @param dow The day of the week we want
 * @returns a new Date
 */
export function dayOfWeek(dow) {
    // If the day of the week is invalid
    if (dow < 0 || dow > 6) {
        throw new Error('dayOfWeek dow param can not be less than 0 or more than 6');
    }
    // Get todays date
    const oToday = new Date();
    // Reset the hours/minutes/seconds
    oToday.setHours(0, 0, 0);
    // Subtract the day requested from the current one
    const iDiff = oToday.getDay() - dow;
    // Subtract the amount of days from the current day to get the timestamp
    const iTS = oToday.getTime() - (iDiff * MS_PER_DAY);
    // Return the new date
    return new Date(iTS);
}
/**
 * Elapsed
 *
 * Takes the time in seconds and converts it to human readable hours, minutes,
 * seconds
 *
 * @name elapsed
 * @access public
 * @param seconds The seconds elapsed
 * @param opts Optional formating options
 * @returns a string describing the elapsed time
 */
export function elapsed(seconds, opts = null) {
    // Get the hours and remaining seconds
    const [h, r] = divmod(seconds, 3600);
    // Get the minutes and seconds
    const [m, s] = divmod(r, 60);
    // Generate the flags
    const bShowMinutes = opts === null || !('show_minutes' in opts) || opts.show_minutes;
    const bShowSeconds = opts === null || !('show_seconds' in opts) || opts.show_seconds;
    const bShowZeroHours = opts && ('show_zero_hours' in opts) && opts.show_zero_hours;
    const bShowZeroMinutes = opts && ('show_zero_minutes' in opts) && opts.show_zero_minutes;
    // Init the array we'll turn into time
    let lTime = null;
    // If we have hours
    if (h) {
        // Start by adding hours
        lTime = [h.toString()];
        // If we want to show minutes
        if (bShowMinutes) {
            lTime.push(m < 10 ? '0' + m.toString() : m.toString());
            // If we want to show seconds (can't show seconds if no minutes)
            if (bShowSeconds) {
                lTime.push(s < 10 ? '0' + s.toString() : s.toString());
            }
        }
    }
    // Else, if we have minutes
    else if (m) {
        // Init the time
        lTime = [];
        // If we want to show zero hours
        if (bShowZeroHours) {
            lTime.push('0');
        }
        // If we want to show minutes
        if (bShowMinutes) {
            lTime.push((bShowZeroHours && m < 10) ? '0' + m.toString() : m.toString());
            // If we want to show seconds (can't show seconds if no minutes)
            if (bShowSeconds) {
                lTime.push(s < 10 ? '0' + s.toString() : s.toString());
            }
        }
    }
    // Else, we only have seconds
    else {
        // Init the time
        lTime = [];
        // If we want to show zero hours
        if (bShowZeroHours) {
            lTime = ['0', '00'];
        }
        // Else, if we want to show zero minutes
        else if (bShowZeroMinutes) {
            lTime.push('0');
        }
        // If we want to show seconds
        if (bShowMinutes && bShowSeconds) {
            lTime.push(((bShowZeroMinutes || bShowZeroHours) && s < 10) ?
                '0' + s.toString() :
                s.toString());
        }
    }
    // Put them all together and return
    return lTime.join(':');
}
/**
 * Increment
 *
 * Returns a date incremented by the given days. Use negative to decrement
 *
 * @name dateInc
 * @access public
 * @param days The number of days to increment by
 * @param from Optional, the date to increment from, else today
 * @param utc Optional, default set to true, assumes GMT timezone where missing
 * @returns a new Date
 */
export function increment(days = 1, from = null, utc = true) {
    // If we got a from
    const oDate = from === null ? new Date() : toDate(from, utc);
    // Increment the date
    oDate.setDate(oDate.getDate() + days);
    // Return the new date
    return oDate;
}
/**
 * ISO
 *
 * Returns a nicely formatted date string in a modified ISO format suitable for
 * DBs and most systems
 *
 * @name iso
 * @access public
 * @param d A Date instance or a timestamp value
 * @param time Optional, set to false to only return date with no time
 * @param utc Optional, default set to true, assumes GMT timezone where missing
 * @param numbersOnly Optional, default set to false, if true no dashes, colons,
 * 	or spaces will be included, only numbers e.g. 20250211092213
 * @returns an iso formatted date string
 */
export function iso(d, time = true, utc = true, numbersOnly = false) {
    // Make sure we have a Date instance
    d = toDate(d, utc);
    // Generate the date and return it
    const _ = ['', '', ''];
    _[0] = '' + d.getFullYear();
    _[1] = '' + (d.getMonth() + 1);
    if (_[1].length === 1)
        _[1] = '0' + _[1];
    _[2] = '' + d.getDate();
    if (_[2].length === 1)
        _[2] = '0' + _[2];
    // Generate date string
    const sDate = _.join(numbersOnly ? '' : '-');
    // If we don't want the time
    if (!time) {
        return sDate;
    }
    // Generate the time
    const t = ['', '', ''];
    t[0] += d.getHours();
    if (t[0].length === 1)
        t[0] = '0' + t[0];
    t[1] += d.getMinutes();
    if (t[1].length === 1)
        t[1] = '0' + t[1];
    t[2] += d.getSeconds();
    if (t[2].length === 1)
        t[2] = '0' + t[2];
    // Generate the time
    const sTime = t.join(numbersOnly ? '' : ':');
    // Combine date and time
    return numbersOnly ? `${sDate}${sTime}` : `${sDate} ${sTime}`;
}
/**
 * Is Today
 *
 * Returns true if the passed date corresponds to the current date
 *
 * @name isToday
 * @access public
 * @param {ValidDate} d A date object or a string/int that can be converted to a Date
 * @param {boolean=} utc Optional, default set to true, assumes GMT timezone where missing
 * @returns true if the date is today
 */
export function isToday(d, utc = true) {
    // Today's date
    const oToday = new Date();
    // Make sure we have a Date instance
    d = toDate(d, utc);
    // Compare date, month, and year
    return d.getDate() === oToday.getDate() &&
        d.getMonth() === oToday.getMonth() &&
        d.getFullYear() === oToday.getFullYear();
}
/**
 * Next Day of Week
 *
 * Allows you to get the date of a specific day of the week in the next
 * week, or many weeks in the future
 *
 * @name nextDayOfWeek
 * @access public
 * @param dow The day of the week (Sunday is 0, Saturday is 6)
 * @param weeks Optional number of weeks in the past, defaults to 1
 * @returns a new Date
 */
export function nextDayOfWeek(dow, weeks = 1) {
    // If the day of the week is invalid
    if (dow < 0 || dow > 6) {
        throw new Error('nextDayOfWeek dow param can not be less than 0 or more than 6');
    }
    // If weeks is less than 1, throw an error
    if (weeks < 1) {
        throw new Error('nextDayOfWeek weeks param can not be less than 1');
    }
    // Get todays date
    const oToday = new Date();
    // Reset the hours/minutes/seconds
    oToday.setHours(0, 0, 0);
    // Subtract the day requested from the current one
    const iDiff = 7 + (dow - oToday.getDay());
    // Subtract the amount of days from the current day to get the timestamp
    let iTS = oToday.getTime() + (iDiff * MS_PER_DAY);
    // If we have weeks
    if (weeks > 1) {
        iTS += (weeks - 1) * MS_PER_WEEK;
    }
    // Return the new date
    return new Date(iTS);
}
/**
 * Nice
 *
 * Returns a date formatted in the client's local format
 *
 * @name nice
 * @access public
 * @param d The date value
 * @param locale Optional, the locale to use to format
 * @param text Optional, the type of format
 * @param time Optional, set to false to only return date with no time
 * @param utc Optional, default set to true, assumes GMT timezone where missing
 * @returns a nicely formatted date
 */
export function nice(d, locale = 'en-US', text = 'long', time = true, utc = true) {
    // Make sure we have a Date instance
    d = toDate(d, utc);
    // Generate the date string
    const sDate = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: text,
        weekday: text,
        year: 'numeric'
    });
    // If we don't want time
    if (!time) {
        return sDate;
    }
    // Generate the time
    const sTime = d.toLocaleTimeString(locale);
    // Return the date with the time
    return `${sDate} ${sTime}`;
}
/**
 * Previous Day of Week
 *
 * Allows you to get the date of a specific day of the week in the previous
 * week, or many previous weeks, before
 *
 * @name previousDayOfWeek
 * @access public
 * @param dow The day of the week (Sunday is 0, Saturday is 6)
 * @param weeks Optional number of weeks in the past, defaults to 1
 * @returns a new Date
 */
export function previousDayOfWeek(dow, weeks = 1) {
    // If the day of the week is invalid
    if (dow < 0 || dow > 6) {
        throw new Error('datePreviousDOW dow param can not be less than 0 or more than 6');
    }
    // If weeks is less than 1, throw an error
    if (weeks < 1) {
        throw new Error('datePreviousDOW weeks param can not be less than 1');
    }
    // Get todays date
    const oToday = new Date();
    // Reset the hours/minutes/seconds
    oToday.setHours(0, 0, 0);
    // Subtract the day requested from the current one
    const iDiff = 7 + (oToday.getDay() - dow);
    // Subtract the amount of days from the current day to get the timestamp
    let iTS = oToday.getTime() - (iDiff * MS_PER_DAY);
    // If we have weeks
    if (weeks > 1) {
        iTS -= (weeks - 1) * MS_PER_WEEK;
    }
    // Return the new date
    return new Date(iTS);
}
/**
 * Relative
 *
 * Returns a date string description relative to the current day
 *
 * @name relative
 * @access public
 * @param d The date value
 * @param locale Optional, the locale to use to format
 * @param text Optional, the type of format
 * @param utc Optional, default set to true, assumes GMT timezone where missing
 * @returns the relative time
 */
export function relative(d, locale = 'en-US', text = 'long', utc = true) {
    // Today's date
    const oToday = new Date();
    // Make sure we have a Date instance
    d = toDate(d, utc);
    // Compare date, month, and year
    const bToday = (d.getDate() === oToday.getDate() &&
        d.getMonth() === oToday.getMonth() &&
        d.getFullYear() === oToday.getFullYear());
    // If the date is today
    if (bToday) {
        // Generate the time
        const t = ['', ''];
        t[0] += d.getHours();
        if (t[0].length === 1)
            t[0] = '0' + t[0];
        t[1] += d.getMinutes();
        if (t[1].length === 1)
            t[1] = '0' + t[1];
        return t.join(':');
    }
    // Get the month and date
    let sRet = d.toLocaleDateString(locale, { day: 'numeric', month: text });
    // If we're not in the same year, add the year
    if (d.getFullYear() !== oToday.getFullYear()) {
        sRet += ', ' + d.getFullYear();
    }
    // Return the string
    return sRet;
}
/**
 * Timeframe
 *
 * Calculates a timeframe given today, and decrementing by `count` number of
 * `type`. For example, 2 weeks ago, 15 days ago, 13 months ago, 1 year ago.
 *
 * @name timeframe
 * @access public
 * @param count The number of `type` to count back to
 * @param type The type of `count` to decrement by. Valid values are 'day', 'week', 'month', and 'year'
 * @param format The format to return it in, 'date', 'datetime', or 'timestamp'
 * @returns string[] | number[] based on `format`
 */
export function timeframe(count, type, format = 'date') {
    // Set the end date as today
    const oEOD = new Date();
    // Reset the hours/minutes/seconds to the last second of the day
    oEOD.setHours(23, 59, 59);
    // Initialise the start date with today
    const oSOD = new Date();
    // Reset the hours/minutes/seconds to the first second of the day
    oSOD.setHours(0, 0, 0);
    switch (type) {
        case 'day':
        case 'days':
            increment(-count, oSOD);
            break;
        case 'week':
        case 'weeks':
            increment(-(count * 7), oSOD);
            break;
        case 'month':
        case 'months':
            oSOD.setMonth(oSOD.getMonth() - count);
            break;
        case 'year':
        case 'years':
            oSOD.setFullYear(oSOD.getFullYear() - count);
            break;
        default:
            throw new Error(`timeframe type invalid. Must be one of 'day', 'week', 'month', or 'year'. Received: ${type}`);
    }
    // Based on the format requested, return the start and end values
    switch (format) {
        case 'date':
            return [iso(oSOD, false, false), iso(oEOD, false, false)];
        case 'datetime':
            return [iso(oSOD, true, false), iso(oEOD, true, false)];
        case 'timestamp':
            return [timestamp(oSOD), timestamp(oEOD)];
        default:
            throw new Error(`timeframe format invalid. Must be one of 'date', 'datetime', or 'timestamp'. Received: ${type}`);
    }
}
/**
 * Timestamp
 *
 * Returns the current timestamp
 *
 * @name timestamp
 * @access public
 * @returns a number representing seconds since 1970-01-01
 */
export function timestamp(d, utc = true) {
    // If no date was passed, get the current time
    if (d === undefined) {
        return Math.floor(Date.now() / 1000);
    }
    // Else, convert the date
    d = toDate(d, utc);
    // Return the timestamp of the date passed
    return Math.floor(d.getTime() / 1000);
}
// Default export
const dates = {
    age, dayOfWeek, elapsed, increment, iso, isToday, nextDayOfWeek,
    nice, previousDayOfWeek, relative, timeframe, timestamp
};
export default dates;
