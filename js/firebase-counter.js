"use strict";


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-analytics.js";
import { getDatabase, ref, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyC-vmxobi1oxg_aXXi0Sq5B97q8blNos4U",
    authDomain: "avatar-258.firebaseapp.com",
    projectId: "avatar-258",
    storageBucket: "avatar-258.firebasestorage.app",
    databaseURL: "https://avatar-258-default-rtdb.asia-southeast1.firebasedatabase.app",
    messagingSenderId: "808525707041",
    appId: "1:808525707041:web:e57219a4efbfc490ecb060",
    measurementId: "G-YKTNZ9LZ6F"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase(app);

const file_links = [
    { version: "Avatar259", url: "https://github.com/envyH/avatar-site/releases/download/v2.5.9/Avatar259.jar" },
    { version: "Avatar259x3", url: "https://github.com/envyH/avatar-site/releases/download/v2.5.9/Avatar259x3.jar" },
];

const buttonsDiv = document.getElementById("buttons");

file_links.forEach(file => {
    const version = file.version;

    let btn = document.createElement("a");
    btn.textContent = file.version;
    btn.className = "btn btn-primary m-1";
    btn.innerHTML = `${file.version} <span id="count-${version}" class="badge bg-light text-dark">0</span>`;
    btn.href = "#";

    btn.addEventListener("click", (e) => {
        e.preventDefault();

        const fileRef = ref(db, "downloads/" + version);
        runTransaction(fileRef, current => (current || 0) + 1);

        const a = document.createElement("a");
        a.href = file.url;
        a.download = "";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    buttonsDiv.appendChild(btn);

    const fileRef = ref(db, "downloads/" + version);
    onValue(fileRef, snapshot => {
        const count = snapshot.val() || 0;
        const countSpan = document.getElementById(`count-${version}`);
        if (countSpan) countSpan.textContent = count;
    });
});