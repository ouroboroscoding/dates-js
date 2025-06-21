/**
 * Dates
 *
 * Useful functions related to dates and times
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2021-05-22
 */
export type ElapsedOptions = {
    show_minutes?: boolean;
    show_seconds?: boolean;
    show_zero_hours?: boolean;
    show_zero_minutes?: boolean;
};
export type TimeframeFormat = 'date' | 'datetime' | 'timestamp';
export type TimeframeReturn<T extends string | number> = [T, T];
export type TimeframeType = 'day' | 'days' | 'week' | 'weeks' | 'month' | 'months' | 'year' | 'years';
export type ValidDate = number | string | Date;
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
export declare function age(d: ValidDate): number;
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
export declare function elapsed(seconds: number, opts?: ElapsedOptions | null): string;
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
export declare function increment(days?: number, from?: ValidDate | null, utc?: boolean): Date;
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
export declare function iso(d: ValidDate, time?: boolean, utc?: boolean, numbersOnly?: boolean): string;
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
export declare function isToday(d: ValidDate, utc?: boolean): boolean;
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
export declare function nice(d: ValidDate, locale?: string, text?: 'long' | 'short', time?: boolean, utc?: boolean): string;
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
export declare function relative(d: ValidDate, locale?: string, text?: 'long' | 'short', utc?: boolean): string;
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
export declare function timeframe(count: number, type: TimeframeType, format?: TimeframeFormat): TimeframeReturn<string | number>;
/**
 * Timestamp
 *
 * Returns the current timestamp
 *
 * @name timestamp
 * @access public
 * @returns a number representing seconds since 1970-01-01
 */
export declare function timestamp(d?: ValidDate, utc?: boolean): number;
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
    timeframe: typeof timeframe;
    timestamp: typeof timestamp;
};
export default dates;
