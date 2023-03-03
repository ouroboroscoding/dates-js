/**
 * Dates
 *
 * Useful functions related to dates and times
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2021-05-22
 */
export type elapsedOptions = {
    show_minutes?: boolean;
    show_seconds?: boolean;
    show_zero_hours?: boolean;
    show_zero_minutes?: boolean;
};
export type validDate = number | string | Date;
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
export declare function age(d: validDate): number;
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
export declare function dayOfWeek(dow: number): Date;
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
export declare function elapsed(seconds: number, opts?: elapsedOptions | null): string;
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
export declare function increment(days?: number, from?: validDate | null, utc?: boolean): Date;
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
 * @returns an iso formatted date string
 */
export declare function iso(d: validDate, time?: boolean, utc?: boolean): string;
/**
 * Is Today
 *
 * Returns true if the passed date corresponds to the current date
 *
 * @name isToday
 * @access public
 * @param {validDate} d A date object or a string/int that can be converted to a Date
 * @param {boolean=} utc Optional, default set to true, assumes GMT timezone where missing
 * @returns true if the date is today
 */
export declare function isToday(d: validDate, utc?: boolean): boolean;
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
export declare function nextDayOfWeek(dow: number, weeks?: number): Date;
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
export declare function nice(d: validDate, locale?: string, text?: 'long' | 'short', time?: boolean, utc?: boolean): string;
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
export declare function previousDayOfWeek(dow: number, weeks?: number): Date;
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
export declare function relative(d: validDate, locale?: string, text?: 'long' | 'short', utc?: boolean): string;
/**
 * Timestamp
 *
 * Returns the current timestamp
 *
 * @name timestamp
 * @access public
 * @returns a number representing seconds since 1970-01-01
 */
export declare function timestamp(d?: validDate, utc?: boolean): number;
declare const dates: {
    age: typeof age;
    dayOfWeek: typeof dayOfWeek;
    elapsed: typeof elapsed;
    increment: typeof increment;
    iso: typeof iso;
    isToday: typeof isToday;
    nextDayOfWeek: typeof nextDayOfWeek;
    nice: typeof nice;
    previousDayOfWeek: typeof previousDayOfWeek;
    relative: typeof relative;
    timestamp: typeof timestamp;
};
export default dates;
