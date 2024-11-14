import { APP_PROTOCOL, APP_HOST } from '../config';

export function url(path = ''): string {
    let protocol = APP_PROTOCOL;
    const host = APP_HOST;

    if (protocol.endsWith('/')) {
        protocol = protocol.substring(0, protocol.length - 1);
    }

    if (path.startsWith('/')) {
        path = path.substring(1);
    }

    return `${protocol}://${host}/${path}`;
}