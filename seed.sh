#!/usr/bin/env bash

function main {

    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
    SNAKES_DIR="$DIR/backend/snakes";

    if [ -d "$SNAKES_DIR" ]; then
        echo "directory $SNAKES_DIR already exists";
        exit 1;
    fi

    mkdir "$SNAKES_DIR";
    cd "$SNAKES_DIR";

    git clone https://github.com/andrzejdus/snake-gordon.git snake1
    git clone https://github.com/andrzejdus/snake-gordon.git snake2
    git clone https://github.com/andrzejdus/snake-gordon.git snake3

}

main "$@"

