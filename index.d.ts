/**
 * Dates
 *
 * Useful functions related to dates and times
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2021-05-22
 */
/**
 * Age
 *
 * Returns the current age of someone based on date of birth
 *
 * @name age
 * @access public
 * @param {number | string | Date} d The date of birth
 * @return {number}
 */
export declare function age(d: number | string | Date): number;
/**
 * Day of Week
 *
 * Returns the day of the week in the current week, regardless of past or future
 *
 * @name DateDOW
 * @access public
 * @param {number} dow The day of the week we want
 * @return Date
 */
export declare function dayOfWeek(dow: number): Date;
/** Elapsed options */
declare type elapsedOptions = {
    show_minutes?: boolean;
    show_seconds?: boolean;
    show_zero_hours?: boolean;
    show_zero_minutes?: boolean;
};
/**
 * Elapsed
 *
 * Takes the time in seconds and converts it to human readable hours, minutes,
 * seconds
 *
 * @name elapsed
 * @access public
 * @param {number} seconds The seconds elapsed
 * @param {elapsedOptions | null=} opts Optional formating options
 * @return {string}
 */
export declare function elapsed(seconds: number, opts?: elapsedOptions | null): string;
/**
 * Increment
 *
 * Returns a date incremented by the given days. Use negative to decrement
 *
 * @name dateInc
 * @access public
 * @param {number} days The number of days to increment by
 * @param {number | string | Date | null=} from Optional, the date to increment from, else today
 * @param {bool=} utc Optional, default set to true, assumes GMT timezone where missing
 * @return Date
 */
export declare function increment(days?: number, from?: null, utc?: boolean): Date;
/**
 * ISO
 *
 * Returns a nicely formatted date string in a modified ISO format suitable for
 * DBs and most systems
 *
 * @name iso
 * @access public
 * @param {number | string | Date} d A Date instance or a timestamp value
 * @param {boolean=} time Optional, set to false to only return date with no time
 * @param {boolean=} utc Optional, default set to true, assumes GMT timezone where missing
 * @return {string}
 */
export declare function iso(d: number | string | Date, time?: boolean, utc?: boolean): string;
/**
 * Is Today
 *
 * Returns true if the passed date corresponds to the current date
 *
 * @name isToday
 * @access public
 * @param {number | string | Date} d A date object or a string/int that can be converted to a Date
 * @param {boolean=} utc Optional, default set to true, assumes GMT timezone where missing
 * @return {boolean}
 */
export declare function isToday(d: number | string | Date, utc?: boolean): boolean;
/**
 * Next Day of Week
 *
 * Allows you to get the date of a specific day of the week in the next
 * week, or many weeks in the future
 *
 * @name nextDayOfWeek
 * @access public
 * @param {number} dow The day of the week (Sunday is 0, Saturday is 6)
 * @param {number=} weeks Optional number of weeks in the past, defaults to 1
 * @return {Date}
 */
export declare function nextDayOfWeek(dow: number, weeks?: number): Date;
/**
 * Nice
 *
 * Returns a date formatted in the client's local format
 *
 * @name nice
 * @access public
 * @param {number | string | Date} d The date value
 * @param {string=} locale Optional, the locale to use to format
 * @param {'long' | 'short'=} text Optional, the type of format
 * @param {boolean=} time Optional, set to false to only return date with no time
 * @param {boolean=} utc Optional, default set to true, assumes GMT timezone where missing
 * @return {string}
 */
export declare function nice(d: number | string | Date, locale?: string, text?: 'long' | 'short', time?: boolean, utc?: boolean): string;
/**
 * Previous Day of Week
 *
 * Allows you to get the date of a specific day of the week in the previous
 * week, or many previous weeks, before
 *
 * @name previousDayOfWeek
 * @access public
 * @param {number} dow The day of the week (Sunday is 0, Saturday is 6)
 * @param {number=} weeks Optional number of weeks in the past, defaults to 1
 * @return {Date}
 */
export declare function previousDayOfWeek(dow: number, weeks?: number): Date;
/**
 * Relative
 *
 * Returns a date string description relative to the current day
 *
 * @name relative
 * @access public
 * @param {number | string | Date} d The date value
 * @param {string=} locale Optional, the locale to use to format
 * @param {'long' | 'short'=} text Optional, the type of format
 * @param {boolean=} utc Optional, default set to true, assumes GMT timezone where missing
 * @return {string}
 */
export declare function relative(d: number | string | Date, locale?: string, text?: 'long' | 'short', utc?: boolean): string;
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
};
export default dates;
