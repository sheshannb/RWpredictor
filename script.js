// script.js

// URL of the web app to open after successful login
const webAppUrl = 'index.html';  // Redirect to local index.html

function generateLoginCode() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let code = '';
    for (let i = 0; i < 3; i++) {
        code += letters[Math.floor(Math.random() * letters.length)];
    }
    for (let i = 0; i < 5; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

function letterToNumberTransformation(code) {
    const firstLetterMapping = {
        'a': '26', 'b': '25', 'c': '24', 'd': '23', 'e': '22', 'f': '21', 'g': '20', 'h': '19',
        'i': '18', 'j': '17', 'k': '16', 'l': '15', 'm': '14', 'n': '13', 'o': '12', 'p': '11',
        'q': '10', 'r': '09', 's': '08', 't': '07', 'u': '06', 'v': '05', 'w': '04', 'x': '03',
        'y': '02', 'z': '01'
    };
    const secondLetterMapping = {
        'a': '101', 'b': '102', 'c': '103', 'd': '104', 'e': '105', 'f': '106', 'g': '107',
        'h': '108', 'i': '109', 'j': '110', 'k': '111', 'l': '112', 'm': '113', 'n': '114',
        'o': '115', 'p': '116', 'q': '117', 'r': '118', 's': '119', 't': '120', 'u': '121',
        'v': '122', 'w': '123', 'x': '124', 'y': '125', 'z': '126'
    };
    const thirdLetterMapping = {
        'a': 'z', 'b': 'y', 'c': 'x', 'd': 'w', 'e': 'v', 'f': 'u', 'g': 't', 'h': 's',
        'i': 'r', 'j': 'q', 'k': 'p', 'l': 'o', 'm': 'n', 'n': 'm', 'o': 'l', 'p': 'k',
        'q': 'j', 'r': 'i', 's': 'h', 't': 'g', 'u': 'f', 'v': 'e', 'w': 'd', 'x': 'c',
        'y': 'b', 'z': 'a'
    };
    const digitMapping = {
        '0': 'c', '1': 'd', '2': 'e', '3': 'f', '4': 'g', '5': 'h', '6': 'i', '7': 'j', '8': 'k', '9': 'l'
    };

    const firstLetter = firstLetterMapping[code[0]];
    const secondLetter = secondLetterMapping[code[1]];
    const thirdLetter = thirdLetterMapping[code[2]];
    const firstDigit = digitMapping[code[3]];
    const lastFourDigits = (parseInt(code.slice(4, 8)) * 3).toString();

    return firstLetter + secondLetter + thirdLetter + firstDigit + lastFourDigits;
}

document.getElementById('generateBtn').addEventListener('click', function() {
    const loginCode = generateLoginCode();
    const licenseKey = letterToNumberTransformation(loginCode);

    document.getElementById('loginCodeDisplay').textContent = loginCode;
    document.getElementById('copyBtn').classList.remove('hidden');
    localStorage.setItem('licenseKeyGenerated', licenseKey);
    
    document.getElementById('licenseDiv').classList.remove('hidden');
    document.getElementById('generateBtn').classList.add('hidden');
});

document.getElementById('copyBtn').addEventListener('click', function() {
    const loginCode = document.getElementById('loginCodeDisplay').textContent;
    navigator.clipboard.writeText(loginCode).then(() => {
        alert('Login code copied to clipboard!');
    });
});

document.getElementById('licenseBtn').addEventListener('click', function() {
    const inputKey = document.getElementById('licenseKey').value;
    const generatedKey = localStorage.getItem('licenseKeyGenerated');

    if (inputKey === generatedKey) {
        localStorage.setItem('isLoggedIn', 'true');
        document.getElementById('licenseDiv').classList.add('hidden');
        document.getElementById('welcomeDiv').classList.remove('hidden');
        
        // Redirect to the web app after a short delay
        setTimeout(() => {
            window.location.href = webAppUrl;
        }, 3000); // 3-second delay before redirect
    } else {
        alert('Invalid License Key! Please try again.');
    }
});

if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = webAppUrl;
}

document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('licenseKeyGenerated');
    document.getElementById('welcomeDiv').classList.add('hidden');
    document.getElementById('generateDiv').classList.remove('hidden');
    document.getElementById('licenseDiv').classList.add('hidden');
    document.getElementById('generateBtn').classList.remove('hidden');
    document.getElementById('copyBtn').classList.add('hidden');
    document.getElementById('loginCodeDisplay').textContent = 'Click Generate to show the login code';
});
