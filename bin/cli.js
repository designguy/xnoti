#!/usr/bin/env node

const { program } = require('commander')

// action
program.action(cmd => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // 서버의 응답에 따른 로직을 여기에 작성합니다.
        console.log();
    };
    xhr.open('GET', 'http://localhost:16330');
    xhr.send();
})

program.parse(process.argv)