"use strict";


function loadText() {
    fetch('data.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể đọc file');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('output').textContent = data;
        })
        .catch(error => {
            document.getElementById('output').textContent = 'Lỗi: ' + error.message;
        });
}

fetch("README.md")
    .then(response => response.text())
    .then(text => document.getElementById("readme").innerHTML = marked.parse(text))
    .catch(() => document.getElementById("readme").textContent = "Failed to load README.md");
fetch("CHANGELOG.md")
    .then(response => response.text())
    .then(text => document.getElementById("changelog").innerHTML = marked.parse(text))
    .catch(() => document.getElementById("changelog").textContent = "Failed to load CHANGELOG.md");