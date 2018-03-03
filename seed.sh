#!/usr/bin/env bash

function main {
    FORCE=$1;
    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
    SNAKES_DIR="$DIR/backend/snakes";

    if [ "$FORCE" == "--force" ] || [ "$FORCE" == "-f" ]; then
        if [ -d "$SNAKES_DIR" ]; then
        echo "deleting $SNAKES_DIR";
        rm -rf ${SNAKES_DIR};
        fi
    fi

    if [ -d "$SNAKES_DIR" ]; then
        echo "directory $SNAKES_DIR already exists";
        exit 1;
    fi

    mkdir "$SNAKES_DIR";
    cd "$SNAKES_DIR";

    git clone git@github.com:FrostF0X/snake-gordon.git snake1
    git clone git@github.com:FrostF0X/snake-gordon.git snake2
    git clone git@github.com:FrostF0X/snake-gordon.git snake3

}

main "$@"
