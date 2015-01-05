#!/bin/bash
set -e

if [ -z "$MONGO_PORT_27017_TCP" ]; then
    echo >&2 'error: missing R2T_STORM_PORT_27017_TCP environment variable'
    echo >&2 '  Did you forget to --link some-mongo-container:mongo ?'
    exit 1
fi

if [ -z "$R2T_STORM_PORT_44420_TCP" ]; then
    echo >&2 'error: missing R2T_STORM_PORT_44420_TCP environment variable'
    echo >&2 '  Did you forget to --link some-r2t-storm-container:r2t_storm ?'
    exit 1
fi

# if we're linked to Real2Time-Storm, and our linked
# container has a default "root" password set up and passed through... :)
: ${R2T_STORM_LISTEN_HOST:=r2t_storm}
if [ "$R2T_STORM_LISTEN_HOST" = 'r2t_storm' ]; then
    : ${R2T_STORM_LISTEN_PORT:=$R2T_STORM_ENV_R2T_STORM_LISTEN_PORT}
fi

if [ -z "$R2T_STORM_LISTEN_PORT" ]; then
    echo >&2 'error: missing required R2T_STORM_LISTEN_PORT environment variable'
    echo >&2 '  Did you forget to -e R2T_STORM_LISTEN_PORT=... ?'
    echo >&2
    echo >&2 '  (Also of interest might be R2T_STORM_LISTEN_HOST)'
    exit 1
fi

supervisord