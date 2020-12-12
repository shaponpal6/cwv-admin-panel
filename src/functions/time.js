import { parseISO, format} from 'date-fns'
export function toISOString()
{
    return new Date().toISOString()
}
export function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    var d = new Date(str); 
    return d.toISOString()===str;
  }
export function localISOString(toISOString)
{
    return new Date(Date.parse(toISOString) - (date.getTimezoneOffset() * 60000)).toISOString();
}

export function getTime(toISOString, timeFormat = 'MMM d, yy h:mm a')
{
    if(!!isIsoDate(toISOString))
        return format(parseISO(toISOString), timeFormat);
}

function getUTCNow()
{
    var now = new Date();
    var time = now.getTime();
    var offset = now.getTimezoneOffset();
    offset = offset * 60000;
    return time - offset;
}
export default getUTCNow