
import { config } from '../config/configLoader';

export function url(path = ''): string {
    let protocol = config.APP_PROTOCOL;
    const host = config.APP_HOST;
    if (protocol.endsWith('/')) protocol = protocol.slice(0, -1);
    if (path.startsWith('/')) path = path.slice(1);
    return `${protocol}://${host}/${path}`;
}